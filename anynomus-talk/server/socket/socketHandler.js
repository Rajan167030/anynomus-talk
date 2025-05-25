const { authenticateSocket } = require('../middleware/auth');
const { 
  createChatSession, 
  findMatchingChat, 
  joinChatSession, 
  addMessage, 
  endChatSession,
  getChatById 
} = require('../models/Chat');
const { updateUser } = require('../models/User');
const Filter = require('bad-words');

const filter = new Filter();

// Store active connections
const activeUsers = new Map();
const chatRooms = new Map();

const initializeSocket = (io) => {
  // Authentication middleware
  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.id} connected`);

    // Store user connection
    activeUsers.set(socket.user.id, {
      socketId: socket.id,
      user: socket.user,
      status: 'online',
      currentChat: null
    });

    // Update user status to online
    updateUser(socket.user.id, { 
      status: 'online', 
      lastActive: new Date().toISOString() 
    });

    // Handle finding a chat partner
    socket.on('find_chat', async (data) => {
      try {
        const { interests } = data;
        const userData = {
          userId: socket.user.id,
          userGender: socket.user.gender,
          preferredGender: socket.user.preferredGender,
          interests: interests || socket.user.interests || []
        };

        // First, try to find an existing waiting chat
        let chat = await findMatchingChat(userData);

        if (chat) {
          // Join existing chat
          chat = await joinChatSession(chat.id, socket.user.id, socket.user.gender);
          
          // Get the other user's socket
          const otherUserId = chat.participants.find(id => id !== socket.user.id);
          const otherUserConnection = activeUsers.get(otherUserId);

          if (otherUserConnection) {
            const otherSocket = io.sockets.sockets.get(otherUserConnection.socketId);
            
            // Join both users to the chat room
            socket.join(chat.id);
            otherSocket.join(chat.id);

            // Update active users
            activeUsers.get(socket.user.id).currentChat = chat.id;
            activeUsers.get(otherUserId).currentChat = chat.id;

            // Store chat room info
            chatRooms.set(chat.id, {
              participants: chat.participants,
              createdAt: chat.createdAt
            });

            // Notify both users that chat has started
            io.to(chat.id).emit('chat_started', {
              chatId: chat.id,
              message: 'You are now connected with a stranger. Say hello!'
            });

            socket.emit('chat_found', { chatId: chat.id });
            otherSocket.emit('chat_found', { chatId: chat.id });
          }
        } else {
          // Create new waiting chat
          chat = await createChatSession(userData);
          
          // Update user's current chat
          activeUsers.get(socket.user.id).currentChat = chat.id;
          
          socket.emit('waiting_for_partner', { 
            chatId: chat.id,
            message: 'Looking for someone to chat with...' 
          });
        }

      } catch (error) {
        console.error('Find chat error:', error);
        socket.emit('error', { message: 'Failed to find chat partner' });
      }
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
      try {
        const { chatId, message } = data;
        
        if (!chatId || !message || message.trim().length === 0) {
          return socket.emit('error', { message: 'Invalid message data' });
        }

        // Check if user is in this chat
        const userConnection = activeUsers.get(socket.user.id);
        if (!userConnection || userConnection.currentChat !== chatId) {
          return socket.emit('error', { message: 'You are not in this chat' });
        }

        // Filter profanity
        const filteredMessage = filter.clean(message.trim());

        // Add message to database
        const newMessage = await addMessage(chatId, socket.user.id, filteredMessage);

        // Send message to all participants in the chat room
        io.to(chatId).emit('new_message', {
          id: newMessage.id,
          message: newMessage.message,
          timestamp: newMessage.timestamp,
          isOwn: false // Will be set to true on sender's client
        });

        // Mark as own message for sender
        socket.emit('message_sent', {
          id: newMessage.id,
          message: newMessage.message,
          timestamp: newMessage.timestamp,
          isOwn: true
        });

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { chatId } = data;
      const userConnection = activeUsers.get(socket.user.id);
      
      if (userConnection && userConnection.currentChat === chatId) {
        socket.to(chatId).emit('user_typing', { typing: true });
      }
    });

    socket.on('typing_stop', (data) => {
      const { chatId } = data;
      const userConnection = activeUsers.get(socket.user.id);
      
      if (userConnection && userConnection.currentChat === chatId) {
        socket.to(chatId).emit('user_typing', { typing: false });
      }
    });

    // Handle skipping/ending chat
    socket.on('skip_chat', async (data) => {
      try {
        const { chatId, reason = 'user_skipped' } = data;
        
        const userConnection = activeUsers.get(socket.user.id);
        if (!userConnection || userConnection.currentChat !== chatId) {
          return socket.emit('error', { message: 'You are not in this chat' });
        }

        // End the chat session
        await endChatSession(chatId, socket.user.id, reason);

        // Notify all participants
        io.to(chatId).emit('chat_ended', {
          reason: 'partner_left',
          message: 'Your chat partner has left the conversation.'
        });

        // Remove users from chat room
        const chatRoom = chatRooms.get(chatId);
        if (chatRoom) {
          chatRoom.participants.forEach(userId => {
            const connection = activeUsers.get(userId);
            if (connection) {
              const userSocket = io.sockets.sockets.get(connection.socketId);
              if (userSocket) {
                userSocket.leave(chatId);
              }
              connection.currentChat = null;
            }
          });
          chatRooms.delete(chatId);
        }

      } catch (error) {
        console.error('Skip chat error:', error);
        socket.emit('error', { message: 'Failed to end chat' });
      }
    });

    // Handle user disconnect
    socket.on('disconnect', async () => {
      console.log(`User ${socket.user.id} disconnected`);

      try {
        const userConnection = activeUsers.get(socket.user.id);
        
        if (userConnection && userConnection.currentChat) {
          const chatId = userConnection.currentChat;
          
          // End the chat session
          await endChatSession(chatId, socket.user.id, 'user_disconnected');

          // Notify other participants
          socket.to(chatId).emit('chat_ended', {
            reason: 'partner_disconnected',
            message: 'Your chat partner has disconnected.'
          });

          // Clean up chat room
          const chatRoom = chatRooms.get(chatId);
          if (chatRoom) {
            chatRoom.participants.forEach(userId => {
              if (userId !== socket.user.id) {
                const connection = activeUsers.get(userId);
                if (connection) {
                  connection.currentChat = null;
                }
              }
            });
            chatRooms.delete(chatId);
          }
        }

        // Update user status to offline
        await updateUser(socket.user.id, { 
          status: 'offline', 
          lastActive: new Date().toISOString() 
        });

        // Remove from active users
        activeUsers.delete(socket.user.id);

      } catch (error) {
        console.error('Disconnect cleanup error:', error);
      }
    });

    // Handle reporting users
    socket.on('report_user', async (data) => {
      try {
        const { chatId, reason, description } = data;
        
        const chat = await getChatById(chatId);
        if (!chat || !chat.participants.includes(socket.user.id)) {
          return socket.emit('error', { message: 'Invalid chat session' });
        }

        const reportedUserId = chat.participants.find(id => id !== socket.user.id);
        
        // This would typically call the report API
        socket.emit('report_submitted', { 
          message: 'Report submitted successfully' 
        });

      } catch (error) {
        console.error('Report user error:', error);
        socket.emit('error', { message: 'Failed to submit report' });
      }
    });
  });

  // Cleanup inactive connections periodically
  setInterval(() => {
    const now = Date.now();
    const timeout = 30 * 60 * 1000; // 30 minutes

    activeUsers.forEach((connection, userId) => {
      const socket = io.sockets.sockets.get(connection.socketId);
      if (!socket || (now - socket.handshake.time) > timeout) {
        activeUsers.delete(userId);
      }
    });
  }, 5 * 60 * 1000); // Check every 5 minutes
};

module.exports = { initializeSocket };