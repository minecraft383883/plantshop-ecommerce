'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export function useAuth(requiredRole = null) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (requiredRole && user?.rol !== requiredRole) {
      router.push('/');
    }
  }, [isAuthenticated, user, requiredRole, router]);

  return { user, isAuthenticated };
}
