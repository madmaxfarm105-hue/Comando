const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    items: { type: [String], default: [] },
    balance: { type: Number, default: 0 },
    lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);