import { ComponentType, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../context/auth-context';
import AuthContextType from '../models/authContext';

export const ProtectedRoute = (WrappedComponent: ComponentType) => {
  return (props: any) => {
    const { token } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    if (token) {
      return <WrappedComponent {...props} />;
    }

    if (typeof window === 'undefined') return null;
    router.replace('/');
  };
};

export const SignedInProtectedRoute = (WrappedComponent: ComponentType) => {
  return (props: any) => {
    const { token } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    if (!token) {
      return <WrappedComponent {...props} />;
    }
    if (typeof window === 'undefined') return null;
    router.replace('/tasks');
  };
};
