const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGOURL = process.env.MONGO_URL;
let database;

async function connectToDB() {
  try {
    const client = await mongoose.connect(MONGOURL);
    database = client.connection.db;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error.message);
  }
}

// 데이터베이스 연결
(async () => {
  await connectToDB();
  app.use((req, res, next) => {
    req.database = database;
    next();
  });
})();

// MongoDB 연결 테스트 엔드포인트
app.get('/test-connection', async (req, res) => {
  try {
    await mongoose.connect(MONGOURL);
    res.status(200).send('Connected to MongoDB!');
  } catch (error) {
    res.status(500).send('Connection error: ' + error.message);
  }
});

// 서버리스 함수로 변환
module.exports.handler = serverless(app);
