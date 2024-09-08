import axios from 'axios';

interface IUseFdata {
  userId: string;
  profileImage: string;
  userName: string;
  follower: number;
  myPlaylist: number;
}

export const getFdata = async (
  userId: string,
  optionalKey: 'following' | 'followers',
): Promise<IUseFdata[]> => {
  try {
    const apiType = optionalKey === 'following' ? 'followingPage' : 'followerPage';
    const response = await axios.get(`http://localhost:8080/api/${apiType}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('플레이리스트 데이터 호출을 실패했습니다.:', error);
    throw error;
  }
};
