const express = require('express');
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

    const allPlaylistIds = [
      ...new Set([
        ...followingUsers.flatMap((followingUser) => followingUser.myPlaylists || []),
        ...(user.likes || []),
      ]),
    ].sort(() => Math.random() - 0.5);

    const playlistsData = await database
      .collection('playListData')
      .find({ id: { $in: allPlaylistIds }, disclosureStatus: true })
      .project({
        id: 1,
        title: 1,
        userId: 1,
        tags: 1,
        imgUrl: 1,
        disclosureStatus: 1,
        link: 1,
      })
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
      nickname: userInfoMap[playlist.userId].nickname,
      profileImage: userInfoMap[playlist.userId].profileImage,
      videoCount: link?.length || 0,
    }));

    return {
      success: true,
      data: {
        profileImage: user.profileImage,
        following: user.following,
        playlists: playlistsWithUserInfo,
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

module.exports = router;
