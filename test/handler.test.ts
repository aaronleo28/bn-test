import {http, HttpResponse} from 'msw';

import {handler} from '../src';
import {jobs} from './data/jobs';
import {members} from './data/members';
import {server} from './mocks/msw-server';
import {BRIGHT_NETWORK_API_URL} from '../src/services/bright-network';

describe('Job Recommendation Handler', () => {
  describe('Happy Path', () => {
    it('should create the expected recommendations', async () => {
      const expectedResult = [
        {
          member: members.find(m => m.name === 'Joe'),
          recommendedJobs: [{title: 'UX Designer', location: 'London'}],
        },
        {
          member: members.find(m => m.name === 'Marta'),
          recommendedJobs: [
            {title: 'Sales Internship', location: 'London'},
            {title: 'Legal Internship', location: 'London'},
            {title: 'Marketing Internship', location: 'York'},
          ],
        },
        {
          member: members.find(m => m.name === 'Hassan'),
          recommendedJobs: [{title: 'UX Designer', location: 'London'}],
        },
        {
          member: members.find(m => m.name === 'Grace'),
          recommendedJobs: [{title: 'Marketing Internship', location: 'York'}],
        },
        {
          member: members.find(m => m.name === 'Daisy'),
          recommendedJobs: [
            {title: 'Software Developer', location: 'Edinburgh'},
            {title: 'Software Developer', location: 'London'},
          ],
        },
      ];

      // Act
      const result = await handler();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Unhappy Path', () => {
    it('should throw an error if the members API fails', async () => {
      // Arrange
      server.use(
        http.get(`${BRIGHT_NETWORK_API_URL}/members.json`, () => {
          return HttpResponse.error();
        }),
      );

      // Act
      // Assert
      await expect(handler()).rejects.toThrow(
        'Failed to fetch JSON data from API',
      );
    });

    it('should throw an error if the jobs API fails', async () => {
      // Arrange
      server.use(
        http.get(`${BRIGHT_NETWORK_API_URL}/jobs.json`, () => {
          return HttpResponse.error();
        }),
      );

      // Act
      // Assert
      await expect(handler()).rejects.toThrow(
        'Failed to fetch JSON data from API',
      );
    });

    it('should throw an error if the members API returns an unexpected response', async () => {
      // Arrange
      server.use(
        http.get(`${BRIGHT_NETWORK_API_URL}/members.json`, () => {
          return HttpResponse.json(members.map(m => ({...m, name: undefined})));
        }),
      );

      // Act
      // Assert
      await expect(handler()).rejects.toThrow(
        new Error('Validation of GetBrightNetworkMembersResponse failed'),
      );
    });

    it('should throw an error if the jobs API returns an unexpected response', async () => {
      // Arrange
      server.use(
        http.get(`${BRIGHT_NETWORK_API_URL}/jobs.json`, () => {
          return HttpResponse.json(jobs.map(j => ({...j, title: undefined})));
        }),
      );

      // Act
      // Assert
      await expect(handler()).rejects.toThrow(
        new Error('Validation of GetBrightNetworkJobsResponse failed'),
      );
    });
  });
});
