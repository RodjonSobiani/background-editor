import { useMutation } from '@tanstack/react-query';
import { S3Service } from '@shared/api/s3.service';

export const useUploadPhotoBgUseCase = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const name = await S3Service.uploadImage(file);
      return await S3Service.getPresigned(name);
    }
  });
};
