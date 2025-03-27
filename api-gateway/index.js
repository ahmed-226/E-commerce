const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000;
const cors = require('cors');  
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(require('../shared/error-handler'));


const services = {
  '/auth': 'http://localhost:3001',
  '/catalog': 'http://localhost:3002',
  '/orders': 'http://localhost:3003',
  '/payments': 'http://localhost:3004',
  '/shipping': 'http://localhost:3005',
  '/users': 'http://localhost:3006',
  '/analytics': 'http://localhost:3007'
};

for (const [path, target] of Object.entries(services)) {
  app.use(path, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${path}`]: '' }
  }));
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is healthy' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});