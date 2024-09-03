import axios from 'axios';

type PostLikeType = 'likeAdd' | 'likeDelete';

export const postLike = async (
  addOrDel: PostLikeType,
  userId: string,
  playlistId: string,
): Promise<{ message: string } | null> => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/${addOrDel}/${userId}/${playlistId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
