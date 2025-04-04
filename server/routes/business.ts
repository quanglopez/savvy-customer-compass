import express from 'express';
import { User } from '../models/User';
import { Chat } from '../models/Chat';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

// Get business profile
router.get('/profile', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const business = await User.findById(req.user?.userId).select('-password');
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business profile', error });
  }
});

// Update business profile
router.put('/profile', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const { businessName, email } = req.body;
    
    const business = await User.findById(req.user?.userId);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    if (businessName) business.businessName = businessName;
    if (email) business.email = email;
    
    await business.save();
    
    res.json({
      message: 'Business profile updated successfully',
      business: {
        id: business._id,
        email: business.email,
        businessName: business.businessName,
        role: business.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating business profile', error });
  }
});

// Get business statistics
router.get('/stats', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const activeChats = await Chat.countDocuments({ 
      businessId: req.user?.userId,
      status: 'active'
    });
    
    const totalChats = await Chat.countDocuments({ 
      businessId: req.user?.userId 
    });
    
    const closedChats = totalChats - activeChats;
    
    const latestChats = await Chat.find({ businessId: req.user?.userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('userId', 'email');
    
    res.json({
      activeChats,
      closedChats,
      totalChats,
      latestChats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business statistics', error });
  }
});

// Get business notification settings
router.get('/notifications', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const business = await User.findById(req.user?.userId).select('notificationSettings');
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // If notification settings don't exist yet, create default ones
    if (!business.notificationSettings) {
      business.notificationSettings = {
        emailNotifications: true,
        newChatAlert: true,
        newMessageAlert: true
      };
      await business.save();
    }
    
    res.json(business.notificationSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification settings', error });
  }
});

// Update business notification settings
router.put('/notifications', authenticateToken, requireRole(['business', 'admin']), async (req, res) => {
  try {
    const { emailNotifications, newChatAlert, newMessageAlert } = req.body;
    
    const business = await User.findById(req.user?.userId);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // Create or update notification settings
    business.notificationSettings = {
      emailNotifications: emailNotifications !== undefined ? emailNotifications : true,
      newChatAlert: newChatAlert !== undefined ? newChatAlert : true,
      newMessageAlert: newMessageAlert !== undefined ? newMessageAlert : true
    };
    
    await business.save();
    
    res.json({
      message: 'Notification settings updated successfully',
      notificationSettings: business.notificationSettings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification settings', error });
  }
});

export const businessRoutes = router; 