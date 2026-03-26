'use client';

import React from 'react';
import { Button } from '@shared/components/buttons';
import Icon from '@mdi/react';
import { mdiDownload, mdiImageMultiple, mdiPlus } from '@mdi/js';
import Image from 'next/image';
import loader from '@shared/assets/images/loader.svg';

import palette from '@shared/assets/images/palette.png';
import { FileCard } from '@shared/components/file-uploader';
import Dropdown from '@shared/components/dropdown';
import { useTranslations } from 'next-intl';
import { useGetWorkingAreaPresenter } from '@entities/cases/working-area/get';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ImageControl } from '@page-content/working-area-page/ui/image-control';
import { PNG_BACKGROUND } from '@shared/const/links';

const WorkingAreaPageContent: React.FC<{ id: string }> = ({ id }) => {
  const t = useTranslations('workingArea');

  const {
    colors,
    onClickPalette,
    colorInputRef,
    downloadOptions,
    files,
    handleRemoveFile,
    handleSetSelectedFile,
    getSelectedPreview,
    handleChooseColor,
    handleChooseColorFromList,
    handleApplyAll,
    handleTransform,
    disableTransform,
    handleLoadImage,
    handleRemoveBg,
    photoBgRef,
    onClickPhotoBg,
    handleChoosePhotoBg,
    handleOpenAddImagesModal,
    openAddImageInput,
    inputAddImagesRef,
    isLoading,
    isLoadingDownload,
    ...imageControlProps
  } = useGetWorkingAreaPresenter(id);

  return (
    <>
      <div className={'md:block md:flex-nowrap md:gap-6 2xl:flex'}>
        <div className={'flex-2 space-y-6'}>
          <TransformWrapper disabled={disableTransform} onTransformed={(_, state) => handleTransform(state.scale)}>
            <ImageControl {...imageControlProps} />
            <div className={'overflow-hidden rounded-2xl'}>
              <TransformComponent contentClass={'w-full!'} wrapperClass={'w-full!'}>
                <Image
                  src={getSelectedPreview}
                  alt={'selected'}
                  width={0}
                  height={0}
                  style={{ backgroundImage: `url(${PNG_BACKGROUND})` }}
                  className={'w-full bg-cover bg-no-repeat'}
                  onLoad={handleLoadImage}
                  priority
                />
              </TransformComponent>
            </div>
          </TransformWrapper>
          <div
            className={
              'flex flex-col-reverse items-center justify-center md:flex-row md:flex-nowrap md:justify-between'
            }>
            <div className={'flex h-10 cursor-pointer items-center justify-center'} onClick={handleApplyAll}>
              <span className={'body-12px-golos-medium underline'}>{t('applyAll')}</span>
            </div>
            <div className={'flex justify-between gap-2'}>
              <Button variant={'secondary'} className={'max-h-8 max-w-8 p-2'} onClick={onClickPhotoBg}>
                <Icon path={mdiImageMultiple} size={'16px'} />
                <input
                  onChange={handleChoosePhotoBg}
                  className={'hidden'}
                  type={'file'}
                  ref={photoBgRef}
                  accept={'.jpeg, .jpg, .png, .webp, .heif, .heic'}
                />
              </Button>
              <div
                className={
                  'border-border max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer overflow-hidden rounded-full border'
                }
                onClick={handleRemoveBg}>
                <Image
                  src={PNG_BACKGROUND}
                  alt={'palette'}
                  className={'h-30 w-30 object-cover'}
                  width={30}
                  height={30}
                />
              </div>
              {colors.map((backgroundColor, index) => (
                <div
                  key={index}
                  className={'border-border max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer rounded-full border'}
                  style={{ backgroundColor }}
                  onClick={handleChooseColorFromList(backgroundColor)}
                />
              ))}
              <div onClick={onClickPalette} className={'relative min-h-8 min-w-8 cursor-pointer'}>
                <Image src={palette} alt={'palette'} />
                <input
                  ref={colorInputRef}
                  onChange={handleChooseColor}
                  type={'color'}
                  className={'absolute top-0 left-0 h-full w-full cursor-pointer opacity-0'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'flex-1 space-y-6'}>
          <div className={'flex items-center gap-4'}>
            <span className={'body-18px-golos-medium'}>{t('uploadImages')}</span>
            <Button variant={'secondary'} className={'max-h-8 p-2'} onClick={openAddImageInput}>
              <Icon path={mdiPlus} size={'16px'} />
              <input
                onChange={handleOpenAddImagesModal}
                className={'hidden'}
                multiple
                type={'file'}
                ref={inputAddImagesRef}
                accept={'.jpeg, .jpg, .png, .webp, .heif, .heic'}
              />
            </Button>
          </div>
          <div className={'space-y-6'}>
            {files.map(({ file, history, id }, index) => (
              <div key={index} className={'flex items-center gap-4'}>
                <div
                  className={'flex aspect-video h-11 cursor-pointer items-center overflow-hidden'}
                  onClick={handleSetSelectedFile(index)}>
                  <Image
                    src={history[0]}
                    alt={file.name}
                    width={0}
                    height={0}
                    className={'h-11 w-full rounded-sm object-cover'}
                  />
                </div>
                <FileCard className={'w-full'} file={file} onClickRemove={handleRemoveFile(id)} />
              </div>
            ))}
          </div>
          <hr className={'border-border'} />

          <Dropdown
            listContainerClassName={'rounded-lg'}
            position={'right'}
            labelComponent={
              <Button className={'flex w-full items-center justify-center gap-1'} isLoading={isLoadingDownload}>
                <Icon path={mdiDownload} size={'16px'} />
                {t('download')}
              </Button>
            }
            options={downloadOptions}
          />
        </div>
      </div>
      {isLoading && (
        <div className={'fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/60'}>
          <Image className={'animate-spin'} src={loader} alt={'loader'} width={80} height={80} />
        </div>
      )}
    </>
  );
};

export default WorkingAreaPageContent;
