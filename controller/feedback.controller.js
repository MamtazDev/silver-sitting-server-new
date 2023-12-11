const Feedback = require("../models/feedback.model");

const addFeedback = async (req, res) => {
  const { firstName, lastName, email, phone, rating, feedbackMessage } =
    req.body;
  try {
    const newFeedback = new Feedback({
      firstName,
      lastName,
      email,
      phone,
      rating,
      feedbackMessage,
    });

    const feedback = await newFeedback.save();

    res.status(200).send({
      message: "Thanks for your feedback.",
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: "desc" });
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteFeedbacks = async (req, res) => {
  try {
    const result = await Feedback.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Feedback Delete Successful!",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Feedback Delete Failed!",
      error_message: error.message,
    });
  }
};

module.exports = {
  addFeedback,
  getAllFeedbacks,
  deleteFeedbacks,
};
