import { SnackbarProviderProps } from 'notistack';
import Icon from '@mdi/react';
import { mdiAlertCircle, mdiCheckboxMarkedCircle, mdiCloseCircle, mdiInformation } from '@mdi/js';
import { SnackbarComponentBase } from '@shared/utils/snackbar';

const SNACKBAR_CONFIG: SnackbarProviderProps = {
  maxSnack: 4,
  Components: {
    info: SnackbarComponentBase,
    success: SnackbarComponentBase,
    warning: SnackbarComponentBase,
    error: SnackbarComponentBase
  },
  iconVariant: {
    info: <Icon path={mdiInformation} size={'24px'} className={'text-secondary'} />,
    success: <Icon path={mdiCheckboxMarkedCircle} size={'24px'} className={'text-success'} />,
    warning: <Icon path={mdiAlertCircle} size={'24px'} className={'text-warning'} />,
    error: <Icon path={mdiCloseCircle} size={'24px'} className={'text-error'} />
  },
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right'
  }
};

export { SNACKBAR_CONFIG };
