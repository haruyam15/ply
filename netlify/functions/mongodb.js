const mongoose = require('mongoose');

const connectMongo = async () => {
  if (mongoose.connection.readyState) return; // 이미 연결된 경우
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

exports.handler = async function (event, context) {
  try {
    await connectMongo();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'MongoDB 연결 성공' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'MongoDB 연결 실패', error: error.message }),
    };
  }
};
