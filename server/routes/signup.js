import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { userId, password, nickname } = req.body;
  const database = req.database;
  if (!userId || !password || !nickname) {
    return res.status(400).send({ message: 'All fields are required' });
  }
  try {
    const newUser = {
      userId,
      password,
      profileImage: '/assets/images/user-default.png',
      nickname,
      likes: [],
      following: [],
      followers: [],
      myPlaylists: [],
    };
    const result = await database.collection('users').insertOne(newUser);
    res.status(201).send({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
