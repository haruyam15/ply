import axios from 'axios';

import { UserData } from '@/types/User';

export const getUserData = async (userId: string): Promise<UserData> => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};
