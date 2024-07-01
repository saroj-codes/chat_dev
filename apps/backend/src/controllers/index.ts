import { initServer } from '@ts-rest/express';
import { AuthController } from './authController';
import { Contract } from '@./contract';
// import { ChannelController } from './channelController';
const c = initServer();

export const Controller = c.router(Contract, {
  auth: AuthController,
  // channel: ChannelController,
});
