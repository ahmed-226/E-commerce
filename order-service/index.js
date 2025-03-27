const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const connectDB = require('../shared/db-connection');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('../shared/error-handler'));

connectDB();

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
  }],
  status: String,
  total: Number
});
orderSchema.index({ userId: 1 });      
orderSchema.index({ createdAt: -1 });  

const Order = mongoose.model('Order', orderSchema);

// Routes
app.post('/orders', async (req, res) => {
  try {
   
    const product = await axios.get(`http://localhost:3002/products/${req.body.productId}`);
    
    const order = new Order({
      userId: req.user.userId,
      products: [{
        productId: req.body.productId,
        quantity: req.body.quantity
      }],
      status: 'created',
      total: product.data.price * req.body.quantity
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3003, () => console.log('Order Service running on port 3003'));