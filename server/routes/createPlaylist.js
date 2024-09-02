import express from 'express';
import crypto from 'crypto';
const router = express.Router();

router.post('/createPlaylist', async (req, res) => {
  const { userId, title, content, link, tags, disclosureStatus, imgUrl } = req.body;
  const database = req.database;

  try {
    const playlistId = crypto.randomBytes(16).toString('hex');

    const newPlaylist = {
      id: playlistId,
      title,
      content,
      link,
      userId,
      like: [],
      comments: [],
      date: new Date().toISOString().split('T')[0],
      disclosureStatus,
      tags,
      imgUrl,
    };

    await database.collection('playListData').insertOne(newPlaylist);

    const user = await database.collection('users').findOne({ userId: userId });
    if (user) {
      await database
        .collection('users')
        .updateOne({ userId: userId }, { $push: { myPlaylists: playlistId } });
      console.log('Updated playlist');
    }

    res.status(201).send({ message: 'Playlist created successfully', playlistId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create playlist', error });
  }
});

export default router;
