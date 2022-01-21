/* eslint-disable no-param-reassign */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

function requestInterceptor(config: AxiosRequestConfig) {
  if (config.url === `http://localhost:3000/sessions/refresh-token`) {
    config.headers = {
      ...config.headers,
    };
  } else {
    const token = localStorage.getItem('@stagefy:token');
    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
  }
  return config;
}

function requestInterceptorError(error: AxiosError) {
  return Promise.reject(error);
}

function responseInterceptor(response: AxiosResponse) {
  // console.info('Response Interceptor')
  // console.log(response)
  return response;
}

async function responseInterceptorError(error: AxiosError) {
  return Promise.reject(error);
}

export {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError,
};
