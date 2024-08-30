import express from 'express';

const router = express.Router();

const getTimelineData = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ id: userId });
    if (!user) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    const followingUsers = await database
      .collection('users')
      .find({ id: { $in: user.following } })
      .toArray();

    let allPlaylistIds = [];
    followingUsers.forEach((followingUser) => {
      allPlaylistIds = allPlaylistIds.concat(followingUser.myPlaylist);
    });

    // 사용자가 좋아하는 플레이리스트 ID도 추가
    allPlaylistIds = allPlaylistIds.concat(user.like);

    // 중복 제거 및 무작위 정렬
    allPlaylistIds = [...new Set(allPlaylistIds)].sort(() => Math.random() - 0.5);

    const playlistsData = await database
      .collection('playListData')
      .find({ id: { $in: allPlaylistIds } })
      .project({ title: 1, userId: 1, tags: 1, imgUrl: 1, disclosureStatus: 1, _id: 0 })
      .toArray();

    return {
      success: true,
      data: {
        playlists: playlistsData,
      },
    };
  } catch (error) {
    console.error('타임라인 데이터 처리 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const database = req.database;

  try {
    const result = await getTimelineData(userId, database);
    if (result.success) {
      res.status(200).json(result.data);
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

// 타임라인 API 테스트 명령어 예시:
// curl -X GET http://localhost:8080/api/timeline/사용자ID
// 예: curl -X GET http://localhost:8080/api/timeline/lovelace
