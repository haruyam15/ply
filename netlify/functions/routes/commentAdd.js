import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

const addComment = async (playlistDataId, commentData, database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const playlist = await playlistCollection.findOne({ id: playlistDataId });

    if (!playlist) {
      return { success: false, message: '플레이리스트를 찾을 수 없습니다.' };
    }

    const newComment = {
      _id: new ObjectId(),
      ...commentData,
    };

    await playlistCollection.updateOne({ id: playlistDataId }, { $push: { comments: newComment } });

    return {
      success: true,
      message: '댓글이 성공적으로 추가되었습니다.',
      comment: newComment,
    };
  } catch (error) {
    console.error('댓글 추가 중 오류 발생:', error);
    throw error;
  }
};

router.post('/:playlistDataId', async (req, res, next) => {
  const { playlistDataId } = req.params;
  const { commentsContent, commentsDate, commentsWriter } = req.body;
  const database = req.database;

  try {
    const commentData = {
      commentsContent,
      commentsDate,
      commentsWriter,
    };

    const result = await addComment(playlistDataId, commentData, database);
    if (result.success) {
      res.status(201).json({ message: result.message, comment: result.comment });
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
// curl -X POST -H "Content-Type: application/json" -d '{"commentsContent": "새로운 댓글입니다.", "commentsDate": "2023-05-20", "commentsWriter": "lovelace"}' http://localhost:8080/api/commentAdd/1
