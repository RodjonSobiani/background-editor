import Icon from '@mdi/react';
import { mdiBellBadgeOutline } from '@mdi/js';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const HistoryNotice = () => {
  const t = useTranslations('profilePage.history');

  return (
    <div className="history-notice-container">
      <div className="flex items-center gap-2">
        <Icon path={mdiBellBadgeOutline} size="16px" className="min-w-4" />
        <span>{t('notice')}</span>
      </div>

      <Link href="?tab=tariff" className="text-secondary mr-0 ml-auto text-nowrap underline">
        {t('goToTariffs')}
      </Link>
    </div>
  );
};
