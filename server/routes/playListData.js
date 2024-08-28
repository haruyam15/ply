import express from 'express';
const router = express.Router();

// 특정 플레이리스트 아이디로 플레이리스트 데이터 조회 API
router.get('/getPlaylist', async (req, res) => {
  const { playlistId } = req.query;
  const database = req.database;

  try {
    // MongoDB에서 플레이리스트 데이터 조회
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