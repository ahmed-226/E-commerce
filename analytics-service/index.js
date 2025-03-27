const express = require('express');
const app = express();
const PORT = 3007;
require('dotenv').config();

app.use(express.json());
app.use(require('../shared/error-handler'));

let events = [];

app.post('/events', (req, res) => {
  const event = {
    id: events.length + 1,
    type: req.body.type,
    data: req.body.data,
    timestamp: new Date()
  };
  
  events.push(event);
  res.status(201).json(event);
});

app.get('/stats/orders', (req, res) => {
  const orderEvents = events.filter(e => e.type.includes('order'));
  res.json({
    totalOrders: orderEvents.length,
    shippedOrders: orderEvents.filter(e => e.type === 'order_shipped').length
  });
});

app.listen(PORT, () => {
  console.log(`Analytics Service running on port ${PORT}`);
});