const express = require('express');
const { getConversations, createConversation } = require('../controllers/conversation.controller');
const { verifyToken } = require('../middleware/jwt');

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);

module.exports = router;