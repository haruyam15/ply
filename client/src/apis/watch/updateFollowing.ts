import axios, { AxiosResponse } from 'axios';

const updateFollowing = async (
  type: 'follow' | 'followDelete',
  followerUserId: string,
  targetUserId: string,
): Promise<{ message: string } | null> => {
  try {
    let response: AxiosResponse<{ message: string }>;

    if (type === 'follow') {
      response = await axios.post(
        `http://15.164.228.103/api/${type}/${followerUserId}/${targetUserId}`,
      );
    } else {
      response = await axios.delete(
        `http://15.164.228.103/api/${type}/${followerUserId}/${targetUserId}`,
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default updateFollowing;