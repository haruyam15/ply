import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import loginRoute from './routes/login.js';
import signupRoute from './routes/signup.js';
import registerRoute from './routes/getPlaylist.js';
import followersRoute from './routes/followers.js';
import followingRoute from './routes/following.js';
import updateProfileRoute from './routes/updateUserInfo.js';
import userProfileRoute from './routes/userProfile.js';
import myPlaylistDataRoute from './routes/myPlaylistData.js';
import likedPlaylistsRoute from './routes/likedPlaylists.js';
import createPlaylistRoute from './routes/createPlaylist.js';
import likePlaylistRoute from './routes/like.js';
import commentRoute from './routes/comment.js';
import getPlaylistRoute from './routes/getPlaylist.js';
import deletePlaylistRoute from './routes/deletePlaylist.js';
import updateUserInfoRoute from './routes/updateUserInfo.js';
import youtubeRoute from './routes/youtube.js';

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

app.use((req, res, next) => {
  req.database = database;
  next();
});

app.use('/api', loginRoute);
app.use('/api', signupRoute);
app.use('/api', registerRoute);
app.use('/api', followersRoute);
app.use('/api', followingRoute);
app.use('/api', updateProfileRoute);
app.use('/api', userProfileRoute);
app.use('/api', myPlaylistDataRoute);
app.use('/api', likedPlaylistsRoute);
app.use('/api', createPlaylistRoute);
app.use('/api', likePlaylistRoute);
app.use('/api', commentRoute);
app.use('/api', getPlaylistRoute);
app.use('/api', deletePlaylistRoute);
app.use('/api', updateUserInfoRoute);
app.use('/api', youtubeRoute);

app.post('/api/register', async (req, res) => {
  const { userid, password, nickname } = req.body;
  if (!userid || !password || !nickname) {
    return res.status(400).send({ message: 'All fields are required' });
  }
  try {
    const newUser = {
      id: userid,
      information: {
        userid,
        password,
        profileimage: '',
        nickname,
      },
      like: [],
      following: [],
      followers: [],
    };
    const result = await database.collection('users').insertOne(newUser);
    res.status(201).send({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).send(error);
  }
});
