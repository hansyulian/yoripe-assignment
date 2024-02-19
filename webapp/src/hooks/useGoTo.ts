import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const navigations = {
  login: {
    path: '/auth/login',
  },
  register: {
    path: '/auth/register',
  },
  task: {
    path: '/',
  }
}

export type NavigationTarget = keyof typeof navigations;

export function useGoTo() {
  const navigate = useNavigate();

  return useCallback(<NT extends NavigationTarget>(target: NT) => {
    navigate(navigations[target].path)
  }, [navigate])
}