const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyGoogleToken } = require('./google-auth');
const { generateToken } = require('../utils/jwt-handler');

// GOOGLE LOGIN VIA TOKEN
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

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
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

      if (user.email !== email) {
        user.email = email;
        changed = true;
      }

      if (user.name !== name) {
        user.name = name;
        changed = true;
      }

      if (user.avatar !== avatar) {
        user.avatar = avatar;
        changed = true;
      }

      if (changed) {
        await user.save();
      }
    }

    const jwt = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return res.status(200).json({
      success: true,
      token: jwt,
      user: {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        level: user.level,
        hp: user.hp,
        money: user.money,
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

// PLAYER DATA ROUTES
router.get('/players', async (_req, res) => {
  try {
    const players = await User.find().select('-__v');
    return res.status(200).json(players);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch players' });
  }
});

router.post('/players', async (req, res) => {
  try {
    const player = await User.create(req.body);
    return res.status(201).json(player);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create player' });
  }
});

router.delete('/players/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Player not found' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete player' });
  }
});

module.exports = router;