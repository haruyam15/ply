import axios from 'axios';

const getIsLike = async (userId: string, playlistId: string): Promise<boolean> => {
  try {
    const response = await axios.get(`http://15.164.228.103/api/likeCheck/${userId}/${playlistId}`);
    return response.data.isLiked;
  } catch (error) {
    console.error('좋아요 처리에 오류가 발생했습니다.:', error);
    throw error;
  }
};

export default getIsLike;
