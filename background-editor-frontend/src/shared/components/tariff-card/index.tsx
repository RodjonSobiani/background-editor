import CardBackgroundImage from '@shared/assets/images/background';
import Link from 'next/link';
import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';

interface ITariffCardCardProps {
  price: string;
  period: 'week' | 'month';
  countGenerations: string;
  link: string;
}

const TariffCard = ({ price, period, countGenerations, link }: ITariffCardCardProps) => {
  const t = useTranslations('tariffCards');

  const backgroundStyles = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    transform: `rotate(45deg) scale(1)`,
    top: '-170px',
    left: '0px'
  };

  return (
    <div className="tariff-card-wrapper select-none">
      <div style={backgroundStyles} className={'absolute inset-0'}>
        <CardBackgroundImage className={'text-card-bg-inverse'} />
      </div>

      <div className="content-wrapper">
        <h1 className="card-price">
          <div className={'text-h1-golos font-medium'}>{price}</div>
          <div className={'body-14px-golos-regular text-primary'}>$</div>
          <div className={'body-18px-golos-medium text-secondary'}>/{t(`${period}.price`)}</div>
        </h1>
        <h2 className="card-period h2-golos-medium">{t(`${period}.period`)}</h2>
        <h3 className="card-count h3-golos-regular text-secondary">
          {countGenerations} {t('generate')}
        </h3>
        <div className="w-full pt-6">
          <Button variant={'primary'} className={'w-full'}>
            <Link href={link}>{t('link')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
