import { useMutation } from '@tanstack/react-query';
import { WorkingAreaService } from '@shared/api/working-area.service';

export const useAddImagesWorkingAreaUseCase = () => {
  return useMutation({
    mutationFn: WorkingAreaService.addImages
  });
};
