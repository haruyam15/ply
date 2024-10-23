import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import youtubeRoute from './routes/youtube.js';
import timelineRoute from './routes/timeline.js';
import followCheckRoute from './routes/followCheck.js';
import followDeleteRoute from './routes/followDelete.js';
import followRoute from './routes/follow.js';
import passwordCheckRoute from './routes/passwordCheck.js';
import profileEditRoute from './routes/profileEdit.js';
import profileRoute from './routes/profile.js';
import profilePageRoute from './routes/profilePage.js';
import followingPageRoute from './routes/followingPage.js';
import followerPageRoute from './routes/followerPage.js';
import playlistEditRoute from './routes/playlistEdit.js';
import watchRoute from './routes/watch.js';
import searchRoute from './routes/search.js';
import searchsRoute from './routes/searchs.js';
import playlistPageRoute from './routes/playlistPage.js';
import likePageRoute from './routes/likePage.js';
import playlistDeleteRoute from './routes/playlistDelete.js';
import commentAddRoute from './routes/commentAdd.js';
import likeDeleteRoute from './routes/likeDelete.js';
import likeAddRoute from './routes/likeAdd.js';
import loginRoute from './routes/login.js';
import signupRoute from './routes/signup.js';
import signValidate from './routes/signValidate.js';
import createPlaylist from './routes/createPlaylist.js';
import likeCheckRoute from './routes/likeCheck.js';
import nicknameCheckRoute from './routes/nicknameCheck.js';
import uploadImageRoute from './routes/uploadImage.js';

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

app.use('/uploads', express.static('uploads'));

app.use('/api', loginRoute);
app.use('/api', signupRoute);
app.use('/api', signValidate);
app.use('/api', createPlaylist);
app.use('/api/youtube', youtubeRoute);
app.use('/api/timeline', timelineRoute);
app.use('/api/followCheck', followCheckRoute);
app.use('/api/followDelete', followDeleteRoute);
app.use('/api/follow', followRoute);
app.use('/api/passwordCheck', passwordCheckRoute);
app.use('/api/profileEdit', profileEditRoute);
app.use('/api/profile', profileRoute);
app.use('/api/profilePage', profilePageRoute);
app.use('/api/followingPage', followingPageRoute);
app.use('/api/followerPage', followerPageRoute);
app.use('/api/playlistEdit', playlistEditRoute);
app.use('/api/watch', watchRoute);
app.use('/api/search', searchRoute);
app.use('/api/searchs', searchsRoute); // 새로 추가된 searchs 라우트
app.use('/api/playlistPage', playlistPageRoute);
app.use('/api/likePage', likePageRoute);
app.use('/api/playlistDelete', playlistDeleteRoute);
app.use('/api/commentAdd', commentAddRoute);
app.use('/api/likeDelete', likeDeleteRoute);
app.use('/api/likeAdd', likeAddRoute);
app.use('/api/likeCheck', likeCheckRoute);
app.use('/api/nicknameCheck', nicknameCheckRoute);
app.use('/api/uploadImage', uploadImageRoute);
