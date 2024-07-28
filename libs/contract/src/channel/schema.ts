import { ChannelSchema, UserSchema } from '../__generated__';
import { z } from 'zod';

export const CreateChannelSchema = ChannelSchema.pick({
  name: true,
  isPublic: true,
  max_number_of_participants: true,
  creator_Id: true,
});
export type TCreateChannelSchema = z.infer<typeof CreateChannelSchema>;

export const GetChannelSchema = ChannelSchema.pick({
  id: true,
  name: true,
  isPublic: true,
  max_number_of_participants: true,
  created_at: true,
}).extend({
  creator: UserSchema.pick({
    id: true,
    user_name: true,
    email: true,
  }),
});

export type TGetChannelSchema = z.infer<typeof GetChannelSchema>;

export const GetChannelByIdSchema = ChannelSchema.pick({
  id: true,
  name: true,
  isPublic: true,
  max_number_of_participants: true,
  creator_Id: true,
  created_at: true,
}).extend({
  creator: UserSchema.pick({
    id: true,
    user_name: true,
    email: true,
  }),
});
export type TGetChannelByIdSchema = z.infer<typeof GetChannelByIdSchema>;

export const GetPublicChannelSchema = ChannelSchema.pick({
  id: true,
  name: true,
  isPublic: true,
  max_number_of_participants: true,
  creator_Id: true,
  created_at: true,
}).extend({
  creator: UserSchema.pick({
    id: true,
    user_name: true,
    email: true,
  }),
});
export type TGetPublicChannelSchema = z.infer<typeof GetPublicChannelSchema>;
