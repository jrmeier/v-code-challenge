import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const get = async (url) => {
  const apiResponse = await axios({
    method: 'get',
    url: `${BASE_URL}${url}`,
  });

  if (apiResponse.status === 200 || apiResponse.status === 201) {
    return apiResponse?.data;
  }

  return {
    data: null,
    error: {
      statusTex: apiResponse.statusText,
      statusCode: apiResponse.status,
    },
  };
};

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
    error: {
      statusTex: apiResponse.statusText,
      statusCode: apiResponse.statusCode,
    },
  };
};

export const put = async (url, data) => {
  const apiResponse = await axios({
    method: 'put',
    url,
    data,
  });

  if (apiResponse.status === 200 || apiResponse === 201) {
    return apiResponse?.data;
  }

  return {
    error: {
      statusTex: apiResponse.statusText,
      statusCode: apiResponse.statusCode,
    },
  };
};

export const apiDelete = async (url) => {
  const apiResponse = await axios({
    method: 'delete',
    url,
  });

  if (apiResponse.status === 200 || apiResponse === 201) {
    return apiResponse?.data;
  }

  return {
    error: {
      statusTex: apiResponse.statusText,
      statusCode: apiResponse.statusCode,
    },
  };
};
