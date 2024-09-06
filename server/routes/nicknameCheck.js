import express from 'express';
const router = express.Router();

// 닉네임 중복 검사 함수
const checkNickname = async (nickname, database) => {
  try {
    // 데이터베이스에서 해당 nickname이 있는지 확인
    const user = await database.collection('users').findOne({ nickname: nickname });

    if (user) {
      // 닉네임이 존재할 경우
      return { success: true, isDuplicate: true, message: '이미 존재하는 닉네임입니다.' };
    } else {
      // 닉네임이 존재하지 않을 경우
      return { success: true, isDuplicate: false, message: '사용 가능한 닉네임입니다.' };
    }
  } catch (error) {
    console.error('닉네임 중복 확인 중 오류 발생:', error);
    throw error;
  }
};

// 닉네임 중복 확인 요청 처리
router.get('/:nickname', async (req, res, next) => {
  const { nickname } = req.params; // 경로에서 nickname 추출
  const database = req.database; // 데이터베이스 연결

  try {
    // 닉네임 중복 검사 함수 호출
    const result = await checkNickname(nickname, database);

    // 결과 반환
    if (result.success) {
      res.status(200).json({ isDuplicate: result.isDuplicate, message: result.message });
    } else {
      res.status(404).json({ message: '닉네임을 찾을 수 없습니다.' });
    }
  } catch (error) {
    next(error);
  }
});

// 에러 핸들링 미들웨어
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류', error: err.message });
});

export default router;
