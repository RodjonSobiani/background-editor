import { useTranslations } from 'next-intl';

export const CurrentTariffCard = ({
  generationCount,
  tariffName,
  tariffPrice
}: {
  generationCount: number;
  tariffName: string;
  tariffPrice: number;
}) => {
  const t = useTranslations('tariffCards');

  return (
    <div className="border-border bg-light-gray flex w-full max-w-xs items-center justify-between gap-4 rounded-lg border px-3 py-2">
      <div className="flex flex-col gap-2">
        <span className="text-body-18px font-medium">{tariffName}</span>
        <span className="text-secondary text-xs">
          {generationCount} {t('generate')}
        </span>
      </div>

      <span className="text-body-18px font-medium">{tariffPrice}$</span>
    </div>
  );
};
