import { ChannelContract } from '@./contract';
import { initServer } from '@ts-rest/express';
import { ChannelMutationHandler } from './mutation';
import { ChannelQueryHandler } from './query';
import { VerifyAccessToken } from '../../middlewares/token';

const s = initServer();

export const ChannelRouter = s.router(ChannelContract, {
  createChannel: {
    middleware: [VerifyAccessToken],
    handler: ChannelMutationHandler.createChannel,
  },
  getChannel: {
    middleware: [VerifyAccessToken],
    handler: ChannelQueryHandler.getChannel,
  },
  getChannelById: {
    middleware: [VerifyAccessToken],
    handler: ChannelQueryHandler.getChannelById,
  },
  getPublicChannel: {
    middleware: [VerifyAccessToken],
    handler: ChannelQueryHandler.getPublicChannel,
  },
});
