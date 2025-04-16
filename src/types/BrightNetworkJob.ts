import {z} from 'zod';

export const BrightNetworkJobSchema = z.object({
  title: z.string(),
  location: z.string(),
});

export type BrightNetworkJob = z.infer<typeof BrightNetworkJobSchema>;
