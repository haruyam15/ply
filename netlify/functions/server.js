const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

const app = express();
const MONGOURL = process.env.MONGO_URL;

async function connectToDB() {
  try {
    // MongoDB에 연결 시도
    await mongoose.connect(MONGOURL, {
      connectTimeoutMS: 30000, // 연결 타임아웃 30초
      socketTimeoutMS: 45000, // 소켓 타임아웃 45초
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  } finally {
    mongoose.connection.close(); // 테스트 후 연결 종료
  }
}

// 연결 테스트를 위한 라우트 추가
app.get('/test-connection', async (req, res) => {
  await connectToDB();
  res.send('Check the logs for the connection status');
});

// 서버리스 함수로 변환
module.exports.handler = serverless(app);

const axios = require('axios');

axios
  .get('/.netlify/functions/server/test-connection')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
