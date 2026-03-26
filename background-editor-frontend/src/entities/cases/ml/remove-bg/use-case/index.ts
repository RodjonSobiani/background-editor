import { useMutation } from '@tanstack/react-query';
import { MLService } from '@shared/api/ml.service';
import { EQueryValues } from '@shared/utils/enums';

export const useRemoveBgCase = () => {
  return useMutation({
    mutationKey: [EQueryValues.ML_REMOVE_BG],
    mutationFn: MLService.removeBg
  });
};
