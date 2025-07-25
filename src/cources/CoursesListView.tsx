import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from 'src/theme.ts';
import { LoaderView } from 'src/compontntes/LoaderView.tsx';
import { api } from 'src/api/api.ts';
import { ErrorView } from 'src/compontntes/ErrorView.tsx';
import { CourseModel, TagModel } from 'src/api/models.ts';
import { CourseListItem } from 'src/cources/CourseListItem.tsx';
import { CoursesTagSelectButton } from 'src/cources/CoursesTagSelectButton.tsx';
import { filterCoursesByTag } from 'src/utils/tags.utils.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CoursesListView: React.FC = memo(() => {
  const safe = useSafeAreaInsets();
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | undefined>();
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const originalCourses = useRef<CourseModel[]>([]);
  const tags = useRef<TagModel[]>([]);

  useEffect(() => {
    api
      .fetchCourses()
      .then(response => {
        if (response.type === 'error') {
          return setErrors(response.error);
        }
        originalCourses.current = response.courses;
        tags.current = response.tags;
        setCourses(response.courses);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSelect = useCallback((index: number) => {
    const tag = tags.current[index];
    setCourses(filterCoursesByTag(originalCourses.current, tag));
  }, []);

  let paddingLeft = safe.left || 24;
  let paddingRight = safe.right || 24;

  return (
    <View style={styles.base}>
      {isLoading && !errors && <LoaderView />}
      {!!errors && <ErrorView errors={errors} />}
      {!isLoading && courses.length > 0 && (
        <CoursesTagSelectButton tags={tags} onSelect={onSelect} />
      )}
      <View style={styles.centerContainer}>
        <View style={styles.listWrapper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.contentContainer,
              { paddingLeft, paddingRight },
            ]}
            data={courses}
            renderItem={info => {
              return <CourseListItem item={info.item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
});
CoursesListView.displayName = 'CoursesListView';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: theme.primaryBg,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listWrapper: {
    height: 210,
  },

  contentContainer: {
    gap: 18,
    paddingHorizontal: 24,
  },
});
