import { db } from '@./backend-db';
import { StatusCodes } from 'http-status-codes';
import { AppRouteImplementationOrOptions } from '@ts-rest/express/src/lib/types';
import { ChannelContract } from '@./contract';

const getChannel: AppRouteImplementationOrOptions<
  typeof ChannelContract.getChannel
> = async ({ params }) => {
  try {
    const userExist = await db.user.findFirst({
      where: {
        id: params.user_id,
      },
    });
    if (!userExist) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          message: 'User doesnot Exist',
          success: false,
        },
      };
    }
    const channel = await db.channel.findMany({
      where: {
        creator_Id: params.user_id,
      },
      include: {
        user: true,
      },
    });
    return {
      status: StatusCodes.OK,
      body: channel.map((c) => {
        return {
          id: c.id,
          name: c.name,
          isPublic: c.isPublic,
          created_at: c.created_at,
          max_number_of_participants: c.max_number_of_participants,
          creator: {
            id: c.user.id,
            user_name: c.user.user_name,
            email: c.user.email,
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

const getChannelById: AppRouteImplementationOrOptions<
  typeof ChannelContract.getChannelById
> = async ({ params }) => {
  try {
    const channelExist = await db.channel.findFirst({
      where: {
        id: params.channel_id,
      },
      include: {
        user: true,
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
    return {
      status: StatusCodes.OK,
      body: {
        id: channelExist.id,
        name: channelExist.name,
        isPublic: channelExist.isPublic,
        max_number_of_participants: channelExist.max_number_of_participants,
        created_at: channelExist.created_at,
        creator: {
          id: channelExist.user.id,
          email: channelExist.user.email,
          user_name: channelExist.user.user_name,
        },
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
const getPublicChannel: AppRouteImplementationOrOptions<
  typeof ChannelContract.getPublicChannel
> = async () => {
  try {
    const publicChannel = await db.channel.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: true,
      },
    });
    return {
      status: StatusCodes.OK,
      body: publicChannel.map((channel) => {
        return {
          id: channel.id,
          name: channel.name,
          isPublic: channel.isPublic,
          max_number_of_participants: channel.max_number_of_participants,
          created_at: channel.created_at,
          creator: {
            id: channel.user.id,
            email: channel.user.email,
            user_name: channel.user.user_name,
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

export const ChannelQueryHandler = {
  getChannel,
  getChannelById,
  getPublicChannel,
};
