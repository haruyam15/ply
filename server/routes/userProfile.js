import express from 'express';
const router = express.Router();

router.get('/user/profile', async (req, res) => {
  const { userid } = req.query;
  const database = req.database;

  try {
    const user = await database.collection('users').findOne({ 'information.userid': userid });

    if (user) {
      const { profileimage, nickname } = user.information;
      res.status(200).send({ profileimage, nickname });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve user profile', error });
  }
});

export default router;

// curl -X GET "http://localhost:8080/api/user/profile?userid=lovelace" ( 사용자 프로필 정보 가져오기 )
// 유저 userid로 프로필사진, 닉네임 가져옵니다
