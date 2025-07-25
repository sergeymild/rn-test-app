import { CourseModel, TagModel } from 'src/api/models.ts';

export function collectUniqueTags(courses: CourseModel[]): TagModel[] {
  const allTags = courses.flatMap(course => course.tags);
  return Array.from(new Set(allTags));
}

export function filterCoursesByTag(
  courses: CourseModel[],
  tag: TagModel,
): CourseModel[] {
  return courses.filter(course => course.tags.includes(tag));
}
