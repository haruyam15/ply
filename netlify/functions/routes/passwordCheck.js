import express from 'express';
const router = express.Router();

const checkPassword = async (userId, inputPassword, database) => {
  try {
    const user = await database.collection('users').findOne({ userId: userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const isPasswordValid = user.password === inputPassword;

    return {
      success: true,
      isPasswordValid: isPasswordValid,
    };
  } catch (error) {
    console.error('비밀번호 확인 중 오류 발생:', error);
    throw error;
  }
};

router.post('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { inputPassword } = req.body;
  const database = req.database;

  try {
    const result = await checkPassword(userId, inputPassword, database);
    if (result.success) {
      res.status(200).json({ isPasswordValid: result.isPasswordValid });
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

// curl -X POST -H "Content-Type: application/json" -d '{"inputPassword":"123"}' http://localhost:8080/api/passwordCheck/lovelace
// 예: curl -X POST -H "Content-Type: application/json" -d '{"inputPassword":"13"}' http://localhost:8080/api/passwordCheck/lovelace
