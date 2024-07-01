import { initContract } from '@ts-rest/core';
import { ErrorSchema, SuccessSchema } from '../auth/schema';
import { CreateChannelSchema } from './schema';

const c = initContract();

export const ChannelContract = c.router({
  createChannel: {
    method: 'POST',
    path: '/createChannel',
    responses: {
      201: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    body: CreateChannelSchema,
    summary: 'This API is used to create a channel',
  },
});
