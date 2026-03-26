import { API_HTTPS_USER_SERVICES } from '@shared/lib/axios';
import {
  IChangeEmailPort,
  IChangeNamePort,
  IChangePasswordPort,
  IUpdateAvatarPort
} from '@shared/interfaces/entities/user/port';
import { AxiosResponse } from 'axios';
import { IChangeEmailDto, IChangeNameDto, IChangePasswordDto, IHistoryDto } from '@shared/interfaces/entities/user/dto';
import { S3Service } from '@shared/api/s3.service';

export const UserService = {
  changeName: async (port: IChangeNamePort): Promise<IChangeNameDto> => {
    return API_HTTPS_USER_SERVICES.post('/change-name', port).then((res: AxiosResponse<IChangeNameDto>) => res.data);
  },

  changeEmail: async (port: IChangeEmailPort): Promise<IChangeEmailDto> => {
    return API_HTTPS_USER_SERVICES.post('/change-email', port).then((res: AxiosResponse<IChangeEmailDto>) => res.data);
  },

  updateAvatar: async (port: IUpdateAvatarPort): Promise<void> => {
    let objectName: string | null = null;
    if (port.file) {
      objectName = await S3Service.uploadImage(port.file);
    }
    await API_HTTPS_USER_SERVICES.post('/update-avatar', { avatar: objectName });
  },

  changePassword: async (port: IChangePasswordPort): Promise<IChangePasswordDto> => {
    return API_HTTPS_USER_SERVICES.post('/change-password', port).then(
      (res: AxiosResponse<IChangePasswordDto>) => res.data
    );
  },

  getHistory: async (): Promise<IHistoryDto[]> => {
    return API_HTTPS_USER_SERVICES.get('/history').then((res) => res.data);
  }
};
