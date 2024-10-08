import express from 'express';

const router = express.Router();

const getRandomPlaylists = async (database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const userCollection = database.collection('users');

    // disclosureStatus가 true인 플레이리스트만 가져오기
    const publicPlaylists = await playlistCollection
      .find({ disclosureStatus: true }, { projection: { id: 1 } })
      .toArray();
    const publicPlaylistIds = publicPlaylists.map((playlist) => playlist.id);

    // ID 목록을 무작위로 섞기
    const shuffledIds = publicPlaylistIds.sort(() => Math.random() - 0.5);

    // 섞인 ID에 해당하는 플레이리스트 데이터 가져오기
    const playlistsData = await playlistCollection
      .find(
        { id: { $in: shuffledIds }, disclosureStatus: true },
        {
          projection: {
            id: 1,
            title: 1,
            userId: 1,
            tags: 1,
            imgUrl: 1,
            disclosureStatus: 1,
            link: 1,
          },
        },
      )
      .toArray();

    // 플레이리스트 제작자의 닉네임과 프로필 이미지 가져오기
    const userIds = [...new Set(playlistsData.map((playlist) => playlist.userId))];
    const userInfo = await userCollection
      .find({ userId: { $in: userIds } })
      .project({ userId: 1, nickname: 1, profileImage: 1 })
      .toArray();

    const userInfoMap = Object.fromEntries(
      userInfo.map((user) => [
        user.userId,
        { nickname: user.nickname, profileImage: user.profileImage },
      ]),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const playlistsWithUserInfo = playlistsData.map(({ _id, link, ...playlist }) => ({
      ...playlist,
      nickname: userInfoMap[playlist.userId].nickname,
      profileImage: userInfoMap[playlist.userId].profileImage,
      videoCount: link?.length || 0,
    }));

    // 최종 결과를 다시 한 번 섞기
    const shuffledPlaylists = playlistsWithUserInfo.sort(() => Math.random() - 0.5);

    return {
      success: true,
      data: shuffledPlaylists,
    };
  } catch (error) {
    console.error('플레이리스트 데이터 처리 중 오류 발생:', error);
    throw error;
  }
};

router.get('/', async (req, res, next) => {
  const { database } = req;

  try {
    const result = await getRandomPlaylists(database);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json({ message: '데이터를 가져오는 데 실패했습니다.' });
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
// curl -X GET http://localhost:8080/api/search
