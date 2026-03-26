import { useRefreshTokenUseCase } from '@entities/cases/auth/refresh-token';

const useRefreshTokenPresenter = () => {
  const { mutateAsync, isPending } = useRefreshTokenUseCase();

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    return mutateAsync(refreshToken);
  };

  return {
    refreshToken,
    isLoading: isPending
  };
};

export default useRefreshTokenPresenter;
