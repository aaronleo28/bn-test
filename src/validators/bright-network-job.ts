import {z} from 'zod';

import {
  BrightNetworkJob,
  BrightNetworkJobSchema,
} from '../types/BrightNetworkJob';
import {logger} from '../logger';

const GetBrightNetworkJobsResponseSchema = z.array(BrightNetworkJobSchema);

export const validateGetBrightNetworkJobsResponse = (
  data: unknown,
): BrightNetworkJob[] => {
  const result = GetBrightNetworkJobsResponseSchema.safeParse(data);

  if (!result.success) {
    logger.error('Validation error', result.error);

    throw new Error('Validation of GetBrightNetworkJobsResponse failed');
  }

  return result.data;
};
