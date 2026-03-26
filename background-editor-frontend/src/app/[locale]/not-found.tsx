import { Button } from '@shared/components/buttons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations('404');
  return (
    <div className={'error-container'}>
      <div className={'error-content'}>
        <h1 className={'error-code h1-furore'}>404</h1>
        <div className={'space-y-2 text-center'}>
          <p className={'text-h1-golos'}>{t('title')}</p>
          <span className={'body-18px-golos-medium'}>{t('description')}</span>
        </div>
        <Button className={'w-fit'}>
          <Link href={'/'}>{t('button')}</Link>
        </Button>
      </div>
    </div>
  );
};

export function generateMetadata() {
  return {
    title: '500 - Server Error',
    statusCode: 500
  };
}

export default NotFound;
