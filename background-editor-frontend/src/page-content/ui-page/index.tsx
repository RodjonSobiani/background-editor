'use client';

import React, { useEffect, useMemo } from 'react';
import { FileUploader } from '@shared/components/file-uploader';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useModals } from '@shared/providers/client/modal-provider';
import { Button } from '@shared/components/buttons';
import { EModalKeys } from '@shared/utils/enums';
import { Tooltip } from '@shared/components/tooltip';
import {
  errorEnqueueSnackbar,
  infoEnqueueSnackbar,
  successEnqueueSnackbar,
  warningEnqueueSnackbar
} from '@shared/utils';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';
import { TextAreaControlled } from '@shared/components/inputs/textarea-controlled';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

const UIPageContent: React.FC = () => {
  const t = useTranslations('header');
  const { openModal } = useModals();

  const fileBlob = useMemo(() => {
    return Array(1000)
      .fill(null)
      .map((_, i) => i.toString());
  }, []);

  const file = new File(fileBlob, 'temp', { type: 'image/png' });
  const form = useForm<{
    default?: File[];
    ready?: File[];
    error?: File[];
    disabled?: File[];
  }>({
    defaultValues: {
      ready: [file],
      disabled: [file]
    }
  });

  useEffect(() => {
    form.setError('error', { message: 'error' });
  });

  return (
    <>
      <div className={'font-furore text-[56px] leading-[62px] font-normal'}>FURORE</div>
      <h1 className="h1-furore">Заголовок H1</h1>
      <h2 className="h2-furore">Заголовок H2</h2>
      <h3 className="h3-furore">Заголовок H3</h3>
      <h3 className="h4-furore">Заголовок H4</h3>
      <br />
      <hr />
      <br />
      <div className={'font-golos text-[56px] leading-[62px] font-bold'}>Golos text</div>
      <h1 className="h1-golos-medium">Заголовок H1</h1>
      <h2 className="h2-golos-medium">Заголовок H2</h2>
      <h3 className="h3-golos-regular">Заголовок H3</h3>
      <div className="body-18px-golos-medium">Body-18px-Medium</div>
      <div className="body-14px-golos-regular">Body-14px-Regular</div>
      <div className="body-12px-golos-medium">Body-12px-Medium</div>
      <div className="body-10px-golos-regular">Body-10px-Regular</div>
      <br />
      <hr />
      <br />
      <div className={'flex flex-wrap gap-4'}>
        <Button variant={'primary'}>Primary</Button>
        <Button variant={'secondary'}>Secondary</Button>
        <Button variant={'outlined'}>Outlined</Button>
        <Button variant={'tertiary'}>Tertiary</Button>
        <Button variant={'disabled'}>Disabled variant</Button>
        <Button disabled>Disabled true</Button>
      </div>

      <br />
      <hr />
      <br />

      <div className={'w-full border p-4'}>
        <h1 className="h3-furore">Modals</h1>
        <hr />
        <br />
        <div className={'flex flex-row gap-4'}>
          <Button onClick={() => openModal(EModalKeys.MODAL_REGISTER)}>{t('buttons.register')}</Button>
          <Button variant="secondary" onClick={() => openModal(EModalKeys.MODAL_LOGIN)}>
            {t('buttons.login')}
          </Button>
        </div>
      </div>
      <br />
      <hr />
      <br />

      <div className={'w-full border p-4'}>
        <h1 className="h3-furore">Text Fields</h1>
        <hr />
        <br />
        <div className={'grid grid-cols-4 gap-4'}>
          <TextFieldControlled control={form.control} label={'Default'} name={'default'} />
          <TextFieldControlled control={form.control} label={'Disabled'} name={'disabled'} disabled />
          <TextFieldControlled control={form.control} label={'Error'} name={'error'} />
          <TextFieldControlled control={form.control} label={'Password'} name={'default.1'} type={'password'} />
          <div className={'col-span-full grid'}>
            <div className={'grid grid-cols-3 gap-4'}>
              <TextAreaControlled control={form.control} label={'Default'} name={'default'} />
              <TextAreaControlled control={form.control} label={'Disabled'} name={'disabled'} disabled />
              <TextAreaControlled control={form.control} label={'Error'} name={'error'} />
            </div>
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />
      <div className={'w-full border p-4'}>
        <h1 className="h3-furore">Tooltips</h1>
        <hr />
        <br />
        <div className={'flex flex-row flex-wrap gap-4'}>
          <Tooltip content={t('tooltip.zoomIn')} position={'bottomCenter'}>
            <Button variant={'secondary'} className={'p-3'}>
              <Icon path={mdiPlus} size={'16px'} />
            </Button>
          </Tooltip>
          <Tooltip content={'Top Click'} showType={'click'}>
            <Button variant={'primary'}>Top Click</Button>
          </Tooltip>
          <Tooltip content={'Top Left'} position={'topLeft'}>
            <Button variant={'primary'}>Top Left</Button>
          </Tooltip>
          <Tooltip content={'Top Center'} position={'topCenter'}>
            <Button variant={'primary'}>Top Center</Button>
          </Tooltip>
          <Tooltip content={'Top Right'} position={'topRight'}>
            <Button variant={'primary'}>Top Right</Button>
          </Tooltip>
          <Tooltip content={'Right Top'} position={'rightTop'}>
            <Button variant={'primary'}>Right Top</Button>
          </Tooltip>
          <Tooltip content={'Right Center'} position={'rightCenter'}>
            <Button variant={'primary'}>Right Center</Button>
          </Tooltip>
          <Tooltip content={'Right Bottom'} position={'rightBottom'}>
            <Button variant={'primary'}>Right Bottom</Button>
          </Tooltip>
          <Tooltip content={'Bottom Right'} position={'bottomRight'}>
            <Button variant={'primary'}>Bottom Right</Button>
          </Tooltip>
          <Tooltip content={'Bottom Center'} position={'bottomCenter'}>
            <Button variant={'primary'}>Bottom Center</Button>
          </Tooltip>
          <Tooltip content={'Bottom Left'} position={'bottomLeft'}>
            <Button variant={'primary'}>Bottom Left</Button>
          </Tooltip>
          <Tooltip content={'Left Bottom'} position={'leftBottom'}>
            <Button variant={'primary'}>Left Bottom</Button>
          </Tooltip>
          <Tooltip content={'Left Center'} position={'leftCenter'}>
            <Button variant={'primary'}>Left Center</Button>
          </Tooltip>
          <Tooltip content={'Left Top'} position={'leftTop'}>
            <Button variant={'primary'}>Left Top</Button>
          </Tooltip>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className={'w-full border p-4'}>
        <h1 className="h3-furore">Alerts</h1>
        <hr />
        <br />
        <div className={'flex flex-row gap-4'}>
          <Button
            variant={'primary'}
            className={'bg-secondary'}
            onClick={() => infoEnqueueSnackbar('Info title', 'info-enqueue')}>
            Info
          </Button>
          <Button
            variant={'primary'}
            className={'bg-success'}
            onClick={() => successEnqueueSnackbar('Success title', 'success-enqueue')}>
            Success
          </Button>
          <Button
            variant={'primary'}
            className={'bg-warning'}
            onClick={() => warningEnqueueSnackbar('Warning title', 'warning-enqueue')}>
            Warning
          </Button>
          <Button
            variant={'primary'}
            className={'bg-error'}
            onClick={() => errorEnqueueSnackbar('Error title', 'error-enqueue')}>
            Error
          </Button>
        </div>
      </div>
      <div className={'w-full border p-4'}>
        <h1 className="h3-furore">File uploader</h1>
        <hr />
        <br />
        <div className={'flex flex-col gap-4'}>
          <FileUploader control={form.control} name={'default'} />
          {/*<FileUploader name={'ready'} />*/}
          <FileUploader control={form.control} name={'error'} />
          {/*<FileUploader name={'disabled'} disabled />*/}
        </div>
      </div>
    </>
  );
};

export default UIPageContent;
