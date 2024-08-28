import express from 'express';
const router = express.Router();

router.post('/update-profile', async (req, res) => {
  const { userid, password, profileimage, nickname } = req.body;
  const database = req.database;

  try {
    const user = await database.collection('information').findOne({ userid });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const updatedUser = {
      ...(password && { password }),
      ...(profileimage && { profileimage }),
      ...(nickname && { nickname }),
    };

    await database.collection('information').updateOne({ userid }, { $set: updatedUser });

    await database.collection('users').updateOne(
      { 'information.userid': userid },
      { $set: { 'information.password': password, 'information.profileimage': profileimage, 'information.nickname': nickname } }
    );

    res.status(200).send({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update user profile', error });
  }
});

export default router;

// curl -X POST "http://localhost:8080/api/update-profile" -H "Content-Type: application/json" -d '{"userid":"johnnew","password":"sword123","profileimage":"mage.jpg","nickname":"JoedNew"}' ( 프로필 수정 )