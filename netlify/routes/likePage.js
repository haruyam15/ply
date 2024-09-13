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
      .find({ id: { $in: likedPlaylistIds }, disclosureStatus: true })
      .project({ id: 1, title: 1, userId: 1, tags: 1, imgUrl: 1, disclosureStatus: 1, link: 1 })
      .toArray();

    const userIds = [...new Set(likedPlaylistsData.map((playlist) => playlist.userId))];
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

    const playlistsWithUserInfo = likedPlaylistsData.map(({ _id, link, ...playlist }) => ({
      ...playlist,
      id: playlist.id,
      nickname: userInfoMap[playlist.userId].nickname,
      profileImage: userInfoMap[playlist.userId].profileImage,
      videoCount: link?.length || 0,
    }));

    const reversedPlaylists = playlistsWithUserInfo.reverse();

    return {
      success: true,
      likePageInfo: {
        profileImage: user.profileImage,
        likedPlaylists: reversedPlaylists,
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
