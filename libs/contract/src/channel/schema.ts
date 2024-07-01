import { ChannelSchema } from '@./backend-db';

export const CreateChannelSchema = ChannelSchema.pick({
  id: true,
  name: true,
  isPublic: true,
  max_number_of_participants: true,
  creator: true,
});
