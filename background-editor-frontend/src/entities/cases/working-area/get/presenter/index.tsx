import { ChangeEvent, MouseEvent, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IDropdownOption } from '@shared/interfaces/ui';
import { DOWNLOAD_OPTIONS } from '@shared/const';
import { DropdownDownloadItem } from '@page-content/working-area-page/ui/dropdown-item';
import { useGetWorkingAreaUseCase } from '@entities/cases/working-area/get';
import { fetchFileFromUrl, useUrlToFile } from '@shared/utils/use-url-to-file';
import { IIMageDimensions, IImagesWithHistory } from '@shared/interfaces/entities/working-area/dto';
import { useRemoveBgCase } from '@entities/cases/ml/remove-bg';
import { useReplaceBgCase } from '@entities/cases/ml/replace-bg';
import { useDebounce } from '@shared/utils/use-debounce';
import { getScaledDimensions } from '@shared/utils/get-scaled-dimensions';
import { useResizeImageCase } from '@entities/cases/ml/resize-image';
import { useUploadPhotoBgUseCase } from '@entities/cases/working-area/upload-photo-bg/use-case';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys, EQueryValues } from '@shared/utils/enums';
import { useRemoveImagesWorkingAreaUseCase } from '@entities/cases/working-area/remove-images/use-case';
import { findIndex, isNumber } from 'lodash-es';
import { useAddImagesWorkingAreaUseCase } from '@entities/cases/working-area/add-images/use-case';
import { useQueryClient } from '@tanstack/react-query';
import { useDownloadArchiveCase } from '@entities/cases/ml/download-archive';
import { useRouter } from 'next/navigation';
import { useDisableBodyScroll } from '@shared/utils/hooks/use-disable-body-scroll';
import { PNG_BACKGROUND } from '@shared/const/links';

export const useGetWorkingAreaPresenter = (id: string) => {
  const refetchClient = useQueryClient();
  const router = useRouter();

  const { data, isError } = useGetWorkingAreaUseCase(id);
  // const { mutateAsync: mutateUpdateAsync } = useUpdateWorkingAreaUseCase();
  const [files, setFiles] = useState<IImagesWithHistory[]>([]);
  const { data: filesData, isLoading: isLoadingUrlToFile } = useUrlToFile(data?.images ?? []);

  const { mutateAsync: mutateRemoveBg, isPending: isPendingRemove } = useRemoveBgCase();
  const { mutateAsync: mutateReplaceBg, isPending: isPendingReplace } = useReplaceBgCase();
  const { mutateAsync: mutateUploadPhotoBg, isPending: isPendingUploadPhotoBg } = useUploadPhotoBgUseCase();
  const { mutateAsync: mutateRemoveImages } = useRemoveImagesWorkingAreaUseCase();
  const { mutateAsync: mutateAddImages } = useAddImagesWorkingAreaUseCase();
  const { mutateAsync: mutateResizeImage, isPending: isPendingResize } = useResizeImageCase();
  const { mutateAsync: mutateDownloadArchive, isPending: isPendingDownloadArchive } = useDownloadArchiveCase();

  const { openModal, closeModals } = useModals();

  const [selectedFile, setSelectedFile] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const lastActionRef = useRef<(index: number) => void>(() => {});
  const colorInputRef = useRef<HTMLInputElement>(null);
  const photoBgRef = useRef<HTMLInputElement>(null);
  const inputAddImagesRef = useRef<HTMLInputElement>(null);

  const [colors, setColors] = useState<string[]>(['#367BF5', '#EA2929', '#FFFFFF', '#41B15A', '#EBAC0C']);
  const [tmpColor, setTmpColor] = useState<string>(colors[colors.length - 1]);
  const [disableTransform, setDisableTransform] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<IIMageDimensions>();

  useEffect(() => {
    if (!!filesData?.length) {
      setFiles(
        filesData.map(({ file, url, history, id }) => ({
          id,
          file: file,
          history: [url, ...history]
        }))
      );
    }
  }, [filesData]);

  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);

  useDebounce({
    valueWatch: tmpColor,
    callback(value) {
      setColors((prevState) => {
        const newColors = [...prevState];
        if (newColors.length >= 5) {
          newColors.shift();
        }
        newColors.push(value);
        return newColors;
      });
      handleSubmitReplaceBg(value);
      lastActionRef.current = (index: number) => {
        handleSubmitReplaceBg(value, index);
      };
    }
  });

  const isLoading = useMemo(() => {
    return isLoadingUrlToFile || isPendingRemove || isPendingReplace || isPendingUploadPhotoBg || !files.length;
  }, [isLoadingUrlToFile, isPendingRemove, isPendingReplace, isPendingUploadPhotoBg, files.length]);

  useDisableBodyScroll(isLoading);

  const isLoadingDownload = useMemo(() => {
    return isPendingResize || isPendingDownloadArchive;
  }, [isPendingResize, isPendingDownloadArchive]);

  const handleChooseColor = (e: ChangeEvent<HTMLInputElement>) => {
    setTmpColor(e.target.value);
  };

  const handleChooseColorFromList = (value: string) => () => {
    handleSubmitReplaceBg(value);
    lastActionRef.current = (index: number) => {
      handleSubmitReplaceBg(value, index);
    };
  };
  const handleRemoveBg = () => {
    handleSubmitRemoveBg();
    lastActionRef.current = (index: number) => {
      handleSubmitRemoveBg(index);
    };
  };

  const getDimensionsByScale = useCallback(
    (scale: number) => {
      return getScaledDimensions(imageDimensions?.width, imageDimensions?.height, scale);
    },
    [imageDimensions?.height, imageDimensions?.width]
  );

  const getSelectedFile = useMemo<IImagesWithHistory | undefined>(() => {
    return files[selectedFile];
  }, [files, selectedFile]);

  const handleDownload = async (blob: Blob, name: string) => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleDownloadOneScalse = useCallback(async (url: string) => {
    const { file } = await fetchFileFromUrl(url);
    await handleDownload(file, file.name);
  }, []);

  const handleDownloadImage = useCallback(
    (scale: number) => {
      if (files.length === 1) {
        const first = files[0];
        if (scale === 1) void handleDownloadOneScalse(first.history.at(-1)!);
        else
          void mutateResizeImage(
            {
              input_url: first.history.at(-1)!,
              scale
            },
            {
              onSuccess: (blob) => {
                void handleDownload(blob, first.file.name);
              }
            }
          );
      } else if (files.length > 1) {
        void mutateDownloadArchive(
          {
            image_urls: files.map((file) => file.history.at(-1)!),
            scale
          },
          {
            onSuccess: (blob) => {
              void handleDownload(blob, new Date().toDateString());
            }
          }
        );
      }
    },
    [files, handleDownloadOneScalse, mutateDownloadArchive, mutateResizeImage]
  );

  const downloadOptions: IDropdownOption[] = useMemo(() => {
    return DOWNLOAD_OPTIONS.map((title, index) => ({
      label: <DropdownDownloadItem title={title} isPro={index !== 0} imageDimensions={getDimensionsByScale(title)} />,
      value: index.toString(),
      onClick: () => handleDownloadImage(title)
    }));
  }, [getDimensionsByScale, handleDownloadImage]);

  const onClickPalette = () => {
    colorInputRef.current?.click();
  };

  const onClickPhotoBg = () => {
    photoBgRef.current?.click();
  };

  const handleRemoveFile = (removeId: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void mutateRemoveImages(
      { id, ids: [removeId] },
      {
        onSuccess: () => {
          const newFiles = files.filter((file) => file.id !== removeId);
          if (!newFiles.length) {
            router.replace('/');
            return;
          }
          setFiles(newFiles);
          const lengthFiles = newFiles.length - 1;
          if (selectedFile > lengthFiles) {
            setSelectedFile(lengthFiles);
          }
        }
      }
    );
  };

  const handleSetSelectedFile = (selected: number) => () => {
    setHistoryIndex(-1);
    setSelectedFile(selected);
    lastActionRef.current = () => {};
  };

  const getSelectedPreview = useMemo(() => {
    return getSelectedFile?.history.at(historyIndex) ?? PNG_BACKGROUND;
  }, [getSelectedFile?.history, historyIndex]);

  const handleHistoryBack = () => {
    if (historyIndex === -1 && getSelectedFile && getSelectedFile.history.length > 1) {
      setHistoryIndex(getSelectedFile.history.length - 2);
    } else if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleHistoryForward = () => {
    if (getSelectedFile && historyIndex < getSelectedFile.history.length - 1) {
      if (historyIndex === -1) setHistoryIndex(-1);
      else setHistoryIndex(historyIndex + 1);
    }
  };

  const handleAddHistory = (image: string, index?: number) => {
    const updatedImages = [...files];
    const selectIndex = index ?? selectedFile;
    files[selectIndex].history = [...files[selectIndex].history, image];
    setFiles(updatedImages);
    setTimeout(() => setHistoryIndex(-1));
  };

  const handleSubmitRemoveBg = (index?: number) => {
    if (getSelectedFile)
      void mutateRemoveBg({
        id,
        image_id: isNumber(index) ? files[index].id : getSelectedFile.id
      }).then(({ image_url }) => {
        handleAddHistory(image_url, index);
      });
  };

  const handleSubmitReplaceBg = (color: string, index?: number) => {
    if (getSelectedFile)
      void mutateReplaceBg({
        id,
        image_id: isNumber(index) ? files[index].id : getSelectedFile.id,
        background: color
      }).then(({ image_url }) => {
        handleAddHistory(image_url, index);
      });
  };

  const handleSwitchBefore = (value: boolean) => () => {
    if (getSelectedFile) setHistoryIndex(value ? 0 : getSelectedFile?.history.length - 1);
  };

  const getBefore = useMemo(() => {
    return historyIndex === 0 || getSelectedFile?.history.length === 1;
  }, [getSelectedFile?.history, historyIndex]);

  const handleApplyAll = async () => {
    const promiseAll = files
      .filter(({ id }) => id !== getSelectedFile?.id)
      .map(({ id }) => {
        lastActionRef.current(findIndex(files, { id }));
      });
    await Promise.all(promiseAll);
    lastActionRef.current = () => {};
  };

  const handleTransform = (scale: number) => {
    if (scale > 1 && disableTransform) setDisableTransform(false);
    if (scale === 1 && !disableTransform) setDisableTransform(true);
  };

  const handleLoadImage = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const handleChoosePhotoBg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      void mutateUploadPhotoBg(e.target.files[0], {
        onSuccess: (imageUrl) => {
          handleSubmitReplaceBg(imageUrl);
          lastActionRef.current = (index: number) => {
            handleSubmitReplaceBg(imageUrl, index);
          };
        }
      });
    }
  };

  const openAddImageInput = () => {
    inputAddImagesRef.current?.click();
  };

  const handleClearAddImageRef = () => {
    if (inputAddImagesRef.current) inputAddImagesRef.current.value = '';
  };

  const handleAddImage = (newImages: File[]) => {
    void mutateAddImages(
      {
        id,
        images: newImages
      },
      {
        onSuccess: () => {
          // TODO: чтобы не перезаписывать старые файлы можно сделать мутате отдельный для одного изображения в файл
          void refetchClient.invalidateQueries({ queryKey: [EQueryValues.GET_WORKING_AREA, id] }).then(closeModals);
        }
      }
    );
    handleClearAddImageRef();
  };

  const handleOpenAddImagesModal = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length)
      openModal(EModalKeys.MODAL_UPLOAD_FILES_PREVIEW, {
        files: [...e.target.files],
        successLabel: 'add',
        handleSuccess: handleAddImage,
        handleClose: handleClearAddImageRef
      });
  };

  return {
    photoBgRef,
    onClickPhotoBg,
    handleChoosePhotoBg,
    handleSwitchBefore,
    colors,
    colorInputRef,
    onClickPalette,
    handleChooseColor,
    downloadOptions,
    files,
    handleRemoveFile,
    handleSetSelectedFile,
    handleRemoveBg,
    getSelectedPreview,
    handleHistoryBack,
    handleHistoryForward,
    getBefore,
    handleChooseColorFromList,
    handleApplyAll,
    handleTransform,
    disableTransform,
    handleLoadImage,
    handleOpenAddImagesModal,
    openAddImageInput,
    inputAddImagesRef,
    isLoading,
    isLoadingDownload
  };
};
