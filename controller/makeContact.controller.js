const MakeContact = require("../models/makeContact.model");

const addNewContanctMessage = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  try {
    const newMakeContact = new MakeContact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
    await newMakeContact.save();
    res.status(200).send({
      message: "Thanks for your message. We will contact you soon",
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllMakeContactMessages = async (req, res) => {
  try {
    const allMessages = await MakeContact.find({}).sort({ createdAt: "desc" });
    res.send(allMessages);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteMakeContactMessages = async (req, res) => {
  try {
    const result = await MakeContact.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Contact Message Delete Successful!",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Contact Message Delete Failed!",
      error_message: error.message,
    });
  }
};

module.exports = {
  addNewContanctMessage,
  getAllMakeContactMessages,
  deleteMakeContactMessages,
};
