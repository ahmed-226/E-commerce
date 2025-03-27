const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3004;
require('dotenv').config();

app.use(express.json());
app.use(require('../shared/error-handler'));

let payments = [];

app.post('/payments', async (req, res) => {
  const { orderId, amount, userId } = req.body;
  
  const payment = {
    id: payments.length + 1,
    orderId,
    userId,
    amount,
    status: 'pending',
    createdAt: new Date()
  };
  
  payments.push(payment);
  
  setTimeout(async () => {
    payment.status = 'completed';
    
    await axios.patch(`http://localhost:3003/orders/${orderId}/status`, {
      status: 'payment_completed'
    });
    
    await axios.post('http://localhost:3005/shipments', {
      orderId,
      userId,
      paymentId: payment.id
    });
  }, 2000);
  
  res.status(201).json(payment);
});

app.get('/payments/:id', (req, res) => {
  const payment = payments.find(p => p.id == req.params.id);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});