import {setupServer} from 'msw/node';

import {handlers} from './http-handlers';

export const server = setupServer(...handlers);
