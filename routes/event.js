const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');

const router = express.Router();

// Create Event
router.post('/create', async (req, res) => {
  const { title, description, date, location, category, visibility } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      visibility,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('attendees');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RSVP to Event
router.post('/rsvp', async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.attendees.push(userId);
    await event.save();

    res.json({ message: 'RSVP successful', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
