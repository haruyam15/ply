import express from 'express';
const router = express.Router();

router.post('/likePlaylist', async (req, res) => {
  const { userid, playlistId } = req.body;
  const database = req.database;

  try {
    await database
      .collection('playListData')
      .updateOne({ id: playlistId }, { $addToSet: { like: userid } });

    await database
      .collection('users')
      .updateOne({ 'information.userid': userid }, { $addToSet: { like: playlistId } });

    res.status(200).send({ message: 'Playlist liked successfully' });
  } catch (error) {
    console.error('Error liking playlist:', error);
    res.status(500).send({ message: 'Failed to like playlist', error });
  }
});

export default router;

// curl -X POST "http://localhost:8080/api/likePlaylist" -H "Content-Type: application/json" -d '{"userid":"lovelace","playlistId":"3"}'
