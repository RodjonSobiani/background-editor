import { joiResolver } from '@hookform/resolvers/joi';
import { Schema } from 'joi';
import { useLocale } from 'next-intl';
import ru from './locales/ru';
import en from './locales/en';

const JoiResolverI18n = (schema: Schema, overwriteMessages?: Record<string, string>) => {
  const locale = useLocale();
  const messages = Object.assign(locale === 'ru' ? ru : en, overwriteMessages);
  return joiResolver(schema, {
    messages,
    abortEarly: false
  });
};

export { JoiResolverI18n };
