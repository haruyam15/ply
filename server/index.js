import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';

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
    app.listen(PORT, () => console.log(`MongoDB listening on ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}
connectToDB();

app.get('/api/login', async (req, res) => {
  const { userid, password } = req.query;
  try {
    const user = await database.collection('information').findOne({ userid, password });
    if (user) {
      res.status(200).send({ message: 'Login successful', user });
    } else {
      res.status(401).send({ message: 'Invalid userid or password' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// 로그인 성공 curl -X GET "http://localhost:8080/api/login?userid=johndoe&password=john1234"
// 로그인 실패 curl -X GET "http://localhost:8080/api/login?userid=invaliduser&password=invalidpass"

app.get('/api/followers', async (req, res) => {
  const { userid } = req.query;
  try {
    const user = await database.collection('users').findOne({ "information.userid": userid });
    if (user) {
      res.status(200).send({ followers: user.followers });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//curl -X GET "http://localhost:8080/api/followers?userid=johndoe"

app.get('/api/following', async (req, res) => {
  const { userid } = req.query;
  try {
    const user = await database.collection('users').findOne({ "information.userid": userid });
    if (user) {
      res.status(200).send({ following: user.following });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// curl -X GET "http://localhost:8080/api/following?userid=johndoe"

app.get('/api/likes', async (req, res) => {
  const { userid } = req.query;
  try {
    const user = await database.collection('users').findOne({ "information.userid": userid });
    if (user) {
      res.status(200).send({ likes: user.like });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// curl -X GET "http://localhost:8080/api/likes?userid=johndoe"