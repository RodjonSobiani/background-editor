import Image from 'next/image';
import { Button } from '@shared/components/buttons';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
import { useTranslations } from 'next-intl';
import { IHistoryDto } from '@shared/interfaces/entities/user/dto';
import { useMemo } from 'react';

export const HistoryCard = ({ working_area_id, image, created_at }: IHistoryDto) => {
  const t = useTranslations('profilePage.history');

  const dateConverted = useMemo(() => {
    const date = new Date(created_at);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Image src={image} width={180} height={120} alt="history-image" className="history-image" />

      <div>
        <span className="mb-1 block">{'filename'}</span>
        <div className="text-secondary flex items-center justify-between text-xs">
          <span>{t('updatedAt')}</span>
          <span>{dateConverted}</span>
        </div>
      </div>

      <Button variant="secondary" className="relative flex items-center justify-center gap-1">
        <Link href={`/working-area/${working_area_id}`} className="absolute top-0 left-0 h-full w-full" />
        <Icon path={mdiPencil} size="16px" />
        <span>{t('edit')}</span>
      </Button>
    </div>
  );
};
