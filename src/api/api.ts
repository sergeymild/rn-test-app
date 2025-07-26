import { AXIOS_TIME_OUT_ERROR_KEY, logAxiosResponse } from 'axios-curlirize';
import axios, { AxiosError } from 'axios';
import { CourseModel } from 'src/api/models.ts';

const TIMEOUT = 15000;
export const axiosV1 = axios.create({
  baseURL: 'https://logiclike.com/docs',
  timeout: TIMEOUT,
  timeoutErrorMessage: AXIOS_TIME_OUT_ERROR_KEY,
});
logAxiosResponse({ axiosInstance: axiosV1 });

export function processApiError(error: AxiosError) {
  // todo process errors
  return error.toString();
}

class Api {
  fetchCourses = async () => {
    return await axiosV1.get<CourseModel[]>('/courses.json');
  };
}

export const api = new Api();
