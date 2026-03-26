import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { SNACKBAR_CONFIG } from '@shared/const/snackbar';

declare module 'notistack' {
  interface OptionsObject {
    title: string;
  }
}
export const SnackBarProvider = ({ children }: { children: ReactNode }) => {
  return <SnackbarProvider {...SNACKBAR_CONFIG}>{children}</SnackbarProvider>;
};
