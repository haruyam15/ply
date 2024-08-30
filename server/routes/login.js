import express from 'express';

const router = express.Router();

const handleLogin = async (userid, password, database) => {
  try {
    const user = await database
      .collection('users')
      .findOne({ 'information.userid': userid, 'information.password': password });
    if (user) {
      return { success: true, user };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    throw error;
  }
};

router.post('/', async (req, res, next) => {
  const { userid, password } = req.body;
  const database = req.database;
  try {
    const result = await handleLogin(userid, password, database);
    if (result.success) {
      res.status(200).json({ message: '로그인 성공', user: result.user });
    } else {
      res.status(401).json({ message: '잘못된 아이디 또는 비밀번호' });
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

// 로그인 테스트 명령어 예시:
// curl -X POST -H "Content-Type: application/json" -d '{"userid":"lovelace","password":"123"}' http://localhost:8080/api/login
