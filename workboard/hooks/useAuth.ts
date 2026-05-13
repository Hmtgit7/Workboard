'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import { API_ROUTES, APP_ROUTES } from '@/lib/constants';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(API_ROUTES.AUTH.ME);
      if (res.ok) {
        const { data } = await res.json();
        setState({ user: data, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch {
      setState({ user: null, loading: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    await fetch(API_ROUTES.AUTH.LOGOUT, { method: 'POST' });
    setState({ user: null, loading: false });
    router.push(APP_ROUTES.LOGIN);
    router.refresh();
  }, [router]);

  const refetch = useCallback(() => fetchUser(), [fetchUser]);

  return { ...state, logout, refetch };
}
