const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userSchemas = require('../validationSchemas/userSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');
const imageUpload = require('../middleware/imageUploadMiddleware');

router.post(
  "/:userType-register",
  validationMiddleware.validateParams(userSchemas.userTypeSchema),
  // Optional profile photo; only uploaded to S3 once the signup is valid
  imageUpload.single("image"),
  validationMiddleware.validateRequest(userSchemas.registerSchema),
  controller.Register
);

router.post(
  "/login",
  validationMiddleware.validateRequest(userSchemas.loginSchema),
  controller.Login
);

// Not used by the web or mobile app yet (no Forgot Password screen)
// router.post(
//   "/forgot-password",
//   validationMiddleware.validateRequest(userSchemas.forgotPasswordSchema),
//   controller.ForgotPassword
// );

// router.post(
//   "/reset-password",
//   validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
//   controller.ResetPassword
// );

router.post(
  "/refresh-token",
  controller.RefreshToken
);

router.post(
  "/logout",
  controller.Logout
);

router.get(
  "/fetch-user-info",
  authMiddleware.authenticateRequest,
  controller.FetchUserInfo
);

router.patch(
  "/update-user-info",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateRequest(userSchemas.updateUserSchema),
  controller.UpdateUserInfo
);

// Not used by the web or mobile app yet (no Change Password screen)
// router.patch(
//   "/change-user-password",
//   authMiddleware.authenticateRequest,
//   validationMiddleware.validateRequest(userSchemas.changeUserPasswordSchema),
//   controller.ChangeUserPassword
// );

router.delete(
  "/delete-account",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateRequest(userSchemas.deleteAccountSchema),
  controller.DeleteAccount
);

module.exports = router;
