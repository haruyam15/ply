import axios from 'axios';
import express from 'express';
const router = express.Router();

router.get('/videos', async (req, res) => {
  try {
    const { id, part } = req.query;
    const APIKEY = process.env.YOUTUBE_API_KEY;

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        id,
        part,
        key: APIKEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching video data from YouTube:', error);
    res.status(500).send(error.message);
  }
});

export default router;
