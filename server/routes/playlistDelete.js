import express from 'express';

const router = express.Router();

const deletePlaylist = async (playlistDataId, database) => {
  try {
    const playlistCollection = database.collection('playListData');
    const userCollection = database.collection('users');
    const playlist = await playlistCollection.findOne({ id: playlistDataId });

    if (!playlist) {
      return { success: false, message: '플레이리스트를 찾을 수 없습니다.' };
    }

    const userId = playlist.userId;

    await playlistCollection.deleteOne({ id: playlistDataId });

    await userCollection.updateOne({ userId: userId }, { $pull: { myPlaylists: playlistDataId } });

    return {
      success: true,
      message: '플레이리스트가 성공적으로 삭제되었습니다.',
    };
  } catch (error) {
    console.error('플레이리스트 삭제 중 오류 발생:', error);
    throw error;
  }
};

router.delete('/:playlistDataId', async (req, res, next) => {
  const { playlistDataId } = req.params;
  const database = req.database;

  try {
    const result = await deletePlaylist(playlistDataId, database);
    if (result.success) {
      res.status(200).json({ message: result.message });
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
