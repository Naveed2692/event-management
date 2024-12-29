"use client"
import { useState, useEffect } from 'react';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({ category: '', date: '' });

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div>
      <h1>Event Dashboard</h1>
      <div>
        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
        </select>
        <input
          type="date"
          name="date"
          onChange={handleFilterChange}
        />
      </div>
      <ul>
        {events
          .filter(
            (event) =>
              (!filter.category || event.category === filter.category) &&
              (!filter.date || new Date(event.date).toISOString().split('T')[0] === filter.date)
          )
          .map((event) => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.date}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EventDashboard;

