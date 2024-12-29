const express = require('express');
const authRoutes = require('./auth');
const eventRoutes = require('./event');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);

module.exports = router;
