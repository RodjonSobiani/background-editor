import { Tooltip } from '@shared/components/tooltip';
import { Button } from '@shared/components/buttons';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus, mdiRedo, mdiUndo } from '@mdi/js';
import React from 'react';
import { useControls } from 'react-zoom-pan-pinch';
import { useTranslations } from 'next-intl';

interface ImageControlProps {
  getBefore: boolean;
  handleHistoryBack(): void;
  handleHistoryForward(): void;
  handleSwitchBefore(value: boolean): () => void;
}

export const ImageControl = ({
  getBefore,
  handleHistoryBack,
  handleHistoryForward,
  handleSwitchBefore
}: ImageControlProps) => {
  const t = useTranslations('workingArea');
  const { zoomIn, zoomOut } = useControls();

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
  };

  return (
    <div className={'flex justify-between gap-2'}>
      <div className={'xs:gap-2 no-scrollbar xs:overflow-x-visible md:overscroll-x-scroll flex md:gap-3'}>
        <Tooltip content={t('tooltip.zoomIn')} position={'bottomCenter'}>
          <Button variant={'secondary'} className={'p-3'} onClick={handleZoomIn}>
            <Icon path={mdiPlus} size={'16px'} />
          </Button>
        </Tooltip>
        <Tooltip content={t('tooltip.zoomOut')} position={'bottomCenter'}>
          <Button variant={'secondary'} className={'p-3'} onClick={handleZoomOut}>
            <Icon path={mdiMinus} size={'16px'} />
          </Button>
        </Tooltip>
        <Tooltip content={t('tooltip.stepBack')} position={'bottomCenter'}>
          <Button variant={'secondary'} className={'p-3'} onClick={handleHistoryBack}>
            <Icon path={mdiUndo} size={'16px'} />
          </Button>
        </Tooltip>
        <Tooltip content={t('tooltip.stepForward')} position={'bottomCenter'}>
          <Button variant={'secondary'} className={'p-3'} onClick={handleHistoryForward}>
            <Icon path={mdiRedo} size={'16px'} />
          </Button>
        </Tooltip>
      </div>
      <div className={'flex'}>
        <Button
          onClick={handleSwitchBefore(true)}
          className={`rounded-r-none ${getBefore ? 'hover:bg-primary hover:text-white' : 'hover:bg-light-gray hover:text-primary'}`}
          variant={getBefore ? 'primary' : 'secondary'}>
          {t('before')}
        </Button>
        <Button
          onClick={handleSwitchBefore(false)}
          className={`rounded-l-none ${getBefore ? 'hover:bg-light-gray hover:text-primary' : 'hover:bg-primary hover:text-white'}`}
          variant={getBefore ? 'secondary' : 'primary'}>
          {t('after')}
        </Button>
      </div>
    </div>
  );
};
