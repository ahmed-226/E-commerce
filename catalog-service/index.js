const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../shared/db-connection');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('../shared/error-handler'));

connectDB();

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
});
const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

app.listen(3002, () => console.log('Catalog Service running on port 3002'));