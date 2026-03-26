import { enqueueSnackbar } from 'notistack';

const infoEnqueueSnackbar = (title: string, message: string) => {
  enqueueSnackbar({ title, message, variant: 'info' });
};
const successEnqueueSnackbar = (title: string, message: string) => {
  enqueueSnackbar({ title, message, variant: 'success' });
};
const warningEnqueueSnackbar = (title: string, message: string) => {
  enqueueSnackbar({ title, message, variant: 'warning' });
};
const errorEnqueueSnackbar = (title: string, message: string) => {
  enqueueSnackbar({ title, message, variant: 'error' });
};

export { infoEnqueueSnackbar, successEnqueueSnackbar, warningEnqueueSnackbar, errorEnqueueSnackbar };
