import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  const { term } = req.query;
  const database = req.database;

  try {
    // 사용자 검색
    const users = await database
      .collection('users')
      .find({
        $or: [
          { nickname: { $regex: term, $options: 'i' } },
          { userId: { $regex: term, $options: 'i' } },
        ],
      })
      .project({ userId: 1, nickname: 1, profileImage: 1 })
      .limit(10)
      .toArray();

    // 공개 플레이리스트 검색
    const playlists = await database
      .collection('playListData')
      .find({
        disclosureStatus: true, // 공개된 플레이리스트만 검색
        $or: [
          { title: { $regex: term, $options: 'i' } },
          { content: { $regex: term, $options: 'i' } },
          { tags: { $regex: term, $options: 'i' } },
        ],
      })
      .limit(20)
      .toArray();

    const userResults = users.map((user) => ({
      type: 'user',
      userId: user.userId,
      userName: user.nickname,
      profileImage: user.profileImage,
    }));

    const playlistResults = await Promise.all(
      playlists.map(async (playlist) => {
        const user = await database.collection('users').findOne({ userId: playlist.userId });
        return {
          ...playlist,
          userName: user ? user.nickname : 'Unknown User',
          profileImage: user ? user.profileImage : 'default_profile_image.jpg',
        };
      }),
    );

    const results = [...userResults, ...playlistResults];

    res.json(results);
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

export default router;
