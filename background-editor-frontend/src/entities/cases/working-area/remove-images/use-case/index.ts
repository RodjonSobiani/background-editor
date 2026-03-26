import { useMutation } from '@tanstack/react-query';
import { WorkingAreaService } from '@shared/api/working-area.service';

export const useRemoveImagesWorkingAreaUseCase = () => {
  return useMutation({
    mutationFn: WorkingAreaService.removeImages
  });
};
