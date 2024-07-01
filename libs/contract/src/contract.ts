import { initContract } from '@ts-rest/core';
import { AuthContract } from './auth/contract';
import { ChannelContract } from './channel/contract';

const c = initContract();

export const Contract = c.router({
  auth: AuthContract,
  // channel: ChannelContract,
});
