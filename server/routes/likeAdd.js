import express from 'express';

const router = express.Router();

const addLike = async (userId, playlistDataId, database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const userCollection = database.collection('users');

    // 플레이리스트에 좋아요 추가
    const result = await playlistCollection.updateOne(
      { id: playlistDataId },
      { $addToSet: { like: userId } },
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        message: '플레이리스트를 찾을 수 없거나 이미 좋아요가 추가되었습니다.',
      };
    }

    // 사용자의 likes 배열에 플레이리스트 ID 추가
    await userCollection.updateOne({ userId: userId }, { $addToSet: { likes: playlistDataId } });

    return { success: true, message: '좋아요가 성공적으로 추가되었습니다.' };
  } catch (error) {
    console.error('좋아요 추가 중 오류 발생:', error);
    throw error;
  }
};

router.post('/:userId/:playlistDataId', async (req, res, next) => {
  const { userId, playlistDataId } = req.params;
  const { database } = req;

  try {
    const result = await addLike(userId, playlistDataId, database);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.message });
    }
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
// curl -X POST http://localhost:8080/api/likeAdd/lovelace/3
