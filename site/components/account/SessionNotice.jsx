'use client';
import * as navigation from 'next/navigation';
export default function Default() {
  return 'session_expired' !== navigation.useSearchParams().get('reason') ? null : (
    <div className="acc__notice" role="alert">
      Your session has expired. Please log in again.
    </div>
  );
}
