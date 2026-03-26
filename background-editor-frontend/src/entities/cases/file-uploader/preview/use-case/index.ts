import { useMutation } from '@tanstack/react-query';
import { WorkingAreaService } from '@shared/api/working-area.service';
import { useRouter } from 'next/navigation';
import { useModals } from '@shared/providers/client/modal-provider';

export const usePreviewUploaderUseCase = () => {
  const router = useRouter();
  const { closeModals } = useModals();

  return useMutation({
    mutationFn: WorkingAreaService.create,
    onSuccess: ({ id }) => {
      closeModals();
      router.push(`/working-area/${id}`);
    },
    onError: () => {}
  });
};
