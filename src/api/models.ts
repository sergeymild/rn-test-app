export type TagModel = string;

export type CourseModel = {
  name: string;
  id: string;
  image: string;
  bgColor: string;
  tags: TagModel[];
};
