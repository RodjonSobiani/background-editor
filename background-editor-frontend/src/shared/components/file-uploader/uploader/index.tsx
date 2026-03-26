'use client';

import React, { ChangeEvent, DragEventHandler, useCallback, useMemo, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiReload, mdiUpload } from '@mdi/js';
import { formattedFileSize } from '@shared/utils';
import { FILE_MAX_SIZE_DEFAULT, FILE_VALID_TYPES_DEFAULT } from '@shared/const';
import { Control, Controller, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import Image from 'next/image';
import background from '@shared/assets/images/uploader-background.png';
import { useTranslations } from 'next-intl';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';

interface IFileUploaderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  disabled?: boolean;
  fileMaxSize?: number;
}

export const FileUploader = <T extends FieldValues>({
  name,
  disabled,
  control,
  fileMaxSize = FILE_MAX_SIZE_DEFAULT
}: IFileUploaderProps<T>) => {
  const { openModal } = useModals();
  const t = useTranslations('fileUpload');

  const fileMaxSizeFormatted = useMemo(() => {
    const [size, unit] = formattedFileSize(fileMaxSize);

    return t('max', { size, unit: t(`unit.${unit}`) });
  }, [fileMaxSize, t]);

  const errorClasses = useCallback((error?: boolean) => {
    if (error)
      return {
        border: 'border-error error',
        icon: mdiReload,
        iconColor: 'text-error text-start'
      };
    return {
      border: 'border-secondary',
      icon: mdiUpload,
      iconColor: 'text-icon text-start'
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop =
    (onChange: ControllerRenderProps['onChange']): DragEventHandler<HTMLDivElement> =>
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files.length) {
        handleFileChange(e.dataTransfer.files, onChange);
      }
    };

  const handleChangeFile = (onChange: ControllerRenderProps['onChange']) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFileChange(e.target.files, onChange);
    }
  };

  const handleFileChange = (files: FileList, onChange: ControllerRenderProps['onChange']) => {
    if (disabled) {
      return;
    }
    if (files.length > 3) {
      // TODO: ошибка кол-ва файлов
      return;
    }
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      if (!FILE_VALID_TYPES_DEFAULT.includes(files[i].type)) {
        // TODO: ошибка типа
        return;
      }
      totalSize += files[i].size;
    }
    if (totalSize > fileMaxSize) {
      // TODO: ошибка общего размера файла
      return;
    }
    const saveFiles = [...files];
    // TODO: нужна ли форма???
    onChange(saveFiles);
    openModal(EModalKeys.MODAL_UPLOAD_FILES, saveFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: handleOnChange }, fieldState: { error } }) => {
        const errorParams = errorClasses(!!error);
        return (
          <div>
            <div
              className={`${errorParams.border} file-uploader-container`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(handleOnChange)}>
              <input
                ref={fileInputRef}
                type={'file'}
                accept={'.jpeg, .jpg, .png, .webp, .heif, .heic'}
                multiple
                className={'hidden'}
                onChange={handleChangeFile(handleOnChange)}
              />
              <div className={'xs:space-y-0 md:space-y-22'}>
                <div className={'upload-instructions-container'}>
                  <Icon path={errorParams.icon} size={'36px'} className={errorParams.iconColor} />
                  <div className={'body-14px-golos-regular text-center'}>
                    {error ? (
                      <p className={'text-error'}>{t('repeat')}</p>
                    ) : (
                      <>
                        <p className={'mb-1'}>{t('removeBackground')}</p>
                        <span>
                          {t.rich('upload', {
                            upload: (chunks) => (
                              <span
                                className={'text-secondary cursor-pointer underline'}
                                onClick={() => fileInputRef.current?.click()}>
                                {chunks}
                              </span>
                            ),
                            drag: (chunks) => <span className={'text-secondary'}>{chunks}</span>
                          })}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className={'upload-options-container'}>
                  <span className={'xs:flex-0 md:flex-1'}>{t('option.deleteObject')}</span>
                  <span className={'xs:flex-0 text-center md:flex-1'}>{t('option.backgroundEdit')}</span>
                  <span className={'xs:flex-0 text-end md:flex-1'}>{t('option.removeBackground')}</span>
                </div>
              </div>
              <Image draggable={false} src={background} alt={'background'} className={'upload-background'} />
            </div>
            <p className={`body-12px-golos-medium ${errorParams.iconColor}`}>
              {error ? t('exceeded') : fileMaxSizeFormatted}
            </p>
          </div>
        );
      }}
    />
  );
};
