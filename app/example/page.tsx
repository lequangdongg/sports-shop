'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import Spinner from '@/app/components/Spinner';
import Form from '../components/Form';

const example = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <Spinner isModal />;
  }

  if (user) {
    return <Form />;
  }

  return <div>No content</div>;
};

export default example;
