const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection();
