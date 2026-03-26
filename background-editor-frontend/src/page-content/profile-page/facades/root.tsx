import { FormProfile } from '@features/profile';
import { useTranslations } from 'next-intl';
import { useChangeTab } from '../model/use-change-tab';
import { ActionsList } from '../ui/actions-list';
import { Layout } from '../ui/layout';
import { TariffViewer } from './tariff';
import { HistoryViewer } from '@page-content/profile-page/facades/history';

export const Root = () => {
  const t = useTranslations('profilePage.tabs');

  const { handleChangeTab, selectedTab } = useChangeTab();

  return (
    <Layout
      caption={t(selectedTab)}
      actionsList={<ActionsList selectedTab={selectedTab} onItemClick={handleChangeTab} />}
      content={
        <>
          {selectedTab === 'profile' && <FormProfile />}
          {selectedTab === 'history' && <HistoryViewer />}
          {selectedTab === 'tariff' && <TariffViewer />}
        </>
      }
    />
  );
};
