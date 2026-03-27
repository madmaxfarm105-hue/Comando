const express = require('express');
const router = express.Router();

const Player = require('../models/User');
const { verifyGoogleToken } = require('./google-auth');
const { generateToken } = require('../utils/jwt-handler');

// LOGIN GOOGLE REAL
router.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Google token is required' });
    }

    const payload = await verifyGoogleToken(token);

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || 'Player';
    const avatar = payload.picture || '';

    if (!googleId || !email) {
      return res.status(400).json({ error: 'Invalid Google profile data' });
    }

    let player = await Player.findOne({ googleId });

    if (!player) {
      player = await Player.create({
        googleId,
        email,
        name,
        avatar,
        level: 1,
        hp: 100,
        money: 0,
      });
    } else {
      let changed = false;

      if (player.email !== email) {
        player.email = email;
        changed = true;
      }

      if (player.name !== name) {
        player.name = name;
        changed = true;
      }

      if (player.avatar !== avatar) {
        player.avatar = avatar;
        changed = true;
      }

      if (changed) {
        await player.save();
      }
    }

    const jwt = generateToken({
      userId: player._id.toString(),
      email: player.email,
      name: player.name,
    });

    return res.status(200).json({
      success: true,
      token: jwt,
      player: {
        userId: player._id.toString(),
        email: player.email,
        name: player.name,
        avatar: player.avatar,
        level: player.level,
        hp: player.hp,
        money: player.money,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);

    return res.status(500).json({
      error: 'Authentication failed',
      details: error.message,
    });
  }
});

// LISTAR PLAYERS
router.get('/players', async (_req, res) => {
  try {
    const players = await Player.find().select('-__v');
    return res.status(200).json(players);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// CRIAR PLAYER MANUAL
router.post('/players', async (req, res) => {
  try {
    const player = await Player.create(req.body);
    return res.status(201).json(player);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create player' });
  }
});

// DELETAR PLAYER
router.delete('/players/:id', async (req, res) => {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Player not found' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete player' });
  }
});

module.exports = router;