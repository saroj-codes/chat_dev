import { MessageContract } from '@./contract';
import { initServer } from '@ts-rest/express';
import { MessageMutationHandler } from './mutation';
import { MessageQueryHandler } from './query';

const s = initServer();

export const MessageRouter = s.router(MessageContract, {
  createMessage: {
    middleware: [],
    handler: MessageMutationHandler.createMessage,
  },
  getAllMessageByChannelId: {
    middleware: [],
    handler: MessageQueryHandler.getAllMessageByChannelId,
  },
});
