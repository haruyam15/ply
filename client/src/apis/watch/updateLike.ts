import axios, { AxiosResponse } from 'axios';

const updateLike = async (
  addOrDel: 'likeAdd' | 'likeDelete',
  userId: string,
  playlistId: string,
): Promise<{ message: string } | null> => {
  try {
    let response: AxiosResponse<{ message: string }>;

    if (addOrDel === 'likeAdd') {
      response = await axios.post(`http://localhost:8080/api/${addOrDel}/${userId}/${playlistId}`);
    } else {
      response = await axios.delete(
        `http://localhost:8080/api/${addOrDel}/${userId}/${playlistId}`,
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default updateLike;
