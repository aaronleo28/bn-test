import {http, HttpResponse} from 'msw';

import {jobs} from '../data/jobs';
import {members} from '../data/members';
import {BRIGHT_NETWORK_API_URL} from '../../src/services/bright-network';

export const handlers = [
  http.get(`${BRIGHT_NETWORK_API_URL}/members.json`, () => {
    return HttpResponse.json(members);
  }),
  http.get(`${BRIGHT_NETWORK_API_URL}/jobs.json`, () => {
    return HttpResponse.json(jobs);
  }),
];
