import express from 'express';
const router = express.Router();

router.get('/following', async (req, res) => {
  const { userid } = req.query;
  const database = req.database;
  try {
    const user = await database.collection('users').findOne({ 'information.userid': userid });
    if (user) {
      res.status(200).send({ following: user.following });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

// curl -X GET "http://localhost:8080/api/following?userid=johndoe" ( 해당 유저가 팔로잉하는 유저들 )