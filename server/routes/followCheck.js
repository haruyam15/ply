import express from 'express';
const router = express.Router();

const checkFollowStatus = async (userId, targetUserId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId: userId });
    const targetUser = await database.collection('users').findOne({ userId: targetUserId });

    if (!user || !targetUser) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const isFollowing = user.following.includes(targetUserId);
    const isFollower = targetUser.followers.includes(userId);

    return {
      success: true,
      isFollowing: isFollowing,
      isFollower: isFollower,
    };
  } catch (error) {
    console.error('팔로우 상태 확인 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId/:targetUserId', async (req, res, next) => {
  const { userId, targetUserId } = req.params;
  const database = req.database;

  try {
    const result = await checkFollowStatus(userId, targetUserId, database);
    if (result.success) {
      const followStatus = result.isFollowing && result.isFollower;
      res.status(200).json({ followStatus: followStatus });
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

// curl -X GET http://localhost:8080/api/followCheck/lovelace/sumin
