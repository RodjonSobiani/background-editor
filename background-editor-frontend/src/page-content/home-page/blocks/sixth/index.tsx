'use client';

import React from 'react';
import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';
import Accordion from '@shared/components/accordion/base';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';
import { TextAreaControlled } from '@shared/components/inputs/textarea-controlled';
import { useContactUsPresenter } from '@entities/cases/contact-us';

export const SixthBlock = () => {
  const t = useTranslations('homePage.sixthBlock');

  const { contactUsForm, formHandleSubmit } = useContactUsPresenter();

  return (
    <div className="sixth-block">
      <div className={'space-y-6'}>
        <h2 className={'title'}>{t('title')}</h2>
        <h3 className={'subtitle'}>{t('subtitle')}</h3>
      </div>

      <div className={'xs:flex-col flex justify-between gap-16 lg:flex-row'}>
        <div className={'flex-1'}>
          <div className={'space-y-8'}>
            <Accordion
              title={t('accordion.formatSupport')}
              options={[
                {
                  value: '0',
                  label:
                    'Загрузите изображение на ваш выбор, а затем выберите различные варианты цветов. Вы можете выбрать один из предложенных нами цветов или создать свой собственный уникальный оттенок.'
                }
              ]}
            />
            <Accordion
              title={t('accordion.changePlan')}
              options={[
                {
                  value: '0',
                  label:
                    'Загрузите изображение на ваш выбор, а затем выберите различные варианты цветов. Вы можете выбрать один из предложенных нами цветов или создать свой собственный уникальный оттенок.'
                }
              ]}
            />
            <Accordion
              title={t('accordion.changeColor')}
              options={[
                {
                  value: '0',
                  label:
                    'Загрузите изображение на ваш выбор, а затем выберите различные варианты цветов. Вы можете выбрать один из предложенных нами цветов или создать свой собственный уникальный оттенок.'
                }
              ]}
            />
            <Accordion
              title={t('accordion.sizeImage')}
              options={[
                {
                  value: '0',
                  label:
                    'Загрузите изображение на ваш выбор, а затем выберите различные варианты цветов. Вы можете выбрать один из предложенных нами цветов или создать свой собственный уникальный оттенок.'
                }
              ]}
            />
          </div>
        </div>
        <div className={'flex-1'}>
          <form onSubmit={contactUsForm.handleSubmit(formHandleSubmit)}>
            <div className={'bg-primary xs:p-6 space-y-6 rounded-3xl md:p-12'}>
              <h3 className={'h3-furore text-white'}>{t('form.contactUs')}</h3>
              <div className={'space-y-4 text-white'}>
                <TextFieldControlled
                  control={contactUsForm.control}
                  label={t('form.name')}
                  placeholder={t('form.name')}
                  name={'name'}
                />
                <TextFieldControlled
                  control={contactUsForm.control}
                  label={t('form.email')}
                  placeholder={t('form.email')}
                  name={'email'}
                  iconPath={null}
                  type={'email'}
                />
                <TextAreaControlled
                  control={contactUsForm.control}
                  label={t('form.question')}
                  placeholder={t('form.questionPlaceholder')}
                  name={'question'}
                />
              </div>
              <div className={'xs:flex-col flex justify-between gap-4 md:flex-row'}>
                <span className={'text-secondary'}>{t('form.termAndPrivacy')}</span>
                <Button variant={'secondary'}>{t('form.send')}</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
