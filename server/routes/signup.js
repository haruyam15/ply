import express from 'express';
const router = express.Router();

router.post('/signup/validate', async (req, res) => {
  const { userid, nickname } = req.body;
  const database = req.database;
  try {
    const foundUser = await database.collection('users').findOne({
      $or: [{ 'information.userid': userid }, { 'information.nickname': nickname }],
    });

    if (foundUser) {
      if (foundUser.information.userid === userid) {
        return res.status(400).send({ field: 'userid', message: 'ID is already taken' });
      }
      if (foundUser.information.nickname === nickname) {
        return res.status(400).send({ field: 'nickname', message: 'Nickname is already taken' });
      }
    }
    res.status(200).send({ message: 'Validation successful' });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
