import { MessageContract } from '@./contract';
import { initServer } from '@ts-rest/express';
import { MessageMutationHandler } from './mutation';
import { MessageQueryHandler } from './query';
import { VerifyAccessToken } from '../../middlewares/token';

const s = initServer();

export const MessageRouter = s.router(MessageContract, {
  createMessage: {
    middleware: [VerifyAccessToken],
    handler: MessageMutationHandler.createMessage,
  },
  getAllMessageByChannelId: {
    middleware: [VerifyAccessToken],
    handler: MessageQueryHandler.getAllMessageByChannelId,
  },
});
