import Link from 'next/link';
import { LinkIcon } from '../icons/link-icon';
import { useTranslations } from 'next-intl';

export const ArticleLink = () => {
  const t = useTranslations('articlesPage');

  return (
    <Link href="/" className="text-secondary flex items-center self-end">
      {t('allArticles')}
      <LinkIcon />
    </Link>
  );
};
