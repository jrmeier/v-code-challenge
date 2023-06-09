import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = process.env.BASE_API_URL || 'http://localhost:5000/api';

export async function get(url) {
  let returnObj = { msg: 'call failed' };
  try {
    const apiResponse = await axios({
      method: 'get',
      url: `${BASE_URL}${url}`,
    });

    if (apiResponse.status === 200 || apiResponse.status === 201) {
      returnObj = apiResponse?.data;
    }
  } catch (error) {
    returnObj = {
      data: null,
      error: {
        statusText: error.statusText,
        statusCode: error.status,
      },
    };
  }

  return returnObj;
}

export const post = async (url, data) => {
  const apiResponse = await axios({
    method: 'post',
    url: `${BASE_URL}${url}`,
    data,
  });

  if (apiResponse.status === 200 || apiResponse === 201) {
    return apiResponse?.data;
  }

  return {
    data: null,
    error: {
      statusText: apiResponse.statusText,
      statusCode: apiResponse.statusCode,
    },
  };
};

export const put = async (url, data) => {
  try {
    const apiResponse = await axios({
      method: 'put',
      url,
      data,
    });

    if (apiResponse.status === 200 || apiResponse === 201) {
      return apiResponse?.data;
    }
  } catch (error) {
    return {
      data: null,
      error: {
        statusText: error.statusText,
        statusCode: error.statusCode,
      },
    };
  }

  return {};
};

export const apiDelete = async (url) => {
  try {
    const apiResponse = await axios({
      method: 'delete',
      url,
    });

    if (apiResponse.status === 200 || apiResponse === 201) {
      return apiResponse?.data;
    }
  } catch (error) {
    return {
      data: null,
      error: {
        statusTex: error.statusText,
        statusCode: error.statusCode,
      },
    };
  }
  return {};
};
