import { mdiAccount, mdiCreditCardOutline, mdiHistory, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import { AuthService } from '@shared/api/auth.service';
import { useAuth } from '@shared/providers/client/auth-provider';
import { useTranslations } from 'next-intl';
import { ListItem } from '../action-list-item';

export const ActionsList = ({
  selectedTab,
  onItemClick
}: {
  selectedTab: string;
  onItemClick: (name: string) => void;
}) => {
  const t = useTranslations('profilePage.tabs');
  const auth = useAuth();

  const handleLogout = () => AuthService.logout(auth.logout);

  return (
    <ul className="actions-list-wrapper no-scrollbar">
      <ListItem
        caption={t('profile')}
        selected={selectedTab === 'profile'}
        onClick={() => onItemClick('profile')}
        renderIcon={(className) => <Icon path={mdiAccount} className={className} />}
      />

      <ListItem
        caption={t('history')}
        selected={selectedTab === 'history'}
        onClick={() => onItemClick('history')}
        renderIcon={(className) => <Icon path={mdiHistory} className={className} />}
      />

      <ListItem
        caption={t('tariff')}
        selected={selectedTab === 'tariff'}
        onClick={() => onItemClick('tariff')}
        renderIcon={(className) => <Icon path={mdiCreditCardOutline} className={className} />}
      />

      <ListItem
        selected={false}
        caption={t('logout')}
        color="error"
        onClick={handleLogout}
        renderIcon={(className) => <Icon path={mdiLogout} className={className} />}
      />
    </ul>
  );
};
