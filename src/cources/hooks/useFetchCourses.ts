import { CourseModel, TagModel } from 'src/api/models.ts';
import { useEffect, useState } from 'react';
import { api, processApiError } from 'src/api/api.ts';
import { AxiosError } from 'axios';
import { collectUniqueTags } from 'src/utils/tags.utils.ts';

type CoursesState =
  | { type: 'error'; error: string }
  | { type: 'loading' }
  | { type: 'success'; tags: TagModel[]; courses: CourseModel[] };

export function useFetchCourses(): CoursesState {
  const [state, setState] = useState<CoursesState>({ type: 'loading' });

  useEffect(() => {
    api.fetchCourses().then(response => {
      if (response instanceof AxiosError) {
        return setState({ type: 'error', error: processApiError(response) });
      }
      setState({
        type: 'success',
        tags: collectUniqueTags(response.data),
        courses: response.data,
      });
    });
  }, []);

  return state;
}
