import Fuse from 'fuse.js';

import {BrightNetworkJob} from './types/BrightNetworkJob';
import {BrightNetworkMember} from './types/BrightNetworkMember';

type JobWithBestScore = {
  job: BrightNetworkJob;
  bestResultScore: number;
};

const searchForBestResult =
  (fuse: Fuse<string>, jobKey: keyof BrightNetworkJob) =>
  (job: BrightNetworkJob): JobWithBestScore | undefined => {
    const [result] = fuse.search(job[jobKey]);

    return typeof result?.score === 'number'
      ? {
          job,
          bestResultScore: result.score,
        }
      : undefined;
  };

export const getRecommendedJobs = (
  member: BrightNetworkMember,
  jobs: BrightNetworkJob[],
): BrightNetworkJob[] => {
  const splitBio = member.bio.split(' ');

  const bioFuse = new Fuse(splitBio, {
    includeScore: true,
    ignoreLocation: true,
  });

  const jobTitleResults = jobs
    .map(searchForBestResult(bioFuse, 'title'))
    .filter(Boolean) as JobWithBestScore[];

  const eligibleJobs = jobTitleResults.map(({job}) => job);

  const jobLocationResults = eligibleJobs
    .map(searchForBestResult(bioFuse, 'location'))
    .filter(Boolean) as JobWithBestScore[];

  // a lower score is better
  return jobLocationResults
    .sort((a, b) => (a.bestResultScore > b.bestResultScore ? 1 : -1))
    .map(({job}) => job);
};
