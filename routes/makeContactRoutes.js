const express = require("express");
const {
  addNewContanctMessage,
  getAllMakeContactMessages,
  deleteMakeContactMessages,
} = require("../controller/makeContact.controller");

const router = express.Router();

router.post("/add", addNewContanctMessage);
router.get("/", getAllMakeContactMessages);
router.delete("/delete/:id", deleteMakeContactMessages);

module.exports = router;
