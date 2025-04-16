import {z} from 'zod';

export const BrightNetworkMemberSchema = z.object({
  name: z.string(),
  bio: z.string(),
});

export type BrightNetworkMember = z.infer<typeof BrightNetworkMemberSchema>;
