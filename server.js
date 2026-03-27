// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/multiplayer-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Start server
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.send('Welcome to the Multiplayer Game!');
});

// Socket.io for real-time chat
io.on('connection', (socket) => {
    console.log('New client connected');
    // Handle chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start listening on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
