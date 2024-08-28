import express from 'express';
const router = express.Router();

router.get('/user/myPlaylistData', async (req, res) => {
  const { userid } = req.query;
  const database = req.database;

  try {
    const user = await database.collection('users').findOne({ 'information.userid': userid });

    if (user) {
      const { myPlaylist } = user;
      const playlists = await database.collection('playListData').find({ id: { $in: myPlaylist } }).toArray();

      res.status(200).send(playlists);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve user playlist data', error });
  }
});

export default router;

// curl -X GET "http://localhost:8080/api/user/myPlaylistData?userid=lovelace" ( 특정 사용자가 만든 모든 플레이리스트 데이터 가져오기 )