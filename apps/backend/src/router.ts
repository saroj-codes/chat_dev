import { initServer } from '@ts-rest/express';
import { AuthRouter } from './controllers/auth/router';
import { Contract } from '@./contract';
import { ChannelRouter } from './controllers/channel/router';
import { MessageRouter } from './controllers/message/router';

const s = initServer();

export const Router = s.router(Contract, {
  auth: AuthRouter,
  channel: ChannelRouter,
  message: MessageRouter,
});
