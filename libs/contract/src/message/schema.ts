import { ChannelSchema, MessageSchema, UserSchema } from '../__generated__';
import { z } from 'zod';

export const createMessageSchema = MessageSchema.pick({
  channel_id: true,
  sender_id: true,
  content: true,
});
export type TcreateMessageSchema = z.infer<typeof createMessageSchema>;

export const getAllMessageByChannelIdSchema = MessageSchema.pick({
  content: true,
  id: true,
  created_at: true,
  updated_at: true,
})
  .extend({
    channel: ChannelSchema.pick({
      id: true,
      name: true,
    }),
  })
  .extend({
    sender: UserSchema.pick({
      id: true,
      user_name: true,
    }),
  });

export type TgetAllMessageByChannelIdSchema = z.infer<
  typeof getAllMessageByChannelIdSchema
>;
