import { useGetHistoryCase } from '@entities/cases/profile/get-history';

const useGetHistoryPresenter = () => {
  const { data, isLoading } = useGetHistoryCase();

  return {
    isLoading,
    data: data ?? []
  };
};

export default useGetHistoryPresenter;
