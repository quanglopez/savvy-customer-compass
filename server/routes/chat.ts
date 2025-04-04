import express from 'express';
import { Chat } from '../models/Chat';
import { authenticateToken, requireRole } from '../middleware/auth';
import { sendEmailNotification } from '../utils/email';

const router = express.Router();

// Create new chat session
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { businessId } = req.body;
    const userId = req.user?.userId;

    const chat = new Chat({
      businessId,
      userId,
      messages: [],
    });

    await chat.save();

    // Send email notification to business
    await sendEmailNotification({
      to: 'business@example.com', // Replace with actual business email
      subject: 'New Chat Session',
      text: `A new chat session has been initiated by a user.`,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat session', error });
  }
});

// Get chat history for a business
router.get('/business', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const chats = await Chat.find({ businessId: req.user?.userId })
      .populate('userId', 'email')
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history', error });
  }
});

// Get chat history for a user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user?.userId })
      .populate('businessId', 'businessName')
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history', error });
  }
});

// Add message to chat
router.post('/:chatId/messages', authenticateToken, async (req, res) => {
  try {
    const { content, isBot } = req.body;
    const chatId = req.params.chatId;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Verify user has access to this chat
    if (chat.userId.toString() !== req.user?.userId && 
        chat.businessId.toString() !== req.user?.userId) {
      return res.status(403).json({ message: 'Unauthorized access to chat' });
    }

    chat.messages.push({
      sender: req.user?.userId,
      content,
      isBot: isBot || false,
      timestamp: new Date(),
    });

    await chat.save();

    // If message is from user, notify business
    if (!isBot && chat.userId.toString() === req.user?.userId) {
      await sendEmailNotification({
        to: 'business@example.com', // Replace with actual business email
        subject: 'New Chat Message',
        text: `You have a new message in chat session ${chatId}`,
      });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error adding message', error });
  }
});

// Close chat session
router.patch('/:chatId/close', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.status = 'closed';
    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error closing chat session', error });
  }
});

export const chatRoutes = router; 