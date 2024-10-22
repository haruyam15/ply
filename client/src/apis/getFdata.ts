import { TabForApi } from '@/types/navTypes';
import axios from 'axios';

interface IUseFdata {
  userId: string;
  profileImage: string;
  userName: string;
  follower: number;
  myPlaylist: number;
}

export const getFdata = async (userId: string, optionalKey: TabForApi): Promise<IUseFdata[]> => {
  try {
    const response = await axios.get(`https://plyserver.kro.kr/api/${optionalKey}Page/${userId}`);
    return response.data;
  } catch (error) {
    console.error('플레이리스트 데이터 호출을 실패했습니다.:', error);
    throw error;
  }
};
