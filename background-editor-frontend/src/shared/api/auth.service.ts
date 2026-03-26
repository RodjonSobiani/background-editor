import { API_HTTPS_AUTH_SERVICES } from '@shared/lib/axios';
import {
  ILoginPort,
  IRegisterPort,
  IRecoverPasswordPort,
  IResetPasswordPort,
  IRefreshTokenPort
} from '@shared/interfaces/entities/user/port';
import { IGetMeDto, ILoginDto, IRefreshTokenDto, IRegisterDto } from '@shared/interfaces/entities/user/dto';
import { AxiosResponse } from 'axios';

export const AuthService = {
  register: async (port: IRegisterPort): Promise<IRegisterDto> => {
    return API_HTTPS_AUTH_SERVICES.post('/register', port).then((res: AxiosResponse<IRegisterDto>) => res.data);
  },
  login: async (port: ILoginPort): Promise<ILoginDto> => {
    return API_HTTPS_AUTH_SERVICES.post('/login', port).then((res: AxiosResponse<ILoginDto>) => res.data);
  },
  logout: (logoutCallback: () => void) => {
    logoutCallback();
  },
  recoverPassword: async (port: IRecoverPasswordPort): Promise<void> => {
    return API_HTTPS_AUTH_SERVICES.post('/recover-password', port).then((res: AxiosResponse) => res.data);
  },
  resetPassword: async (port: IResetPasswordPort): Promise<void> => {
    return API_HTTPS_AUTH_SERVICES.patch('/reset-password', port).then((res: AxiosResponse) => res.data);
  },
  refreshToken: async (port: IRefreshTokenPort): Promise<IRefreshTokenDto> => {
    return API_HTTPS_AUTH_SERVICES.post('/refresh-token', port).then(
      (res: AxiosResponse<IRefreshTokenDto>) => res.data
    );
  },
  getMe: async (logoutCallback?: () => void): Promise<IGetMeDto> => {
    return API_HTTPS_AUTH_SERVICES.get('/get-me')
      .then((res: AxiosResponse) => res.data)
      .catch((error) => {
        if (logoutCallback) {
          AuthService.logout(logoutCallback);
        }
        throw error;
      });
  }
};
