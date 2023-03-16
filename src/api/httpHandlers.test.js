import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';

import axios from 'axios';

vi.mock('axios');

describe('get', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });
  it('calls axios with the correct url', async () => {
    const url = 'https://example.com';

    await axios.get(url);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('returns the data from the response', async () => {
    const url = 'https://example.com';
    const data = { data: { id: 1, ownerId: 1 } };
    axios.get.mockResolvedValueOnce({ data });

    const response = await axios.get(url);

    expect(response).toEqual({ data });
  });

  it('returns an error object if the response is not 200 or 201', async () => {
    const url = 'Fake url';
    const error = { statusText: 'Not Found', status: 404 };

    try {
      const response = await axios.get(url);

      // expect(response).toEqual({ });
      expect(response).toBeUndefined();
    } catch (_) {
      expect(error).toEqual({
        data: null,
        error: {
          statusText: error.statusText,
          statusCode: error.status,
        },
      });
    }
  });
});
describe('post', () => {
  it('calls axios with the correct url', async () => {
    const url = 'https://example.com';
    const data = { data: { id: 1, ownerId: 1 } };

    await axios.post(url, data);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(url, data);
  });

  it('returns the data from the response', async () => {
    const url = 'https://example.com';
    const data = { data: { id: 1, ownerId: 1 } };
    axios.post.mockResolvedValue({ data });

    const response = await axios.post(url, data);

    expect(response).toEqual({ data });
  });

  it('returns an error object if the response is not 200 or 201', async () => {
    const url = 'https://example.com';
    const data = { data: { id: 1, ownerId: 1 } };
    const error = { statusText: 'Not Found', statusCode: 404 };
    axios.post.mockRejectedValue({ error });

    try {
      await axios.post(url, data);
    } catch (response) {
      expect(response).toEqual({
        error: {
          statusText: error.statusText,
          statusCode: error.statusCode,
        },
      });
    }
  });
});
