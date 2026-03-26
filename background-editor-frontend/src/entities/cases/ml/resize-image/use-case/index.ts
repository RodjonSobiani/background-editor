import { useMutation } from '@tanstack/react-query';
import { MLService } from '@shared/api/ml.service';

export const useResizeImageCase = () => {
  return useMutation({
    mutationFn: MLService.resizeImage
  });
};
