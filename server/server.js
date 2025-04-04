import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import { authRoutes } from './routes/auth.js';
import { chatRoutes } from './routes/chat.js';
import { businessRoutes } from './routes/business.js';

// Load environment variables
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/business', businessRoutes);

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Serve React app in production for any non-API route
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/savvy-customer-compass');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  // Join a chat room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Send a message
  socket.on('send_message', (data) => {
    socket.to(data.roomId).emit('receive_message', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
}); 