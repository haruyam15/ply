import express from 'express';
const router = express.Router();

const getProfilePageInfo = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId: userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    return {
      success: true,
      profilePageInfo: {
        profileImage: user.profileImage,
        userName: user.nickname,
        followers: user.followers.length,
        myPlaylistCount: user.myPlaylists ? user.myPlaylists.length : 0,
      },
    };
  } catch (error) {
    console.error('프로필 페이지 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const database = req.database;

  try {
    const result = await getProfilePageInfo(userId, database);
    if (result.success) {
      res.status(200).json(result.profilePageInfo);
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

// curl -X GET http://localhost:8080/api/profilePage/lovelace
