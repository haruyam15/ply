import express from 'express';
const router = express.Router();

// 특정 사용자가 좋아요한 모든 플레이리스트 데이터 조회 API
router.get('/user/likedPlaylists', async (req, res) => {
  const { userid } = req.query;
  const database = req.database;

  try {
    // MongoDB에서 사용자 정보 조회
    const user = await database.collection('users').findOne({ 'information.userid': userid });

    if (user) {
      const { like } = user;
      // 좋아요한 플레이리스트 데이터 조회
      const likedPlaylists = await database.collection('playListData').find({ id: { $in: like } }).toArray();

      res.status(200).send(likedPlaylists);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving liked playlists:', error);
    res.status(500).send({ message: 'Failed to retrieve liked playlists', error });
  }
});

export default router;

// curl -X GET "http://localhost:8080/api/user/likedPlaylists?userid=lovelace" ( 특정 사용자가 좋아요한 모든 플레이리스트 데이터 가져오기 )