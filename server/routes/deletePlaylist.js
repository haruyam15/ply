import express from 'express';
const router = express.Router();

// 플레이리스트 삭제 API
router.delete('/deletePlaylist', async (req, res) => {
  const { playlistId } = req.body;
  const database = req.database;

  try {
    // MongoDB에서 플레이리스트 데이터 삭제
    const result = await database.collection('playListData').deleteOne({ id: playlistId });

    if (result.deletedCount === 1) {
      res.status(200).send({ message: 'Playlist deleted successfully' });
    } else {
      res.status(404).send({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).send({ message: 'Failed to delete playlist', error });
  }
});

export default router;

// curl -X DELETE "http://localhost:8080/api/deletePlaylist" -H "Content-Type: application/json" -d '{"playlistId":"1"}'
//