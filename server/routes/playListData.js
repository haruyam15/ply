import express from 'express';
const router = express.Router();

router.get('/getPlaylist', async (req, res) => {
  const { playlistId } = req.query;
  const database = req.database;

  try {
    const playlist = await database.collection('playListData').findOne({ id: playlistId });

    if (playlist) {
      res.status(200).send(playlist);
    } else {
      res.status(404).send({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error retrieving playlist:', error);
    res.status(500).send({ message: 'Failed to retrieve playlist', error });
  }
});

export default router;