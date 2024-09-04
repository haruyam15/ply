import express from 'express';

const router = express.Router();

const getPlaylistDetails = async (playlistDataId, database) => {
  try {
    const playlist = await database.collection('playListData').findOne({ id: playlistDataId });

    if (!playlist) {
      return { success: false, message: '플레이리스트를 찾을 수 없습니다.' };
    }

    const user = await database.collection('users').findOne({ userId: playlist.userId });

    const commentsWithUserInfo = await Promise.all(
      (playlist.comments || []).map(async (comment) => {
        const commentUser = await database
          .collection('users')
          .findOne({ userId: comment.commentsWriter });
        return {
          _id: comment._id,
          commentsContent: comment.commentsContent,
          commentsDate: comment.commentsDate,
          commentsWriter: comment.commentsWriter,
          profileImage: commentUser ? commentUser.profileImage : null,
          userName: commentUser ? commentUser.nickname : null,
        };
      }),
    );

    return {
      success: true,
      playlistDetails: {
        title: playlist.title,
        content: playlist.content,
        link: playlist.link,
        like: playlist.like ? playlist.like.length : 0,
        comments: commentsWithUserInfo,
        userId: playlist.userId,
        date: playlist.date,
        tags: playlist.tags,
        imgUrl: playlist.imgUrl,
        profileImage: user ? user.profileImage : null,
        userName: user ? user.nickname : null,
      },
    };
  } catch (error) {
    console.error('플레이리스트 상세 조회 중 오류 발생:', error);
    throw error;
  }
};

router.get('/:playlistDataId', async (req, res, next) => {
  const { playlistDataId } = req.params;
  const database = req.database;

  try {
    const result = await getPlaylistDetails(playlistDataId, database);
    if (result.success) {
      res.status(200).json(result.playlistDetails);
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

// 테스트 코드
// 예시: curl -X GET http://localhost:8080/api/watch/1
// 이 요청은 ID가 1인 플레이리스트의 상세 정보를 가져옵니다.
