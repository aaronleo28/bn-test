import {fetchJsonData} from '.';
import {BrightNetworkJob} from '../types/BrightNetworkJob';
import {BrightNetworkMember} from '../types/BrightNetworkMember';
import {validateGetBrightNetworkJobsResponse} from '../validators/bright-network-job';
import {validateGetBrightNetworkMembersResponse} from '../validators/bright-network-member';

export const BRIGHT_NETWORK_API_URL = 'https://bn-hiring-challenge.fly.dev';

export const getBrightNetworkMembers = async (): Promise<
  BrightNetworkMember[]
> => {
  const data = await fetchJsonData(`${BRIGHT_NETWORK_API_URL}/members.json`);

  return validateGetBrightNetworkMembersResponse(data);
};

export const getBrightNetworkJobs = async (): Promise<BrightNetworkJob[]> => {
  const data = await fetchJsonData(`${BRIGHT_NETWORK_API_URL}/jobs.json`);

  return validateGetBrightNetworkJobsResponse(data);
};
