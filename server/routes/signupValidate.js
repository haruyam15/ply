import express from 'express';
const router = express.Router();

router.post('/validate', async (req, res) => {
  const { userId, nickname } = req.body;
  const database = req.database;
  try {
    const foundUser = await database.collection('users').findOne({
      $or: [{ userId: userId }, { nickname: nickname }],
    });

    if (foundUser) {
      if (foundUser.userId === userId) {
        return res.status(400).send({ field: 'userId', message: 'ID is already taken' });
      }
      if (foundUser.nickname === nickname) {
        return res.status(400).send({ field: 'nickname', message: 'Nickname is already taken' });
      }
    }
    res.status(200).send({ message: 'Validation successful' });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
