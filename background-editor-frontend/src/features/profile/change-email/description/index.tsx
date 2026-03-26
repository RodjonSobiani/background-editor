import { useTranslations } from 'next-intl';
import useGetMePresenter from '@entities/cases/profile/get-me/presenter';

export const ChangeEmailDescription = () => {
  const { data: user } = useGetMePresenter();
  const t = useTranslations('changeEmailModal');

  return (
    <>
      <span>
        {t.rich('currentEmail', {
          value: user?.email ?? '',
          current: (chunk) => <span className="text-primary">{chunk}</span>
        })}
      </span>

      <span>{t('description')}</span>
    </>
  );
};
