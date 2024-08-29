import express from 'express';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { userid, password } = req.body;
  const database = req.database;
  try {
    const user = await database
      .collection('users')
      .findOne({ 'information.userid': userid, 'information.password': password });
    if (user) {
      res.status(200).send({ message: 'Login successful', user });
    } else {
      res.status(401).send({ message: 'Invalid userid or password' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

// 로그인 성공 curl -X GET "http://localhost:8080/api/login?userid=johndoe&password=john1234"
// 로그인 실패 curl -X GET "http://localhost:8080/api/login?userid=invaliduser&password=invalidpass"
