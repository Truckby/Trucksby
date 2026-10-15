const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const imageUpload = require("../middleware/imageUploadMiddleware");
const imageService = require("../services/imageService");

// Profile and listing photos of logged-in users. Signup sends its photo with
// the registration request instead, so this never needs to be public.
router.post(
  "/upload",
  authMiddleware.authenticateRequest,
  imageUpload.array("images", 20),
  async (req, res, next) => {
    try {
      if (!req.files?.length) {
        return res.status(400).json({ success: false, error: "No files uploaded." });
      }
      const urls = await imageService.uploadImages(req.files);
      res.status(200).json({ success: true, urls });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
