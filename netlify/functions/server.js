// netlify/functions/server.js
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
const sampleDBName = 'hansarang3club';
let database;

async function connectToDB() {
  try {
    const client = await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = client.connection.db;
  } catch (error) {
    console.error(error);
  }
}

connectToDB();

app.use((req, res, next) => {
  req.database = database;
  next();
});

// 라우트 설정
const youtubeRoute = require('./routes/youtube.js');
const timelineRoute = require('./routes/timeline.js');
const followCheckRoute = require('./routes/followCheck.js');
const followDeleteRoute = require('./routes/followDelete.js');
const followRoute = require('./routes/follow.js');
const passwordCheckRoute = require('./routes/passwordCheck.js');
const profileEditRoute = require('./routes/profileEdit.js');
const profileRoute = require('./routes/profile.js');
const profilePageRoute = require('./routes/profilePage.js');
const followingPageRoute = require('./routes/followingPage.js');
const followerPageRoute = require('./routes/followerPage.js');
const playlistEditRoute = require('./routes/playlistEdit.js');
const watchRoute = require('./routes/watch.js');
const searchRoute = require('./routes/search.js');
const searchsRoute = require('./routes/searchs.js');
const playlistPageRoute = require('./routes/playlistPage.js');
const likePageRoute = require('./routes/likePage.js');
const playlistDeleteRoute = require('./routes/playlistDelete.js');
const commentAddRoute = require('./routes/commentAdd.js');
const likeDeleteRoute = require('./routes/likeDelete.js');
const likeAddRoute = require('./routes/likeAdd.js');
const loginRoute = require('./routes/login.js');
const signupRoute = require('./routes/signup.js');
const signValidate = require('./routes/signValidate.js');
const createPlaylist = require('./routes/createPlaylist.js');
const likeCheckRoute = require('./routes/likeCheck.js');
const nicknameCheckRoute = require('./routes/nicknameCheck.js');
const uploadImageRoute = require('./routes/uploadImage.js');

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
app.use('/api/searchs', searchsRoute);
app.use('/api/playlistPage', playlistPageRoute);
app.use('/api/likePage', likePageRoute);
app.use('/api/playlistDelete', playlistDeleteRoute);
app.use('/api/commentAdd', commentAddRoute);
app.use('/api/likeDelete', likeDeleteRoute);
app.use('/api/likeAdd', likeAddRoute);
app.use('/api/likeCheck', likeCheckRoute);
app.use('/api/nicknameCheck', nicknameCheckRoute);
app.use('/api/uploadImage', uploadImageRoute);

// 서버리스 함수로 변환
module.exports.handler = serverless(app);
