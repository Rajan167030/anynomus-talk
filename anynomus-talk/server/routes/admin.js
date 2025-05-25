const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const { getAllUsers, banUser, unbanUser, findUserById } = require('../models/User');
const { getAllReports, updateReportStatus } = require('../models/Chat');

const router = express.Router();

// Apply admin middleware to all routes
router.use(requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '' } = req.query;
    let users = await getAllUsers();

    // Filter by search term
    if (search) {
      users = users.filter(user => 
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.phone && user.phone.includes(search))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json({
      users: paginatedUsers,
      total: users.length,
      page: parseInt(page),
      totalPages: Math.ceil(users.length / limit)
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Get user details
router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Failed to get user details' });
  }
});

// Ban user
router.post('/users/:userId/ban', async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ error: 'Ban reason is required' });
    }

    const user = await banUser(userId, reason);
    
    res.json({
      message: 'User banned successfully',
      user
    });

  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ error: 'Failed to ban user' });
  }
});

// Unban user
router.post('/users/:userId/unban', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await unbanUser(userId);
    
    res.json({
      message: 'User unbanned successfully',
      user
    });

  } catch (error) {
    console.error('Unban user error:', error);
    res.status(500).json({ error: 'Failed to unban user' });
  }
});

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const { page = 1, limit = 50, status = 'all' } = req.query;
    const reports = await getAllReports(parseInt(page), parseInt(limit), status);
    
    res.json({ reports });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ error: 'Failed to get reports' });
  }
});

// Update report status
router.put('/reports/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['pending', 'reviewed', 'resolved', 'dismissed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const report = await updateReportStatus(reportId, status, adminNotes, req.user.id);
    
    res.json({
      message: 'Report updated successfully',
      report
    });

  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
});

// Get admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const users = await getAllUsers();
    const reports = await getAllReports(1, 1000, 'all');

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'online').length,
      bannedUsers: users.filter(u => u.banned).length,
      totalReports: reports.reports?.length || 0,
      pendingReports: reports.reports?.filter(r => r.status === 'pending').length || 0,
      newUsersToday: users.filter(u => {
        const today = new Date().toDateString();
        return new Date(u.createdAt).toDateString() === today;
      }).length
    };

    res.json({ stats });

  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to get admin statistics' });
  }
});

module.exports = router;