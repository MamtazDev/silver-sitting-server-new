const router = require("express").Router();

const {
  addMessage,
  getMessageByConversationId,
  getMessagesBySender,
  putMessageSeen,
} = require("../controller/message.controller");

router.post("/add", addMessage);
router.put("/seen/:senderId/:conversationId", putMessageSeen);
router.get("/:senderId/:conversationId", getMessagesBySender);
router.get("/:conversationId", getMessageByConversationId);

module.exports = router;
