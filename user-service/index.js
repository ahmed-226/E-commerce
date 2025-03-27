const express = require('express');
const app = express();
const PORT = 3006;
require('dotenv').config();

app.use(express.json());

let users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', address: '123 Main St' }
];

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  Object.assign(user, req.body);
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});