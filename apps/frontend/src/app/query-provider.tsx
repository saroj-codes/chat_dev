'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import { Contract } from '@./contract';

export const api = initQueryClient(Contract, {
  baseUrl: 'http://localhost:8080',

  baseHeaders: {},
});
const qc = new QueryClient();
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};
