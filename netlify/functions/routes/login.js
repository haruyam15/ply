import express from 'express';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const database = req.database;
  try {
    const user = await database.collection('users').findOne({ userId: userId, password: password });
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
