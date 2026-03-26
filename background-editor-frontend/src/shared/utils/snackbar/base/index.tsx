import React, { forwardRef, Ref, useMemo } from 'react';
import { closeSnackbar, CustomContentProps, SnackbarContent } from 'notistack';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

const SnackbarComponentBase = forwardRef(
  ({ iconVariant, variant, id, message, title }: CustomContentProps, ref: Ref<HTMLDivElement>) => {
    const colorClass = useMemo(() => {
      switch (variant) {
        case 'success':
          return 'border-success';
        case 'warning':
          return 'border-warning';
        case 'error':
          return 'border-error';
        case 'info':
        default:
          return 'border-secondary';
      }
    }, [variant]);

    const handleClose = () => closeSnackbar(id);

    return (
      <SnackbarContent className="rounded bg-white py-2.5 pr-6 pl-3 shadow-md" ref={ref}>
        <div className="flex min-w-[300px]">
          <div className={`border-l-2 p-3.5 ${colorClass}`}>{iconVariant[variant]}</div>
          <div className={'flex flex-col justify-center gap-1'}>
            <p className={'body-18px-golos-medium'}>{title}</p>
            <span className={'body-14px-golos-regular'}>{message}</span>
          </div>
          <button type="button" onClick={handleClose} className={'ml-auto cursor-pointer'}>
            <Icon path={mdiClose} size={'24px'} className={'text-secondary'} />
          </button>
        </div>
      </SnackbarContent>
    );
  }
);

SnackbarComponentBase.displayName = 'SnackbarComponentBase';

export { SnackbarComponentBase };
