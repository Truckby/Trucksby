const path = require('path');
const userService = require('../services/userService');
const emailService = require('../services/emailService');
const templateUtils = require('../utils/templateUtils');

const Register = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { userType } = req.params;
    const user = await userService.createUser(data, userType);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error)
  }
};

const Login = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { accessToken, refreshToken } = await userService.loginUser(data);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.status(200).json({ token: accessToken });
  } catch (error) {
    next(error);
  }
};

const ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { user, resetToken } = await userService.createResetToken(email);
    const CLIENT_URL = req.get('origin');
    const resetLink = `${CLIENT_URL}/reset-password?token=${resetToken}`;
    const templatePath = path.join(__dirname, '../templates/resetPasswordEmailTemplate.hbs');
    const data = {
      companyLogo: "http://localhost:5777/static/images/logo.png",
      userName: user.name,
      resetLink
    };
    const htmlContent = await templateUtils.generateHTML(data, templatePath);
    await emailService.sendEmail(user.email, 'Password Reset Request', null, htmlContent);
    res.status(200).json({ message: 'Reset password link sent!' });
  } catch (error) {
    next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const RefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const { newAccessToken, newRefreshToken } = await userService.refreshToken(refreshToken);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

const Logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      await userService.logoutUser(refreshToken);
    }
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const FetchUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await userService.fetchUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const UpdateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const user = await userService.updateUser(userId, data);
    res.status(200).json({ message: "Info updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const ChangeUserPassword = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.body;
    await userService.changeUserPassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const SearchEmployees = async (req, res, next) => {
  try {
    const { pageIndex, limit, searchQuery } = req.query;
    const parsedPageIndex = parseInt(pageIndex);
    const parsedLimit = parseInt(limit);
    const result = await userService.searchUsers(parsedPageIndex, parsedLimit, searchQuery, "employee");
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const SearchUsers = async (req, res, next) => {
  try {
    const { pageIndex, limit, searchQuery, status } = req.query;
    const parsedPageIndex = parseInt(pageIndex);
    const parsedLimit = parseInt(limit);
    const result = await userService.searchUsers(parsedPageIndex, parsedLimit, searchQuery, "user");
    if (status && result.users && result.users.length > 0) {
      result.users = result.users.filter(user => {
        const lowerCaseArr = user.status.map(status => status.toLowerCase());
        const lowerCaseStatus = status.toLowerCase();
        return lowerCaseArr.includes(lowerCaseStatus);
      });
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const CreateEmployee = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.role = 'employee';
    const user = await userService.createUser(data);
    res.status(201).json({ message: "Employee created successfully!" });
  } catch (error) {
    next(error)
  }
};

const CreateUser = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.role = 'user';
    const user = await userService.createUser(data);
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error)
  }
};

const UpdateEmployee = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = { ...req.body };
    await userService.updateUser(req.config.stripe, userId, data, "employee");
    res.status(200).json({ message: 'Employee info updated successfully!' });
  } catch (error) {
    next(error);
  }
};

const UpdateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = { ...req.body };
    await userService.updateUser(req.config.stripe, userId, data, "user");
    res.status(200).json({ message: 'User info updated successfully!' });
  } catch (error) {
    next(error);
  }
};

const DeleteEmployee = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId, "employee");
    res.status(200).json({ message: 'Employee deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId, "user");
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  RefreshToken,
  Logout,
  FetchUserInfo,
  UpdateUserInfo,
  ChangeUserPassword,
  SearchEmployees,
  SearchUsers,
  CreateEmployee,
  CreateUser,
  UpdateEmployee,
  UpdateUser,
  DeleteEmployee,
  DeleteUser
};
