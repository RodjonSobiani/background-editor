'use client';

import { useEffect } from 'react';
import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('500');

  useEffect(() => {
    console.error('Произошла ошибка:', error);
  }, [error]);

  return (
    <div className={'error-container'}>
      <div className={'error-content'}>
        <h1 className={'error-code h1-furore'}>500</h1>
        <div className={'space-y-2 text-center'}>
          <p className={'text-h1-golos'}>{t('title')}</p>
          <span className={'body-18px-golos-medium'}>{t('description')}</span>
        </div>
        <Button onClick={reset} className={'w-fit'}>
          {t('button')}
        </Button>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: '500 - Server Error',
    statusCode: 500
  };
}
