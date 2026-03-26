import { API_HTTPS_UPLOAD_SERVICES } from '@shared/lib/axios';

export const S3Service = {
  uploadImages: async (images: File[]): Promise<string[]> => {
    const form = new FormData();
    for (const file of images) {
      form.append('file', file);
    }
    return (await API_HTTPS_UPLOAD_SERVICES.post<{ objectNames: string[] }>('/images', form).then((res) => res.data))
      .objectNames;
  },
  uploadImage: async (image: File): Promise<string> => {
    const form = new FormData();
    form.append('file', image);
    return (await API_HTTPS_UPLOAD_SERVICES.post<{ objectName: string }>('/image', form).then((res) => res.data))
      .objectName;
  },
  getPresigned: async (name: string): Promise<string> => {
    return (
      await API_HTTPS_UPLOAD_SERVICES.get<{ presignedUrl: string }>(`/presigned-image/${name}`).then((res) => res.data)
    ).presignedUrl;
  }
};
