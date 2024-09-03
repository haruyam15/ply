import axios from 'axios';

const getIsFollowing = async (userId: string, targetUserId: string): Promise<boolean | null> => {
  console.log(userId, targetUserId);
  try {
    const response = await axios.get(
      `http://localhost:8080/api/followCheck/${userId}/${targetUserId}`,
    );
    return response.data.followStatus;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getIsFollowing;
