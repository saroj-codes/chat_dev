import { db } from '@./backend-db';
import { StatusCodes } from 'http-status-codes';
import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';
import { ChannelContract } from '@./contract';

const createChannel: AppRouteImplementationOrOptions<
  typeof ChannelContract.createChannel
> = async ({ body }) => {
  try {
    // const channelExist = await db.channel.findFirst({
    //   where: {
    //     name: body.name,
    //   },
    // });
    // if (!channelExist) {
    //   return {
    //     status: StatusCodes.NOT_FOUND,
    //     body: {
    //       message: 'Channel Already Exist',
    //       success: false,
    //     },
    //   };
    // }
    await db.channel.create({
      data: {
        name: body.name,
        max_number_of_participants: body.max_number_of_participants,
        isPublic: body.isPublic,
        creator_Id: body.creator_Id,
      },
    });
    return {
      status: StatusCodes.CREATED,
      body: {
        message: 'Channel Created Successfully',
        success: true,
      },
    };
  } catch (error) {
    console.log('error', error.message);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        message: error.message || 'Internal Server Error',
        success: false,
      },
    };
  }
};

export const ChannelMutationHandler = {
  createChannel,
};
