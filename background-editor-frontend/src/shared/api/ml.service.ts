import { API_HTTPS_WORKING_AREA_SERVICES, ML_HTTPS_SERVICES } from '@shared/lib/axios';
import { IMlDto } from '@shared/interfaces/entities/ml/dto';
import {
  IDonwloadArchivePort,
  IRemoveBgPort,
  IReplaceBgPort,
  IResizeImagePort
} from '@shared/interfaces/entities/ml/port';

export const MLService = {
  removeBg: async ({ id, image_id }: IRemoveBgPort): Promise<IMlDto> => {
    return await API_HTTPS_WORKING_AREA_SERVICES.post<IMlDto>(`/${id}/remove-background`, { image_id }).then(
      (res) => res.data
    );
  },
  replaceBg: async ({ id, ...port }: IReplaceBgPort): Promise<IMlDto> => {
    return await API_HTTPS_WORKING_AREA_SERVICES.post<IMlDto>(`${id}/replace-background`, port).then((res) => res.data);
  },
  resizeImage: async (port: IResizeImagePort): Promise<Blob> => {
    return await ML_HTTPS_SERVICES.post<Blob>('/resize-image', port, { responseType: 'blob' }).then((res) => res.data);
  },
  downloadArchive: async (port: IDonwloadArchivePort): Promise<Blob> => {
    return await ML_HTTPS_SERVICES.post<Blob>('/zip-images', port, { responseType: 'blob' }).then((res) => res.data);
  }
};
