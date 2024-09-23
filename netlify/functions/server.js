const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB!');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to MongoDB!' }),
    };
  } catch (error) {
    console.error('Connection error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Connection error' }),
    };
  }
}

exports.handler = async (event, context) => {
  return await testConnection();
};
