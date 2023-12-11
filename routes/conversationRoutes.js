// const express = require("express");

const {
  addConversationBySenderReciver,
  getConversationByUser,
  getConversationOfTwoUsers,
} = require("../controller/conversation.controller");

// const router = express.Router();

const router = require("express").Router();

router.post("/add", addConversationBySenderReciver);
router.get("/users/:firstUserId/:secondUserId", getConversationOfTwoUsers);
router.get("/:userId", getConversationByUser);

module.exports = router;
