import express from 'express';
const router = express.Router();

router.post('/addComment', async (req, res) => {
  const { playlistId, content, userid } = req.body;
  const database = req.database;

  try {
    const newComment = {
      commentsContent: content,
      commentsDate: new Date().toISOString().split('T')[0],
      commentsWriter: userid
    };

    await database.collection('playListData').updateOne(
      { id: playlistId },
      { $push: { comments: newComment } }
    );

    res.status(200).send({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send({ message: 'Failed to add comment', error });
  }
});

export default router;

// curl -X POST "http://localhost:8080/api/addComment" -H "Content-Type: application/json" -d '{"playlistId":"1","content":"test","userid":"lovelace"}'