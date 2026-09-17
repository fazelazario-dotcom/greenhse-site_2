'use client';
import { useSelector } from 'react-redux';
import * as userSlice from '../store/userSlice';
export default function Default() {
  let e = useSelector(userSlice.selectUser),
    t = useSelector(userSlice.selectProfileStatus),
    i = useSelector(userSlice.selectProfileError);
  return {
    profile: e,
    loading: 'idle' === t || 'loading' === t,
    error: 'failed' === t ? i : '',
  };
}
