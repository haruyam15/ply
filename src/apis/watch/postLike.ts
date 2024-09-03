import axios, { AxiosResponse } from 'axios';

type UpdateLikeType = 'likeAdd' | 'likeDelete';

const LIKEADD = 'likeAdd';
const LIKEDELETE = 'likeDelete';

export const updateLike = async (
  addOrDel: UpdateLikeType,
  userId: string,
  playlistId: string,
): Promise<{ message: string } | null> => {
  try {
    let response: AxiosResponse<{ message: string }>;

    if (addOrDel === LIKEADD) {
      response = await axios.post(`http://localhost:8080/api/${LIKEADD}/${userId}/${playlistId}`);
    } else {
      response = await axios.delete(
        `http://localhost:8080/api/${LIKEDELETE}/${userId}/${playlistId}`,
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
