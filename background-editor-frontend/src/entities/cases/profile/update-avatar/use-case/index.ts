import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@shared/api/user.service';
import { EQueryValues } from '@shared/utils/enums';

export const useUpdateAvatarUseCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.updateAvatar,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [EQueryValues.GET_ME] });
    }
  });
};
