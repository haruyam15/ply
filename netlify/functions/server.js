const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

const MONGOURL = process.env.MONGO_URL;

async function connectToDB() {
  try {
    // MongoDB에 연결 시도
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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

connectToDB();
