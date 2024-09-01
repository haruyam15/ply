import express from 'express';

const router = express.Router();

const getLikePageInfo = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const likedPlaylistIds = user.likes || [];
    const likedPlaylistsData = await database
      .collection('playListData')
      .find({ id: { $in: likedPlaylistIds } })
      .project({ title: 1, userId: 1, tags: 1, imgUrl: 1, disclosureStatus: 1, _id: 0 })
      .toArray();

    return {
      success: true,
      likePageInfo: {
        profileImage: user.profileImage,
        likedPlaylists: likedPlaylistsData,
      },
    };
  } catch (error) {
    console.error('좋아요 페이지 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { database } = req;

  try {
    const result = await getLikePageInfo(userId, database);
    if (result.success) {
      res.status(200).json(result.likePageInfo);
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
// curl -X GET http://localhost:8080/api/likePage/lovelace
