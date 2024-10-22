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
      const status = error.response.status;
      if (status === 401) {
        console.warn('인증 실패');
        return 401;
      }
    }
    console.error('데이터 호출 중 실패하였습니다.', error);
    return 0;
  }
};

export default createUser;
