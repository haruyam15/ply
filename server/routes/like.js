import express from 'express';
const router = express.Router();

// 플레이리스트 좋아요 API
router.post('/likePlaylist', async (req, res) => {
  const { userid, playlistId } = req.body;
  const database = req.database;

  try {
    // 플레이리스트 데이터에서 좋아요 배열에 사용자 ID 추가
    await database.collection('playListData').updateOne(
      { id: playlistId },
      { $addToSet: { like: userid } }
    );

    // 사용자 데이터에서 좋아요 배열에 플레이리스트 ID 추가
    await database.collection('users').updateOne(
      { 'information.userid': userid },
      { $addToSet: { like: playlistId } }
    );

    res.status(200).send({ message: 'Playlist liked successfully' });
  } catch (error) {
    console.error('Error liking playlist:', error);
    res.status(500).send({ message: 'Failed to like playlist', error });
  }
});

export default router;

// curl -X POST "http://localhost:8080/api/likePlaylist" -H "Content-Type: application/json" -d '{"userid":"lovelace","playlistId":"3"}'