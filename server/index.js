import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import loginRoute from './routes/login.js';
import signupRoute from './routes/signup.js';
import youtubeRoute from './routes/youtube.js';
import timelineRoute from './routes/timeline.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

const sampleDBName = 'hansarang3club';
let database;

async function connectToDB() {
  try {
    const client = await MongoClient.connect(MONGOURL);
    database = client.db(sampleDBName);
    app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행 중입니다.`));
  } catch (error) {
    console.error(error);
  }
}
connectToDB();

app.use((req, res, next) => {
  req.database = database;
  next();
});

app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/youtube', youtubeRoute);
app.use('/api/timeline', timelineRoute);
