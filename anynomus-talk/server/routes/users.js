const express = require('express');
const { updateUser, findUserById } = require('../models/User');

const router = express.Router();

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { gender, preferredGender, interests } = req.body;
    const updateData = {};

    if (gender && ['male', 'female', 'other'].includes(gender.toLowerCase())) {
      updateData.gender = gender.toLowerCase();
    }

    if (preferredGender && ['male', 'female', 'other', 'any'].includes(preferredGender.toLowerCase())) {
      updateData.preferredGender = preferredGender.toLowerCase();
    }

    if (interests && Array.isArray(interests)) {
      updateData.interests = interests.filter(interest => 
        typeof interest === 'string' && interest.trim().length > 0
      );
    }

    const updatedUser = await updateUser(req.user.id, updateData);
    
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update user status (online/offline)
router.put('/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['online', 'offline', 'away'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = {
      status,
      lastActive: new Date().toISOString()
    };

    const updatedUser = await updateUser(req.user.id, updateData);
    
    res.json({
      message: 'Status updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Get user statistics
router.get('/stats', async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    
    const stats = {
      totalChats: user.chatHistory?.length || 0,
      joinDate: user.createdAt,
      lastActive: user.lastActive,
      reportsReceived: user.reports?.length || 0,
      verified: user.verified || false
    };

    res.json({ stats });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

module.exports = router;