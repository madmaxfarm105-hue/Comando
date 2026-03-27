require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require('./routes/auth-routes');

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multiplayer-game')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'super_secret_session_key',
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use(authRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to the Multiplayer Game!');
});

// Start server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start listening on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('CLIENT ID:', process.env.GOOGLE_CLIENT_ID);
});