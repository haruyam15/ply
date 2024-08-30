import express from 'express';

const router = express.Router();

const handleSignup = async (userid, password, nickname, database) => {
  try {
    const existingUser = await database.collection('users').findOne({
      $or: [{ id: userid }, { 'information.nickname': nickname }],
    });

    if (existingUser) {
      if (existingUser.id === userid) {
        return { success: false, message: '이미 사용 중인 ID입니다.' };
      }
      if (existingUser.information.nickname === nickname) {
        return { success: false, message: '이미 사용 중인 닉네임입니다.' };
      }
    }

    const newUser = {
      id: userid,
      information: {
        userid,
        password,
        nickname,
        profileimage: '',
      },
      like: [],
      following: [],
      followers: [],
      myPlaylist: [],
    };

    await database.collection('users').insertOne(newUser);
    return { success: true, message: '회원가입 성공' };
  } catch (error) {
    console.error('회원가입 처리 중 오류 발생:', error);
    throw error;
  }
};

router.post('/', async (req, res, next) => {
  const { userid, password, nickname } = req.body;
  const database = req.database;

  if (!userid || !password || !nickname) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    const result = await handleSignup(userid, password, nickname, database);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
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

// 회원가입 테스트 명령어 예시
// curl -X POST -H "Content-Type: application/json" -d '{"userid":"newuser","password":"newpassword","nickname":"newnickname"}' http://localhost:8080/api/signup
