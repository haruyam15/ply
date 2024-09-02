import axios from 'axios';
import { IUserInformation } from '@/types/userTypes';

type getUserData = Pick<IUserInformation, 'profileImage' | 'nickname'>;
export const getUserData = async (userId: string): Promise<getUserData | null> => {
  try {
    const response = await axios.get(`/api/user/profile?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('유저 정보를 불러오는데 실패했습니다 :', error);
    return null;
  }
};
