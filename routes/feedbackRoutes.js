const express = require("express");
const {
  addFeedback,
  getAllFeedbacks,
} = require("../controller/feedback.controller");
const { isAdmin } = require("../utils/middleware");

const router = express.Router();

router.post("/add", addFeedback);
// router.get("/", isAdmin, getAllFeedbacks);
router.get("/", getAllFeedbacks);

module.exports = router;
