const Conversation = require("../models/conversation.model");

const addConversationBySenderReciver = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.reciverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConversationByUser = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConversationOfTwoUsers = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addConversationBySenderReciver,
  getConversationByUser,
  getConversationOfTwoUsers,
};
