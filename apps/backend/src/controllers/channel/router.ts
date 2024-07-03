import { ChannelContract } from '@./contract';
import { initServer } from '@ts-rest/express';
import { ChannelMutationHandler } from './mutation';
import { ChannelQueryHandler } from './query';

const s = initServer();

export const ChannelRouter = s.router(ChannelContract, {
  createChannel: {
    middleware: [],
    handler: ChannelMutationHandler.createChannel,
  },
  getChannel: {
    middleware: [],
    handler: ChannelQueryHandler.getChannel,
  },
  getChannelById: {
    middleware: [],
    handler: ChannelQueryHandler.getChannelById,
  },
  getPublicChannel: {
    middleware: [],
    handler: ChannelQueryHandler.getPublicChannel,
  },
});
