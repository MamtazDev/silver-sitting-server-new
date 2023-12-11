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
    const feedbacks = await Feedback.find({});
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  addFeedback,
  getAllFeedbacks,
};
