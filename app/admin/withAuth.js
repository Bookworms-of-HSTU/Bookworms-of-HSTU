'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/admin/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // Or a spinner component
    }

    if (!user) {
      return null; // Don't render the component if not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
