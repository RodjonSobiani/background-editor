import { setCookie } from 'cookies-next';
import { ECookieValues } from '@shared/utils/enums';

export const setAuthCookies = (accessToken?: string, refreshToken?: string) => {
  if (accessToken) setCookie(ECookieValues.ACCESS_TOKEN, accessToken);
  if (refreshToken) setCookie(ECookieValues.REFRESH_TOKEN, refreshToken);
};
