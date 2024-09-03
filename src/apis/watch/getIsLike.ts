import axios from 'axios';

const getIsLike = async (userId: string, playlistId: string): Promise<boolean | null> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/likeCheck/${userId}/${playlistId}`);
    return response.data.isLiked;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getIsLike;
