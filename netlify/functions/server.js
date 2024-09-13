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
const youtubeRoute = require('../../server/routes/youtube.js');
const timelineRoute = require('../../server/routes/timeline.js');
const followCheckRoute = require('../../server/routes/followCheck.js');
const followDeleteRoute = require('../../server/routes/followDelete.js');
const followRoute = require('../../server/routes/follow.js');
const passwordCheckRoute = require('../../server/routes/passwordCheck.js');
const profileEditRoute = require('../../server/routes/profileEdit.js');
const profileRoute = require('../../server/routes/profile.js');
const profilePageRoute = require('../../server/routes/profilePage.js');
const followingPageRoute = require('../../server/routes/followingPage.js');
const followerPageRoute = require('../../server/routes/followerPage.js');
const playlistEditRoute = require('../../server/routes/playlistEdit.js');
const watchRoute = require('../../server/routes/watch.js');
const searchRoute = require('../../server/routes/search.js');
const searchsRoute = require('../../server/routes/searchs.js');
const playlistPageRoute = require('../../server/routes/playlistPage.js');
const likePageRoute = require('../../server/routes/likePage.js');
const playlistDeleteRoute = require('../../server/routes/playlistDelete.js');
const commentAddRoute = require('../../server/routes/commentAdd.js');
const likeDeleteRoute = require('../../server/routes/likeDelete.js');
const likeAddRoute = require('../../server/routes/likeAdd.js');
const loginRoute = require('../../server/routes/login.js');
const signupRoute = require('../../server/routes/signup.js');
const signValidate = require('../../server/routes/signValidate.js');
const createPlaylist = require('../../server/routes/createPlaylist.js');
const likeCheckRoute = require('../../server/routes/likeCheck.js');
const nicknameCheckRoute = require('../../server/routes/nicknameCheck.js');
const uploadImageRoute = require('../../server/routes/uploadImage.js');

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
