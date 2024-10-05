'use client';

import { redirect } from 'next/navigation';
import { api } from './query-provider';

export default function Index() {
  const { data, isFetched } = api.auth.verifyUser.useQuery(['verifyUser']);
  if (data?.status === 200) {
    return redirect('/chat');
  }
  console.log('isFetched', isFetched);
  if (isFetched) {
    return redirect('/auth/login');
  }
}
