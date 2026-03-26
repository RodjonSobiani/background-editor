'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@shared/providers/client/auth-provider';
import Loader from '@shared/components/loader';

interface IAuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: IAuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard;
