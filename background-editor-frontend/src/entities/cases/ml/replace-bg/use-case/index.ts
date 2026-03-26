import { useMutation } from '@tanstack/react-query';
import { MLService } from '@shared/api/ml.service';

export const useReplaceBgCase = () => {
  return useMutation({
    mutationFn: MLService.replaceBg
  });
};
