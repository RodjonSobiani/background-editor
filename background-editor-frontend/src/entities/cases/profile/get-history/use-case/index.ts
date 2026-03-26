import { useQuery } from '@tanstack/react-query';
import { EQueryValues } from '@shared/utils/enums';
import { UserService } from '@shared/api/user.service';

export const useGetHistoryCase = () => {
  return useQuery({
    queryKey: [EQueryValues.GET_HISTORY],
    queryFn: UserService.getHistory
  });
};
