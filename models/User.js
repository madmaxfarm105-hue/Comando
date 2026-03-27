const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, default: '' },

  level: { type: Number, default: 1 },
  hp: { type: Number, default: 100 },
  money: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

playerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;