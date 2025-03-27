mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected to ${mongoose.connection.host}`);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected!');
  });