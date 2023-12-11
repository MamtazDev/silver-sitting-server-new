const express = require("express");
const {
  addNewContanctMessage,
  getAllMakeContactMessages,
} = require("../controller/makeContact.controller");

const router = express.Router();

router.post("/add", addNewContanctMessage);
router.get("/", getAllMakeContactMessages);

module.exports = router;
