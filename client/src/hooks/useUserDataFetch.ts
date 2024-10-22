import { useMutation } from '@tanstack/react-query';
import createUser from '@/apis/creatUser';
import { SignupData } from '@/components/sign/Signup';
import { IUserData } from '@/types/userTypes';

const useUserDataFetch = () => {
  return useMutation<number | IUserData, Error, { api: string; userData: SignupData }>({
    mutationFn: ({ api, userData }) => createUser(api, userData),
  });
};

export default useUserDataFetch;
