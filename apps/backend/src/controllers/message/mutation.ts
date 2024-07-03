import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';
import { MessageContract } from '@./contract';
import { db } from '@./backend-db';
import { StatusCodes } from 'http-status-codes';

const createMessage: AppRouteImplementationOrOptions<
  typeof MessageContract.createMessage
> = async ({ body }) => {
  try {
    const channelExist = await db.channel.findFirst({
      where: {
        id: body.channel_id,
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
    await db.message.create({
      data: {
        content: body.content,
        channel_id: body.channel_id,
        sender_id: body.sender_id,
      },
    });
    return {
      status: StatusCodes.CREATED,
      body: {
        message: 'Message Created Successfully',
        success: true,
      },
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

export const MessageMutationHandler = {
  createMessage,
};
