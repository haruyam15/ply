import axios from 'axios';

const getIsFollowing = async (userId: string, targetUserId: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://plyserver.kro.kr/api/followCheck/${userId}/${targetUserId}`,
    );
    return response.data.followStatus;
  } catch (error) {
    console.error('팔로잉 처리에 오류가 발생했습니다.:', error);
    throw error;
  }
};

export default getIsFollowing;
