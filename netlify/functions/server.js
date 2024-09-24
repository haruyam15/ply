const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const MONGOURL = process.env.MONGO_URL;

async function connectToDB() {
  try {
    await mongoose.connect(MONGOURL, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
}

// DB 연결 후 라우트를 설정
connectToDB().then(() => {
  app.get('/test-connection', async (req, res) => {
    res.send('MongoDB connection status checked. Check the logs for details.');
  });
});

module.exports.handler = serverless(app);
