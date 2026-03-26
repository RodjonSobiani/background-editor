import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const tabs = ['profile', 'history', 'tariff'];

const validateTabParams = (tab: string | null): tab is string => Boolean(tab && tabs.includes(tab));

const getDefaultTab = (searchParams: ReadonlyURLSearchParams) => {
  const readTab = searchParams.get('tab');

  return validateTabParams(readTab) ? readTab : tabs[0];
};

export const useChangeTab = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(getDefaultTab(searchParams));

  useEffect(() => setSelectedTab(getDefaultTab(searchParams)), [searchParams]);

  const handleChangeTab = (tabName: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabName);

    router.push(`?${params}`);
  };

  return {
    selectedTab,
    handleChangeTab
  };
};
