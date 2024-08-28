import express from 'express';
const router = express.Router();

router.post('/updateUserInfo', async (req, res) => {
  const { userid, profileimage, password, nickname } = req.body;
  const database = req.database;

  try {
    const updateFields = {};
    if (profileimage) updateFields['information.profileimage'] = profileimage;
    if (password) updateFields['information.password'] = password;
    if (nickname) updateFields['information.nickname'] = nickname;

    const result = await database.collection('users').updateOne(
      { 'information.userid': userid },
      { $set: updateFields }
    );

    if (result.matchedCount === 1) {
      res.status(200).send({ message: 'User information updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).send({ message: 'Failed to update user information', error });
  }
});

export default router;

// curl -X POST "http://localhost:8080/api/updateUserInfo" -H "Content-Type: application/json" -d '{"userid":"lovelace","password":"newpassword"}'
// curl -X POST "http://localhost:8080/api/updateUserInfo" -H "Content-Type: application/json" -d '{"userid":"lovelace","nickname":"newnickname"}'
// curl -X POST "http://localhost:8080/api/updateUserInfo" -H "Content-Type: application/json" -d '{"userid":"lovelace","profileimage":"newimage.jpg"}'
// curl -X POST "http://localhost:8080/api/updateUserInfo" -H "Content-Type: application/json" -d '{"userid":"lovelace","profileimage":"newimage.jpg","password":"newpassword","nickname":"newnickname"}'