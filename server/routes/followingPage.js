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

        if (!followingUser) {
          return null; // 사용자 정보가 없으면 null 반환
        }

        return {
          profileImage: followingUser.profileImage || '', // profileImage가 없을 경우 빈 문자열 반환
          userName: followingUser.nickname || 'Unknown', // nickname이 없을 경우 'Unknown' 반환
          followers: followingUser.followers ? followingUser.followers.length : 0,
          myPlaylist: followingUser.myPlaylists ? followingUser.myPlaylists.length : 0,
        };
      }),
    );

    return {
      success: true,
      followingPageInfo: followingInfo.filter((info) => info !== null), // null이 아닌 정보만 반환
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
