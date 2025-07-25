import { AXIOS_TIME_OUT_ERROR_KEY, logAxiosResponse } from 'axios-curlirize';
import axios, { AxiosError } from 'axios';
import { CourseModel, TagModel } from 'src/api/models.ts';
import { collectUniqueTags } from 'src/utils/tags.utils.ts';

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
  fetchCourses = async (): Promise<
    | { type: 'error'; error: string }
    | { type: 'success'; tags: TagModel[]; courses: CourseModel[] }
  > => {
    const response = await axiosV1.get<CourseModel[]>('/courses.json');
    if (response instanceof AxiosError) {
      return { type: 'error', error: processApiError(response) };
    }
    return {
      type: 'success',
      tags: collectUniqueTags(response.data),
      courses: response.data,
    };
  };
}

export const api = new Api();
