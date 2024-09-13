import express from 'express';
const router = express.Router();

const updateProfile = async (userId, newProfileData, database) => {
  try {
    const user = await database.collection('users').findOne({ userId: userId });

    if (!user) {
      return { success: false, message: '사용자 정보를 찾을 수 없습니다.' };
    }

    const updatedData = {};
    if (newProfileData.profileImage && newProfileData.profileImage !== user.profileImage) {
      updatedData.profileImage = newProfileData.profileImage;
    }
    if (newProfileData.userName && newProfileData.userName !== user.nickname) {
      updatedData.nickname = newProfileData.userName;
    }
    if (newProfileData.password && newProfileData.password !== user.password) {
      updatedData.password = newProfileData.password;
    }

    if (Object.keys(updatedData).length === 0) {
      return { success: false, message: '변경된 항목이 없습니다.' };
    }

    await database.collection('users').updateOne({ userId: userId }, { $set: updatedData });

    return { success: true };
  } catch (error) {
    console.error('프로필 수정 중 오류 발생:', error);
    throw error;
  }
};

router.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const newProfileData = req.body;
  const database = req.database;

  try {
    const result = await updateProfile(userId, newProfileData, database);
    if (result.success) {
      res.status(200).json({ success: true });
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

// curl -X PUT -H "Content-Type: application/json" -d '{"profileImage":"newimage.jpg", "userName":"동영김", "password":"1234"}' http://localhost:8080/api/profileEdit/lovelace
