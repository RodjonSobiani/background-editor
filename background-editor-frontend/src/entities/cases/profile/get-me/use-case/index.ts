import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { EQueryValues, ECookieValues } from '@shared/utils/enums';
import { AuthService } from '@shared/api/auth.service';
import { useAuth } from '@shared/providers/client/auth-provider';

export const useGetMeUseCase = () => {
  const token = getCookie(ECookieValues.ACCESS_TOKEN);

  const { logout } = useAuth();

  return useQuery({
    queryKey: [EQueryValues.GET_ME],
    queryFn: () => AuthService.getMe(logout),
    enabled: !!token
  });
};
