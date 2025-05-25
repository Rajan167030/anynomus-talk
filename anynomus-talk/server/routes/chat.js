const express = require('express');
const { addReport } = require('../models/User');
const { createChatSession, endChatSession, getChatHistory } = require('../models/Chat');

const router = express.Router();

// Report user endpoint
router.post('/report', async (req, res) => {
  try {
    const { reportedUserId, reason, description, chatId } = req.body;

    if (!reportedUserId || !reason) {
      return res.status(400).json({ error: 'Reported user ID and reason are required' });
    }

    const validReasons = ['inappropriate_content', 'harassment', 'spam', 'fake_profile', 'other'];
    if (!validReasons.includes(reason)) {
      return res.status(400).json({ error: 'Invalid report reason' });
    }

    const report = {
      reportedBy: req.user.id,
      reason,
      description: description || '',
      chatId: chatId || null,
      status: 'pending'
    };

    await addReport(reportedUserId, report);

    res.json({ message: 'Report submitted successfully' });

  } catch (error) {
    console.error('Report user error:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// Get chat history
router.get('/history', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const history = await getChatHistory(req.user.id, parseInt(page), parseInt(limit));
    
    res.json({ history });

  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
});

// Start new chat session
router.post('/start', async (req, res) => {
  try {
    const { interests } = req.body;
    
    const session = await createChatSession({
      userId: req.user.id,
      userGender: req.user.gender,
      preferredGender: req.user.preferredGender,
      interests: interests || req.user.interests || []
    });

    res.json({ 
      message: 'Chat session created',
      sessionId: session.id 
    });

  } catch (error) {
    console.error('Start chat error:', error);
    res.status(500).json({ error: 'Failed to start chat' });
  }
});

// End chat session
router.post('/end/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { reason } = req.body;

    await endChatSession(sessionId, req.user.id, reason);

    res.json({ message: 'Chat session ended' });

  } catch (error) {
    console.error('End chat error:', error);
    res.status(500).json({ error: 'Failed to end chat' });
  }
});

module.exports = router;