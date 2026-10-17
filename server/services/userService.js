const User = require("../models/userModel");
const stripeService = require("./stripeService");
const subscriptionService = require("./subscriptionService");
const truckService = require("./truckService");
const imageService = require("./imageService");
const imageCleanupService = require("./imageCleanupService");
const CryptoJS = require('crypto-js')
const authUtils = require('../utils/authUtils');

// imageFile is the optional profile photo sent with the signup request
const createUser = async (userData, role, imageFile) => {
  const { name, email, userName, gender, city, country, state, password, userId, phone, companyName } = userData;
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('A user with that email has already been registered!');
    error.code = 409;
    throw error;
  }

  let passwordDigest = await authUtils.hashPassword(password);

  // Upload only after the signup has passed validation and the email check
  const image = imageFile ? (await imageService.uploadImages([imageFile]))[0] : undefined;

  let user;

  try {
    if (role === 'user') {
      user = await User.create({
        email,
        password: passwordDigest,
        image,
        role,
        userId,
        userName
      });
    } else {
      user = await User.create({
        name,
        email,
        userName,
        image,
        // Optional: leave it unset instead of storing an empty string
        gender: gender || undefined,
        city,
        country,
        state,
        password: passwordDigest,
        role,
        userId,
        phone,
        companyName
      });
    }
  } catch (error) {
    // Don't leave the photo in S3 for an account that was never created
    if (image) {
      imageService.deleteImages([image]).catch((err) => console.log('DeleteSignupImageError: ', err));
    }
    throw error;
  }

  return user;
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  let passwordMatched = await authUtils.comparePassword(user.password, password);
  if (!passwordMatched) {
    const error = new Error('Invalid credentials!');
    error.code = 400;
    throw error;
  }
  let payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  let accessToken = authUtils.createAccessToken(payload);
  let refreshToken = authUtils.createRefreshToken(payload);
  user.refreshToken = refreshToken;
  await user.save();

  const safeUser = {
    _id: user._id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    role: user.role,
    image: user.image,
    city: user.city,
    state: user.state || null,
    country: user.country,
    phone: user.phone || null,
    companyName: user.companyName || null,
    gender: user.gender,
  };

  return { accessToken, refreshToken, user: safeUser };
};

const createResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  const randomBytes = CryptoJS.lib.WordArray.random(32);
  const resetToken = randomBytes.toString(CryptoJS.enc.Hex);
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
  await user.save();
  return { user, resetToken };
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) {
    const error = new Error('Invalid or expired token!');
    error.code = 400;
    throw error;
  }
  let passwordDigest = await authUtils.hashPassword(newPassword);
  user.password = passwordDigest;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error('Refresh token not found!');
    error.code = 401;
    throw error;
  }
  const payload = authUtils.verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.id);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error('Invalid refresh token!');
    error.code = 401;
    throw error;
  }
  const newPayload = { id: payload.id, email: payload.email, role: payload.role };
  const newAccessToken = authUtils.createAccessToken(newPayload);
  const newRefreshToken = authUtils.createRefreshToken(newPayload);
  user.refreshToken = newRefreshToken;
  await user.save();

  const safeUser = {
    _id: user._id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    role: user.role,
    image: user.image,
    city: user.city,
    state: user.state || null,
    country: user.country,
    phone: user.phone || null,
    companyName: user.companyName || null,
    gender: user.gender,
  };

  return { newAccessToken, newRefreshToken, user: safeUser };
};

const logoutUser = async (refreshToken) => {
  const payload = authUtils.verifyRefreshToken(refreshToken);
  if (payload && payload.id) {
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
};

const fetchUser = async (userId) => {
  const userProjection = {
    name: 1,
    email: 1,
    userName: 1,
    gender: 1,
    city: 1,
    image: 1,
    country: 1,
    state: 1,
    role: 1,
    _id: 1,
    phone: 1,
    companyName: 1,
  };
  const user = await User.findById(userId, userProjection);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const userToUpdate = await User.findById(userId);

  if (!userToUpdate) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }

  // Never change these through a profile update, even if the request has them
  delete updateData.password;
  delete updateData.role;

  // Gender is optional; an empty value means "not chosen", so keep the current one
  if (updateData.gender === '') {
    delete updateData.gender;
  }

  // Neither app can remove a profile photo; an empty value only comes from a form that
  // didn't load the user, so keep the current photo instead of erasing (and deleting) it
  if (!updateData.image) {
    delete updateData.image;
  }

  let existingUser;
  if (updateData.email && updateData.email !== userToUpdate.email) {
    existingUser = await User.findOne({ email: updateData.email });
    if (existingUser) {
      const error = new Error('A user with that email has already been registered!');
      error.code = 409;
      throw error;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true }
  );

  // The profile photo was replaced or removed: delete the old one. Best effort, the
  // profile is already saved, and the daily cleanup retries anything left behind.
  const oldImage = userToUpdate.image;
  if (oldImage && updatedUser && oldImage !== updatedUser.image) {
    imageCleanupService.deleteUnusedImages([oldImage])
      .catch((err) => console.log('DeleteOldProfileImageError: ', err));
  }

  return updatedUser;
};

// Permanently deletes a user's account: cancels their Stripe subscriptions,
// deletes their trucks, images and the user itself. Subscription records are
// kept (marked with userDeletedAt) for stats.
const deleteAccount = async (userId, password) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }

  const passwordMatched = await authUtils.comparePassword(user.password, password);
  if (!passwordMatched) {
    const error = new Error('Incorrect password!');
    error.code = 400;
    throw error;
  }

  const subscription = await subscriptionService.getUserSubscription(userId);

  // Stop all future charges first. If this fails, the account is left intact
  // so the user is never billed for an account that no longer exists.
  const customerIds = [...new Set([user.stripeCustomerId, subscription?.customerId].filter(Boolean))];
  try {
    await stripeService.cancelCustomerSubscriptions(customerIds);
  } catch (err) {
    console.log('CancelStripeSubscriptionsError: ', err);
    const error = new Error('Unable to cancel your subscription. Your account was not deleted, please try again.');
    error.code = 502;
    throw error;
  }

  await subscriptionService.markUserDeleted(userId);

  const imageUrls = await truckService.deleteUserTrucks(userId);
  if (user.image) imageUrls.push(user.image);

  await User.findByIdAndDelete(userId);

  // Image cleanup is best effort: the account is already deleted at this point
  try {
    await imageCleanupService.deleteUnusedImages(imageUrls);
  } catch (err) {
    console.log('DeleteAccountImagesError: ', err);
  }
};

const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  let passwordMatched = await authUtils.comparePassword(user.password, oldPassword);
  if (!passwordMatched) {
    const error = new Error('Invalid old password!');
    error.code = 400;
    throw error;
  }
  let passwordDigest = await authUtils.hashPassword(newPassword);
  user.password = passwordDigest;
  await user.save();
};

const fetchUserStripeCustomerId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found!');
    error.code = 404;
    throw error;
  }
  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }
  else {
    return null;
  }
};

module.exports = {
  createUser,
  loginUser,
  createResetToken,
  resetPassword,
  refreshToken,
  logoutUser,
  fetchUser,
  updateUser,
  deleteAccount,
  changeUserPassword,
  fetchUserStripeCustomerId,
};
