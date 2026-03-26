import { useEffect, useMemo, useState } from 'react';
import { usePreviewUploaderUseCase } from '@entities/cases/file-uploader/preview/use-case';

interface IUsePreviewUploaderPresenter {
  files: File[];
  handleSuccess?: (files: File[]) => void;
}

export const usePreviewUploaderPresenter = ({ files, handleSuccess }: IUsePreviewUploaderPresenter) => {
  const { mutateAsync, isPending: isLoading } = usePreviewUploaderUseCase();

  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const fileToUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  useEffect(() => {
    setFileUrls(files.map(fileToUrl));
    return () => {
      fileUrls.forEach(URL.revokeObjectURL);
    };
  }, []);

  const listFiles = useMemo(() => {
    return fileUrls.map((file, index) => ({
      file,
      border: selectedFile === index ? 'border-2 border-secondary' : ''
    }));
  }, [fileUrls, selectedFile]);

  const handleChooseFile = (file: number) => () => {
    setSelectedFile(file);
  };

  const handleEdit = () => {
    if (handleSuccess) handleSuccess(files);
    else void mutateAsync({ images: files });
  };

  const getSelectedFile = useMemo<string | undefined>(() => {
    return fileUrls[selectedFile];
  }, [fileUrls, selectedFile]);

  return {
    getSelectedFile,
    listFiles,
    isLoading,
    handleChooseFile,
    handleEdit
  };
};
