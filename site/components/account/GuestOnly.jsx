'use client';
import * as React from 'react';
import * as navigation from 'next/navigation';
import * as storage from '../../lib/storage';
export default function Default() {
  let e = navigation.useRouter();
  return (
    React.useEffect(() => {
      storage.getAuthToken() && e.replace('/');
    }, [e]),
    null
  );
}
