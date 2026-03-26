import { useMutation } from '@tanstack/react-query';
import { EQueryValues } from '@shared/utils/enums';
import { AuthService } from '@shared/api/auth.service';

export const useRefreshTokenUseCase = () => {
  return useMutation({
    mutationKey: [EQueryValues.REFRESH_TOKEN],
    mutationFn: (refreshToken: string) => AuthService.refreshToken({ refreshToken })
  });
};
