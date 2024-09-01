import express from 'express';

const router = express.Router();

const getFollowingPageInfo = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const followingInfo = await Promise.all(
      user.following.map(async (followingId) => {
        const followingUser = await database.collection('users').findOne({ userId: followingId });
        return {
          profileImage: followingUser.profileImage,
          userName: followingUser.nickname,
          followers: followingUser.followers.length,
          myPlaylist: followingUser.myPlaylists ? followingUser.myPlaylists.length : 0,
        };
      }),
    );

    return {
      success: true,
      followingPageInfo: followingInfo,
    };
  } catch (error) {
    console.error('팔로잉 페이지 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { database } = req;

  try {
    const result = await getFollowingPageInfo(userId, database);
    if (result.success) {
      res.status(200).json(result.followingPageInfo);
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

// curl -X GET http://localhost:8080/api/followingPage/lovelace
