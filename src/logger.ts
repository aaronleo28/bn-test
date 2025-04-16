/* eslint-disable @typescript-eslint/no-explicit-any */
const isTestEnv = process.env.NODE_ENV === 'test';

export const logger = {
  log: (...args: any[]) => {
    if (!isTestEnv) {
      console.log(...args);
    }
  },
  info: (...args: any[]) => {
    if (!isTestEnv) {
      console.info(...args);
    }
  },
  warn: (...args: any[]) => {
    if (!isTestEnv) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    if (!isTestEnv) {
      console.error(...args);
    }
  },
};
