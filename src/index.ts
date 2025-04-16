import {logger} from './logger';
import {
  getBrightNetworkJobs,
  getBrightNetworkMembers,
} from './services/bright-network';
import {getRecommendedJobs} from './recommend';

export const handler = async () => {
  const [members, jobs] = await Promise.all([
    getBrightNetworkMembers(),
    getBrightNetworkJobs(),
  ]);

  return members.map(member => ({
    member,
    recommendedJobs: getRecommendedJobs(member, jobs),
  }));
};

const main = async () => {
  const recommendations = await handler();

  for (const {member, recommendedJobs} of recommendations) {
    logger.log(member.name, recommendedJobs, '\n');
  }
};

if (process.env.NODE_ENV !== 'test') {
  void main();
}
