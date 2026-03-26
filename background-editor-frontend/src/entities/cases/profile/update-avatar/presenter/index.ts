import { useUpdateAvatarUseCase } from '@entities/cases/profile/update-avatar/use-case';
import { ChangeEvent, useRef } from 'react';
import { FILE_MAX_SIZE_10MB, FILE_VALID_TYPES_DEFAULT } from '@shared/const';

export const useUpdateAvatarPresenter = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUpdateAvatarUseCase();

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && FILE_VALID_TYPES_DEFAULT.includes(file.type) && file.size <= FILE_MAX_SIZE_10MB) {
      void mutateAsync({ file });
    }
  };
  const handleRemove = () => {
    void mutateAsync({ file: null });
  };

  return {
    ref,
    handleSubmit,
    handleRemove
  };
};
