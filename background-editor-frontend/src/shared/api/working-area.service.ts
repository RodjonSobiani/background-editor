import { API_HTTPS_WORKING_AREA_SERVICES } from '@shared/lib/axios';
import {
  IAddImagesWorkingAreaPort,
  ICreateWorkingAreaPort,
  IRemoveImagesWorkingAreaPort
} from '@shared/interfaces/entities/working-area/port';
import { IWorkingAreaDto } from '@shared/interfaces/entities/working-area/dto';
import { S3Service } from '@shared/api/s3.service';

export const WorkingAreaService = {
  create: async (port: ICreateWorkingAreaPort): Promise<IWorkingAreaDto> => {
    const objectNames = await S3Service.uploadImages(port.images);
    return await API_HTTPS_WORKING_AREA_SERVICES.post<IWorkingAreaDto>('/', { images: objectNames }).then(
      (res) => res.data
    );
  },
  get: async (id: string): Promise<IWorkingAreaDto> => {
    return await API_HTTPS_WORKING_AREA_SERVICES.get<IWorkingAreaDto>(`/${id}`).then((res) => res.data);
  },
  removeImages: async ({ id, ids }: IRemoveImagesWorkingAreaPort): Promise<void> => {
    return await API_HTTPS_WORKING_AREA_SERVICES.post(`/${id}/remove-images`, { ids }).then((res) => res.data);
  },
  addImages: async ({ id, images }: IAddImagesWorkingAreaPort): Promise<IWorkingAreaDto> => {
    const objectNames = await S3Service.uploadImages(images);
    return await API_HTTPS_WORKING_AREA_SERVICES.post<IWorkingAreaDto>(`/${id}/add-images`, {
      images: objectNames
    }).then((res) => res.data);
  }
};
