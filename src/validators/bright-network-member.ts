import {z} from 'zod';

import {
  BrightNetworkMember,
  BrightNetworkMemberSchema,
} from '../types/BrightNetworkMember';
import {logger} from '../logger';

const GetBrightNetworkMembersResponseSchema = z.array(
  BrightNetworkMemberSchema,
);

export const validateGetBrightNetworkMembersResponse = (
  data: unknown,
): BrightNetworkMember[] => {
  const result = GetBrightNetworkMembersResponseSchema.safeParse(data);

  if (!result.success) {
    logger.error('Validation error', result.error);

    throw new Error('Validation of GetBrightNetworkMembersResponse failed');
  }

  return result.data;
};
