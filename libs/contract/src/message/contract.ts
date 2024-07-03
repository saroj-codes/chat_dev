import { initContract } from '@ts-rest/core';
import { ErrorSchema, SuccessSchema } from '../auth/schema';
import { createMessageSchema, getAllMessageByChannelIdSchema } from './schema';
import { z } from 'zod';

const c = initContract();

export const MessageContract = c.router({
  createMessage: {
    method: 'POST',
    path: '/createMessage',
    responses: {
      201: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    body: createMessageSchema,
    summary: 'This is an API to create Message',
  },
  getAllMessageByChannelId: {
    method: 'GET',
    path: '/getAllMessage/:channel_id',
    responses: {
      200: z.array(getAllMessageByChannelIdSchema),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to get All Messages',
  },
});
