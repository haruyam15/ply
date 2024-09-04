import axios from 'axios';
import { SignupData } from '@/components/sign/Signup';
import { IUserData } from '@/types/userTypes';

const createUser = async (api: string, userData: SignupData): Promise<number | IUserData> => {
  try {
    const res = await axios.post(`/api/${api}`, userData);
    if (api === 'login') {
      return res.data.user;
    }
    return res.status;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    } else {
      throw new Error('API요청 중 오류가 발생하였습니다.');
    }
  }
};

export default createUser;
