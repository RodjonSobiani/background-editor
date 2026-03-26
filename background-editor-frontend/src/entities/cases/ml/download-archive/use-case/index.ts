import { useMutation } from '@tanstack/react-query';
import { MLService } from '@shared/api/ml.service';

export const useDownloadArchiveCase = () => {
  return useMutation({
    mutationFn: MLService.downloadArchive
  });
};
