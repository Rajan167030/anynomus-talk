const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Load users from file
const loadUsers = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Save users to file
const saveUsers = async (users) => {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
};

// User model functions
const createUser = async (userData) => {
  const users = await loadUsers();
  
  // Check if user already exists
  const existingUser = users.find(u => 
    u.email === userData.email || 
    (userData.phone && u.phone === userData.phone)
  );
  
  if (existingUser) {
    throw new Error('User already exists with this email or phone');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  
  const newUser = {
    id: uuidv4(),
    email: userData.email,
    phone: userData.phone || null,
    password: hashedPassword,
    gender: userData.gender,
    preferredGender: userData.preferredGender || 'any',
    interests: userData.interests || [],
    role: userData.role || 'user',
    verified: false,
    banned: false,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    profileComplete: true,
    reports: [],
    chatHistory: []
  };

  users.push(newUser);
  await saveUsers(users);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

const findUserByEmail = async (email) => {
  const users = await loadUsers();
  return users.find(user => user.email === email);
};

const findUserById = async (id) => {
  const users = await loadUsers();
  const user = users.find(user => user.id === id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

const updateUser = async (id, updateData) => {
  const users = await loadUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users[userIndex] = { ...users[userIndex], ...updateData };
  await saveUsers(users);
  
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const getAllUsers = async () => {
  const users = await loadUsers();
  return users.map(({ password, ...user }) => user);
};

const banUser = async (userId, reason) => {
  return await updateUser(userId, { 
    banned: true, 
    banReason: reason,
    bannedAt: new Date().toISOString()
  });
};

const unbanUser = async (userId) => {
  return await updateUser(userId, { 
    banned: false, 
    banReason: null,
    bannedAt: null
  });
};

const addReport = async (userId, report) => {
  const users = await loadUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  if (!users[userIndex].reports) {
    users[userIndex].reports = [];
  }

  users[userIndex].reports.push({
    id: uuidv4(),
    ...report,
    timestamp: new Date().toISOString()
  });

  await saveUsers(users);
  return users[userIndex].reports;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  validatePassword,
  getAllUsers,
  banUser,
  unbanUser,
  addReport
};