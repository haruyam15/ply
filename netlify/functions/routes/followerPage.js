const express = require('express');

const router = express.Router();

const getFollowerPageInfo = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const followerInfo = await Promise.all(
      user.followers.map(async (followerId) => {
        const followerUser = await database.collection('users').findOne({ userId: followerId });

        if (!followerUser) {
          return null; // 사용자 정보가 없으면 null 반환
        }

        return {
          userId: followerUser.userId, // userId를 포함하여 반환
          profileImage: followerUser.profileImage || '', // profileImage가 없을 경우 빈 문자열 반환
          userName: followerUser.nickname || 'Unknown', // nickname이 없을 경우 'Unknown' 반환
          followers: followerUser.followers ? followerUser.followers.length : 0,
          myPlaylist: followerUser.myPlaylists ? followerUser.myPlaylists.length : 0,
        };
      }),
    );

    return {
      success: true,
      followerPageInfo: followerInfo.filter((info) => info !== null), // null이 아닌 정보만 반환
    };
  } catch (error) {
    console.error('팔로워 페이지 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { database } = req;

  try {
    const result = await getFollowerPageInfo(userId, database);
    if (result.success) {
      res.status(200).json(result.followerPageInfo);
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

module.exports = router;
