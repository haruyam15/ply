import express from 'express';

const router = express.Router();

const getTimelineData = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId });
    if (!user) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    const followingUsers = await database
      .collection('users')
      .find({ userId: { $in: user.following } })
      .toArray();

    let allPlaylistIds = [];
    followingUsers.forEach((followingUser) => {
      allPlaylistIds = allPlaylistIds.concat(followingUser.myPlaylists || []);
    });

    allPlaylistIds = allPlaylistIds.concat(user.likes || []);

    allPlaylistIds = [...new Set(allPlaylistIds)].sort(() => Math.random() - 0.5);

    const playlistsData = await database
      .collection('playListData')
      .find({ id: { $in: allPlaylistIds } })
      .project({ title: 1, userId: 1, tags: 1, imgUrl: 1, disclosureStatus: 1 })
      .toArray();

    // 플레이리스트 제작자의 닉네임 가져오기
    const userIds = [...new Set(playlistsData.map((playlist) => playlist.userId))];
    const userNicknames = await database
      .collection('users')
      .find({ userId: { $in: userIds } })
      .project({ userId: 1, nickname: 1 })
      .toArray();

    const nicknameMap = Object.fromEntries(
      userNicknames.map((user) => [user.userId, user.nickname]),
    );

    const playlistsWithNickname = playlistsData.map((playlist) => ({
      ...playlist,
      nickname: nicknameMap[playlist.userId],
    }));

    return {
      success: true,
      data: {
        profileImage: user.profileImage,
        following: user.following,
        playlists: playlistsWithNickname,
      },
    };
  } catch (error) {
    console.error('타임라인 데이터 처리 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { database } = req;

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
// curl -X GET http://localhost:8080/api/timeline/lovelace
