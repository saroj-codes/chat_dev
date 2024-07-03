import { initContract } from '@ts-rest/core';
import { AuthContract } from './auth/contract';
import { ChannelContract } from './channel/contract';
import { MessageContract } from './message/contract';

const c = initContract();

export const Contract = c.router({
  auth: AuthContract,
  channel: ChannelContract,
  message: MessageContract,
});
