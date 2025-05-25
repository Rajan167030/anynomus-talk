import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState('idle'); // idle, searching, connected, ended

  useEffect(() => {
    if (user && token) {
      const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'https://work-2-sohzxegtnjdjmuxm.prod-runtime.all-hands.dev', {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling']
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
        setSocket(newSocket);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
        setChatStatus('idle');
        setCurrentChat(null);
        setMessages([]);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        toast.error('Failed to connect to chat server');
        setConnected(false);
      });

      // Chat events
      newSocket.on('waiting_for_partner', (data) => {
        setChatStatus('searching');
        setCurrentChat(data.chatId);
        setMessages([]);
        toast.success(data.message);
      });

      newSocket.on('chat_found', (data) => {
        setChatStatus('connected');
        setCurrentChat(data.chatId);
      });

      newSocket.on('chat_started', (data) => {
        setChatStatus('connected');
        toast.success(data.message);
        setMessages([{
          id: 'system-start',
          message: data.message,
          timestamp: new Date().toISOString(),
          isSystem: true
        }]);
      });

      newSocket.on('new_message', (data) => {
        setMessages(prev => [...prev, {
          ...data,
          isOwn: false
        }]);
      });

      newSocket.on('message_sent', (data) => {
        setMessages(prev => [...prev, {
          ...data,
          isOwn: true
        }]);
      });

      newSocket.on('user_typing', (data) => {
        setIsTyping(data.typing);
        if (data.typing) {
          setTimeout(() => setIsTyping(false), 3000);
        }
      });

      newSocket.on('chat_ended', (data) => {
        setChatStatus('ended');
        setIsTyping(false);
        toast.info(data.message);
        setMessages(prev => [...prev, {
          id: 'system-end',
          message: data.message,
          timestamp: new Date().toISOString(),
          isSystem: true
        }]);
      });

      newSocket.on('report_submitted', (data) => {
        toast.success(data.message);
      });

      newSocket.on('error', (data) => {
        toast.error(data.message);
      });

      return () => {
        newSocket.close();
        setSocket(null);
        setConnected(false);
        setChatStatus('idle');
        setCurrentChat(null);
        setMessages([]);
      };
    }
  }, [user, token]);

  const findChat = (interests = []) => {
    if (socket && connected) {
      setChatStatus('searching');
      setMessages([]);
      socket.emit('find_chat', { interests });
    }
  };

  const sendMessage = (message) => {
    if (socket && connected && currentChat && message.trim()) {
      socket.emit('send_message', {
        chatId: currentChat,
        message: message.trim()
      });
    }
  };

  const skipChat = (reason = 'user_skipped') => {
    if (socket && connected && currentChat) {
      socket.emit('skip_chat', {
        chatId: currentChat,
        reason
      });
      setChatStatus('idle');
      setCurrentChat(null);
      setMessages([]);
      setIsTyping(false);
    }
  };

  const reportUser = (reason, description = '') => {
    if (socket && connected && currentChat) {
      socket.emit('report_user', {
        chatId: currentChat,
        reason,
        description
      });
    }
  };

  const startTyping = () => {
    if (socket && connected && currentChat) {
      socket.emit('typing_start', { chatId: currentChat });
    }
  };

  const stopTyping = () => {
    if (socket && connected && currentChat) {
      socket.emit('typing_stop', { chatId: currentChat });
    }
  };

  const value = {
    socket,
    connected,
    currentChat,
    messages,
    isTyping,
    chatStatus,
    findChat,
    sendMessage,
    skipChat,
    reportUser,
    startTyping,
    stopTyping,
    setMessages,
    setChatStatus
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};