'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FileUploader } from '@shared/components/file-uploader';

export const FirstBlock = () => {
  const t = useTranslations('homePage.firstBlock');

  const form = useForm<{
    file?: File;
  }>();

  return (
    <div className="first-block">
      <div className="title-section">
        <h1 className="title">{t('title')}</h1>
        <h3 className={'subtitle'}>{t('subtitle')}</h3>
      </div>
      <FileUploader control={form.control} name={'file'} />
    </div>
  );
};
