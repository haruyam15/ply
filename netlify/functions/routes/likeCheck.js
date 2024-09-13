import express from 'express';

const router = express.Router();

const checkLike = async (userId, playlistDataId, database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const userCollection = database.collection('users');

    // 플레이리스트의 좋아요 목록 확인
    const playlist = await playlistCollection.findOne({ id: playlistDataId });
    const isLikedInPlaylist = playlist && playlist.like && playlist.like.includes(userId);

    // 사용자의 좋아요 목록 확인
    const user = await userCollection.findOne({ userId: userId });
    const isLikedByUser = user && user.likes && user.likes.includes(playlistDataId);

    // 두 조건 모두 만족하는지 확인
    const isLiked = isLikedInPlaylist && isLikedByUser;

    return { success: true, isLiked };
  } catch (error) {
    console.error('좋아요 확인 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId/:playlistDataId', async (req, res, next) => {
  const { userId, playlistDataId } = req.params;
  const { database } = req;

  try {
    const result = await checkLike(userId, playlistDataId, database);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류', error: err.message });
});

export default router;

// 테스트 명령어:
// curl http://localhost:8080/api/likeCheck/lovelace/1
