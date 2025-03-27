const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3005;
require('dotenv').config();

app.use(express.json());

let shipments = [];

app.post('/shipments', async (req, res) => {
  const { orderId, userId, paymentId } = req.body;
  
  const shipment = {
    id: shipments.length + 1,
    orderId,
    userId,
    paymentId,
    status: 'processing',
    trackingNumber: `TRACK-${Date.now()}`,
    createdAt: new Date()
  };
  
  shipments.push(shipment);
  
  setTimeout(async () => {
    shipment.status = 'shipped';
    
    await axios.patch(`http://localhost:3003/orders/${orderId}/status`, {
      status: 'shipped'
    });
    
    await axios.post('http://localhost:3007/events', {
      type: 'order_shipped',
      data: { orderId, userId, shippedAt: new Date() }
    });
  }, 3000);
  
  res.status(201).json(shipment);
});

app.get('/shipments/:id', (req, res) => {
  const shipment = shipments.find(s => s.id == req.params.id);
  if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
  res.json(shipment);
});

app.listen(PORT, () => {
  console.log(`Shipping Service running on port ${PORT}`);
});