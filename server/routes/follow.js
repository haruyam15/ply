import express from 'express';
const router = express.Router();

const addFollow = async (followerUserId, targetUserId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId: followerUserId });
    const targetUser = await database.collection('users').findOne({ userId: targetUserId });

    if (!user || !targetUser) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    await database
      .collection('users')
      .updateOne({ userId: followerUserId }, { $addToSet: { following: targetUserId } });

    await database
      .collection('users')
      .updateOne({ userId: targetUserId }, { $addToSet: { followers: followerUserId } });

    return { success: true };
  } catch (error) {
    console.error('팔로우 추가 중 오류 발생:', error);
    throw error;
  }
};

router.post('/:followerUserId/:targetUserId', async (req, res, next) => {
  const { followerUserId, targetUserId } = req.params;
  const database = req.database;

  try {
    const result = await addFollow(followerUserId, targetUserId, database);
    if (result.success) {
      res.status(200).json({ success: true });
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

// curl -X POST http://localhost:8080/api/follow/조회할유저ID/대상유저ID
// 예: curl -X POST http://localhost:8080/api/follow/lovelace/sumin
