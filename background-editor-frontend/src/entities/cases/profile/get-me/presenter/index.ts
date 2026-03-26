import { useGetMeUseCase } from '@entities/cases/profile/get-me';

const useGetMePresenter = () => {
  const { data, isLoading } = useGetMeUseCase();

  return {
    isLoading,
    data
  };
};

export default useGetMePresenter;
