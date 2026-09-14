'use client';
import * as React from 'react';
import * as navigation from 'next/navigation';
import { useSelector } from 'react-redux';
import * as storage from '../../lib/storage';
import * as userSlice from '../../store/userSlice';
export default function Default() {
  let e = navigation.useRouter(),
    l = useSelector(userSlice.selectProfileStatus);
  return (
    React.useEffect(() => {
      'failed' === l
        ? e.replace('/account/login/?reason=session_expired')
        : storage.getAuthToken() || e.replace('/account/login/');
    }, [e, l]),
    null
  );
}
