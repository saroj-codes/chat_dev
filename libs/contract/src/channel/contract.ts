import { initContract } from '@ts-rest/core';
import { ErrorSchema, SuccessSchema } from '../auth/schema';
import {
  CreateChannelSchema,
  GetChannelByIdSchema,
  GetChannelSchema,
  GetPublicChannelSchema,
} from './schema';
import { z } from 'zod';

const c = initContract();

export const ChannelContract = c.router({
  createChannel: {
    method: 'POST',
    path: '/channel/createChannel',
    responses: {
      201: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    body: CreateChannelSchema,
    summary: 'This API is used to create a Channel',
  },
  getChannel: {
    method: 'GET',
    path: '/channel/getChannel/:user_id',
    responses: {
      200: z.array(GetChannelSchema),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to get the Details of Channel',
  },
  getChannelById: {
    method: 'GET',
    path: '/channel/getChannelById/:channel_id',
    responses: {
      200: GetChannelByIdSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to get the Details of Channel  by Channel Id',
  },
  getPublicChannel: {
    method: 'GET',
    path: '/channel/getPublicChannel',
    responses: {
      200: z.array(GetPublicChannelSchema),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'This API is used to get the public channel',
  },
});
