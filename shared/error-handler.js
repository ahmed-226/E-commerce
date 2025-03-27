module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    
    // MongoDB duplicate key
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate key violation' });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
  };