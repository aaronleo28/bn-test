import {logger} from '../logger';

export const fetchJsonData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const responseBody = await response.text().catch(() => undefined);

      logger.error({
        status: response.status,
        statusText: response.statusText,
        responseBody,
        url,
      });

      throw new Error('Failed to fetch JSON data from API');
    }

    return response.json();
  } catch (error: any) {
    logger.error('Error fetching JSON data:', error);

    throw new Error('Failed to fetch JSON data from API');
  }
};
