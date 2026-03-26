'use client';

import React, { ReactNode } from 'react';
import { QueryProvider } from '@shared/providers/client/query-provider';
import { AuthProvider } from '@shared/providers/client/auth-provider';
import { ModalProvider } from '@shared/providers/client/modal-provider';
import { SnackBarProvider } from '@shared/providers/client/snackbar-provider';

export default function Providers({ children, initialAuthState }: { children: ReactNode; initialAuthState: boolean }) {
  return (
    <QueryProvider>
      <AuthProvider initialAuthState={initialAuthState}>
        <SnackBarProvider>
          <ModalProvider>{children}</ModalProvider>
        </SnackBarProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
