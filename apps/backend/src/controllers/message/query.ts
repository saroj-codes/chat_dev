import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';
import { MessageContract } from '@./contract';
import { db } from '@./backend-db';
import { StatusCodes } from 'http-status-codes';

const getAllMessageByChannelId: AppRouteImplementationOrOptions<
  typeof MessageContract.getAllMessageByChannelId
> = async ({ params }) => {
  try {
    const channelExist = await db.channel.findFirst({
      where: {
        id: params.channel_id,
      },
    });
    if (!channelExist) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          message: 'Channel Doesnot Exist',
          success: false,
        },
      };
    }
    const message = await db.message.findMany({
      where: {
        channel_id: params.channel_id,
      },
      include: {
        user: true,
        channel: true,
      },
    });

    return {
      status: StatusCodes.OK,
      body: message.map((msg) => {
        return {
          id: msg.id,
          content: msg.content,
          created_at: msg.created_at,
          updated_at: msg.updated_at,
          channel: {
            id: msg.channel.id,
            name: msg.channel.name,
          },
          sender: {
            id: msg.user.id,
            user_name: msg.user.user_name,
          },
        };
      }),
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        message: error.message || 'Internal Server Error',
        success: false,
      },
    };
  }
};

export const MessageQueryHandler = {
  getAllMessageByChannelId,
};
