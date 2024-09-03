import express from 'express';

const router = express.Router();

const getRandomPlaylists = async (database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const userCollection = database.collection('users');

    // 모든 플레이리스트 ID 가져오기
    const allPlaylists = await playlistCollection.find({}, { projection: { id: 1 } }).toArray();
    const allPlaylistIds = allPlaylists.map((playlist) => playlist.id);

    // ID 목록을 무작위로 섞기
    const shuffledIds = allPlaylistIds.sort(() => Math.random() - 0.5);

    // 섞인 ID에 해당하는 플레이리스트 데이터 가져오기
    const playlistsData = await playlistCollection
      .find(
        { id: { $in: shuffledIds } },
        {
          projection: {
            title: 1,
            userId: 1,
            tags: 1,
            imgUrl: 1,
            disclosureStatus: 1,
          },
        },
      )
      .toArray();

    // 플레이리스트 제작자의 닉네임 가져오기
    const userIds = [...new Set(playlistsData.map((playlist) => playlist.userId))];
    const userNicknames = await userCollection
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
      data: playlistsWithNickname,
    };
  } catch (error) {
    console.error('플레이리스트 데이터 처리 중 오류 발생:', error);
    throw error;
  }
};

router.get('/', async (req, res, next) => {
  const database = req.database;

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
