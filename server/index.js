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