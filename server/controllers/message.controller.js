const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.createMessage = async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    // Update conversation's last message and "unread" status
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      }
    );
    res.status(201).send(savedMessage);
  } catch (err) {
    res.status(500).send("Error sending message");
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send("Error fetching messages");
  }
};