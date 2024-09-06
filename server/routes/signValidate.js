import express from 'express';
const router = express.Router();

router.post('/signValidate', async (req, res) => {
  const { userId, nickname, password } = req.body;
  const database = req.database;
  try {
    if (nickname !== undefined) {
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
    } else {
      const foundUser = await database.collection('users').findOne({ userId: userId });
      if (!foundUser) {
        return res.status(400).send({ field: 'userId', message: 'User ID does not exist' });
      }
      if (foundUser.password !== password) {
        return res.status(400).send({ field: 'password', message: 'Password does not match' });
      }
    }
    res.status(200).send({ message: 'Validation successful' });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
