const express = require('express');
const router = express.Router();

const updatePlaylist = async (playlistDataId, updateData, database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const playlist = await playlistCollection.findOne({ id: playlistDataId });

    if (!playlist) {
      return { success: false, message: '플레이리스트를 찾을 수 없습니다.' };
    }

    await playlistCollection.updateOne({ id: playlistDataId }, { $set: updateData });

    const updatedPlaylist = await playlistCollection.findOne({ id: playlistDataId });

    return {
      success: true,
      message: '플레이리스트가 성공적으로 수정되었습니다.',
      playlist: updatedPlaylist,
    };
  } catch (error) {
    console.error('플레이리스트 수정 중 오류 발생:', error);
    throw error;
  }
};

router.put('/:playlistDataId', async (req, res, next) => {
  const { playlistDataId } = req.params;
  const updateData = req.body;
  const database = req.database;

  try {
    const result = await updatePlaylist(playlistDataId, updateData, database);
    if (result.success) {
      res.status(200).json({ message: result.message, playlist: result.playlist });
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

module.exports = router;
