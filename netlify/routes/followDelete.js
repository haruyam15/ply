import express from 'express';
const router = express.Router();

const deleteFollow = async (followerUserId, targetUserId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId: followerUserId });
    const targetUser = await database.collection('users').findOne({ userId: targetUserId });

    if (!user || !targetUser) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }
    // following 목록에서 대상 유저 제거
    await database
      .collection('users')
      .updateOne({ userId: followerUserId }, { $pull: { following: targetUserId } });

    // 대상 유저의 follower 목록에서 조회할 유저 제거
    await database
      .collection('users')
      .updateOne({ userId: targetUserId }, { $pull: { followers: followerUserId } });

    return { success: true };
  } catch (error) {
    console.error('팔로우 취소 중 오류 발생:', error);
    throw error;
  }
};

router.delete('/:followerUserId/:targetUserId', async (req, res, next) => {
  const { followerUserId, targetUserId } = req.params;
  const database = req.database;

  try {
    const result = await deleteFollow(followerUserId, targetUserId, database);
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

// curl -X DELETE http://localhost:8080/api/followDelete/조회할유저ID/대상유저ID
// 예: curl -X DELETE http://localhost:8080/api/followDelete/lovelace/sumin
