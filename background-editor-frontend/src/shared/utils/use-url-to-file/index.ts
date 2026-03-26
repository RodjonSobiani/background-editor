import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EQueryValues } from '@shared/utils/enums';
import { IImageWorkingAreaDto } from '@shared/interfaces/entities/working-area/dto';

interface IUrlToFileReturn extends IImageWorkingAreaDto {
  file: File;
}

export const fetchFileFromUrl = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' });
  return {
    file: new File([response.data], url.split('/').pop()?.split('?').shift() ?? '', { type: response.data.type }),
    url
  };
};

export const fetchFileFromImage = async ({ url, ...image }: IImageWorkingAreaDto) => {
  const response = await fetchFileFromUrl(url);
  return {
    ...image,
    ...response
  };
};

export const useUrlToFile = (fileUrls: IImageWorkingAreaDto[]) => {
  return useQuery<IUrlToFileReturn[]>({
    queryKey: [EQueryValues.URL_TO_FILE, fileUrls],
    queryFn: () => {
      const filePromises = fileUrls.map(fetchFileFromImage);
      return Promise.all(filePromises);
    },
    enabled: !!fileUrls.length
  });
};

export type { IUrlToFileReturn };
