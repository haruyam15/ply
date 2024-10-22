import { useState, useEffect } from 'react';

interface UserInformation {
  profileImage: string;
  userName: string;
  userId: string;
}

const useFetchUserInformation = (userId: string | null | undefined) => {
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInformation = async () => {
    if (!userId) {
      setError('유저 ID가 없습니다.');
      return;
    }

    try {
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
      }
      const data = await response.json();
      setUserInformation(data);
    } catch (e) {
      console.error('사용자 정보 요청 오류:', e);
      setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, [userId]);

  return { userInformation, error };
};

export default useFetchUserInformation;
