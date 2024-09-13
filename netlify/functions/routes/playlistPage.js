import express from 'express';

const router = express.Router();

const getPlaylistPageInfo = async (userId, database) => {
  try {
    const user = await database.collection('users').findOne({ userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const playlistIds = user.myPlaylists || [];
    const playlistsData = await database
      .collection('playListData')
      .find({ id: { $in: playlistIds } })
      .project({ id: 1, title: 1, userId: 1, tags: 1, imgUrl: 1, disclosureStatus: 1, link: 1 })
      .toArray();

    const userIds = [...new Set(playlistsData.map((playlist) => playlist.userId))];
    const userInfo = await database
      .collection('users')
      .find({ userId: { $in: userIds } })
      .project({ userId: 1, nickname: 1, profileImage: 1 })
      .toArray();

    const userInfoMap = Object.fromEntries(
      userInfo.map((user) => [
        user.userId,
        { nickname: user.nickname, profileImage: user.profileImage },
      ]),
    );

    const playlistsWithUserInfo = playlistsData.map(({ _id, link, ...playlist }) => ({
      ...playlist,
      id: playlist.id,
      nickname: userInfoMap[playlist.userId].nickname,
      profileImage: userInfoMap[playlist.userId].profileImage,
      videoCount: link ? link.length : 0,
    }));

    const reversedPlaylists = playlistsWithUserInfo.reverse();

    return {
      success: true,
      playlistPageInfo: {
        profileImage: user.profileImage,
        playlists: reversedPlaylists,
      },
    };
  } catch (error) {
    console.error('플레이리스트 페이지 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { database } = req;

  try {
    const result = await getPlaylistPageInfo(userId, database);
    if (result.success) {
      res.status(200).json(result.playlistPageInfo);
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
// curl -X GET http://localhost:8080/api/playlistPage/lovelace
