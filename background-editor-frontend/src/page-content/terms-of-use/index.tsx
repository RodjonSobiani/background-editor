import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { HomeIcon } from '@shared/components/icons/home-icon';
import { useTranslations } from 'next-intl';

export const TermsOfUsePageContent = () => {
  const t = useTranslations('termsOfUse');

  return (
    <div className="mb-24 flex flex-col gap-8">
      <Breadcrumbs
        breadcrumbs={[
          {
            caption: t('breadcrumbs.root'),
            icon: <HomeIcon />,
            to: '/'
          },
          {
            caption: t('breadcrumbs.termsOfUse')
          }
        ]}
      />

      <h3 className="h3-furore">{t('title')}</h3>

      <div className="flex max-w-[840px] flex-col gap-6">
        <p className="leading-[22px]">{t('description')}</p>

        <p className="leading-[22px]">{t.rich('text', { br: () => <br /> })}</p>
      </div>
    </div>
  );
};
