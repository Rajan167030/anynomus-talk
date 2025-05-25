const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const CHATS_FILE = path.join(__dirname, '../data/chats.json');
const REPORTS_FILE = path.join(__dirname, '../data/reports.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(CHATS_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Load chats from file
const loadChats = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CHATS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Save chats to file
const saveChats = async (chats) => {
  await ensureDataDir();
  await fs.writeFile(CHATS_FILE, JSON.stringify(chats, null, 2));
};

// Load reports from file
const loadReports = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(REPORTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Save reports to file
const saveReports = async (reports) => {
  await ensureDataDir();
  await fs.writeFile(REPORTS_FILE, JSON.stringify(reports, null, 2));
};

// Create new chat session
const createChatSession = async (userData) => {
  const chats = await loadChats();
  
  const newChat = {
    id: uuidv4(),
    participants: [userData.userId],
    userGenders: [userData.userGender],
    preferredGender: userData.preferredGender,
    interests: userData.interests,
    status: 'waiting', // waiting, active, ended
    messages: [],
    createdAt: new Date().toISOString(),
    endedAt: null,
    endReason: null
  };

  chats.push(newChat);
  await saveChats(chats);
  
  return newChat;
};

// Find matching chat session
const findMatchingChat = async (userData) => {
  const chats = await loadChats();
  
  // Find waiting chats that match criteria
  const waitingChats = chats.filter(chat => 
    chat.status === 'waiting' && 
    chat.participants.length === 1 &&
    chat.participants[0] !== userData.userId
  );

  for (const chat of waitingChats) {
    const otherUserGender = chat.userGenders[0];
    const chatPreferredGender = chat.preferredGender;
    
    // Check gender preferences
    const genderMatch = (
      (userData.preferredGender === 'any' || userData.preferredGender === otherUserGender) &&
      (chatPreferredGender === 'any' || chatPreferredGender === userData.userGender)
    );

    if (genderMatch) {
      // Check interest overlap (optional enhancement)
      const commonInterests = userData.interests.filter(interest => 
        chat.interests.includes(interest)
      );

      // Prioritize chats with common interests, but don't require them
      if (commonInterests.length > 0 || userData.interests.length === 0 || chat.interests.length === 0) {
        return chat;
      }
    }
  }

  // If no perfect match, find any compatible chat
  return waitingChats.find(chat => {
    const otherUserGender = chat.userGenders[0];
    const chatPreferredGender = chat.preferredGender;
    
    return (
      (userData.preferredGender === 'any' || userData.preferredGender === otherUserGender) &&
      (chatPreferredGender === 'any' || chatPreferredGender === userData.userGender)
    );
  });
};

// Join existing chat session
const joinChatSession = async (chatId, userId, userGender) => {
  const chats = await loadChats();
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  
  if (chatIndex === -1) {
    throw new Error('Chat session not found');
  }

  const chat = chats[chatIndex];
  
  if (chat.status !== 'waiting') {
    throw new Error('Chat session is not available');
  }

  if (chat.participants.includes(userId)) {
    throw new Error('User already in this chat');
  }

  chat.participants.push(userId);
  chat.userGenders.push(userGender);
  chat.status = 'active';
  chat.startedAt = new Date().toISOString();

  chats[chatIndex] = chat;
  await saveChats(chats);
  
  return chat;
};

// Add message to chat
const addMessage = async (chatId, userId, message, messageType = 'text') => {
  const chats = await loadChats();
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  
  if (chatIndex === -1) {
    throw new Error('Chat session not found');
  }

  const chat = chats[chatIndex];
  
  if (!chat.participants.includes(userId)) {
    throw new Error('User not in this chat');
  }

  if (chat.status !== 'active') {
    throw new Error('Chat session is not active');
  }

  const newMessage = {
    id: uuidv4(),
    userId,
    message,
    type: messageType,
    timestamp: new Date().toISOString()
  };

  chat.messages.push(newMessage);
  chats[chatIndex] = chat;
  await saveChats(chats);
  
  return newMessage;
};

// End chat session
const endChatSession = async (chatId, userId, reason = 'user_left') => {
  const chats = await loadChats();
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  
  if (chatIndex === -1) {
    throw new Error('Chat session not found');
  }

  const chat = chats[chatIndex];
  
  if (!chat.participants.includes(userId)) {
    throw new Error('User not in this chat');
  }

  chat.status = 'ended';
  chat.endedAt = new Date().toISOString();
  chat.endReason = reason;

  chats[chatIndex] = chat;
  await saveChats(chats);
  
  return chat;
};

// Get chat by ID
const getChatById = async (chatId) => {
  const chats = await loadChats();
  return chats.find(chat => chat.id === chatId);
};

// Get user's chat history
const getChatHistory = async (userId, page = 1, limit = 20) => {
  const chats = await loadChats();
  
  const userChats = chats
    .filter(chat => chat.participants.includes(userId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedChats = userChats.slice(startIndex, endIndex);

  return {
    chats: paginatedChats.map(chat => ({
      id: chat.id,
      status: chat.status,
      createdAt: chat.createdAt,
      endedAt: chat.endedAt,
      endReason: chat.endReason,
      messageCount: chat.messages.length,
      duration: chat.endedAt ? 
        new Date(chat.endedAt) - new Date(chat.startedAt || chat.createdAt) : null
    })),
    total: userChats.length,
    page,
    totalPages: Math.ceil(userChats.length / limit)
  };
};

// Get all reports
const getAllReports = async (page = 1, limit = 50, status = 'all') => {
  const reports = await loadReports();
  
  let filteredReports = reports;
  if (status !== 'all') {
    filteredReports = reports.filter(report => report.status === status);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  return {
    reports: paginatedReports,
    total: filteredReports.length,
    page,
    totalPages: Math.ceil(filteredReports.length / limit)
  };
};

// Update report status
const updateReportStatus = async (reportId, status, adminNotes, adminId) => {
  const reports = await loadReports();
  const reportIndex = reports.findIndex(report => report.id === reportId);
  
  if (reportIndex === -1) {
    throw new Error('Report not found');
  }

  reports[reportIndex] = {
    ...reports[reportIndex],
    status,
    adminNotes: adminNotes || reports[reportIndex].adminNotes,
    reviewedBy: adminId,
    reviewedAt: new Date().toISOString()
  };

  await saveReports(reports);
  return reports[reportIndex];
};

module.exports = {
  createChatSession,
  findMatchingChat,
  joinChatSession,
  addMessage,
  endChatSession,
  getChatById,
  getChatHistory,
  getAllReports,
  updateReportStatus
};