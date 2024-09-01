import express from 'express';
import crypto from 'crypto';
const router = express.Router();

router.post('/createPlaylist', async (req, res) => {
  const { userid, title, content, link, tags, disclosureStatus, imgUrl } = req.body;
  const database = req.database;

  try {
    const playlistId = crypto.randomBytes(16).toString('hex');

    const newPlaylist = {
      id: playlistId,
      title,
      content,
      link,
      userId: userid,
      like: [],
      comments: [],
      date: new Date().toISOString().split('T')[0],
      disclosureStatus,
      tags,
      imgUrl,
    };

    await database.collection('playListData').insertOne(newPlaylist);

    res.status(201).send({ message: 'Playlist created successfully', playlistId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create playlist', error });
  }
});

export default router;

// curl -X POST "http://localhost:8080/api/createPlaylist" -H"Content-Type: application/json" -d '
// {"
// userid":"lovelace","
// title":"New Playlist","
// content":"This is a new playlist.","
// link":["https://example.com"],"
// tags":["new","music"]
// }'
// 플리 추가 api 입니다 이렇게 추가 하시면 됩니다
// curl -X POST "http://localhost:8080/api/createPlaylist" -H "Content-Type: application/json" -d '{"userid":"lovelace","title":"New Playlist","content":"This is a new playlist.","link":["https://example.com"],"tags":["new","music"]}'

