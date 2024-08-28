import express from 'express';
const router = express.Router();

router.post('/followers', async (req, res) => {
  const { userid } = req.body;
  const database = req.database;
  try {
    const user = await database.collection('users').findOne({ 'information.userid': userid });
    if (user) {
      res.status(200).send({ followers: user.followers });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

//curl -X GET "http://localhost:8080/api/followers?userid=johndoe" ( 해당 유저의 팔로워 목록 )