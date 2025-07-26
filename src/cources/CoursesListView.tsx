import React, { memo, useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from 'src/theme.ts';
import { LoaderView } from 'src/compontntes/LoaderView.tsx';
import { ErrorView } from 'src/compontntes/ErrorView.tsx';
import { CourseModel } from 'src/api/models.ts';
import { CourseListItem } from 'src/cources/CourseListItem.tsx';
import { CoursesTagSelectButton } from 'src/cources/CoursesTagSelectButton.tsx';
import { filterCoursesByTag } from 'src/utils/tags.utils.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFetchCourses } from 'src/cources/hooks/useFetchCourses.ts';

export const CoursesListView: React.FC = memo(() => {
  const safe = useSafeAreaInsets();
  const state = useFetchCourses();
  const [filteredCourses, setFilteredCourses] = useState<CourseModel[]>([]);

  const onSelect = useCallback(
    (index: number) => {
      if (state.type !== 'success') return;
      const tag = state.tags[index];
      setFilteredCourses(filterCoursesByTag(state.courses, tag));
    },
    [state],
  );

  let paddingLeft = safe.left || 24;
  let paddingRight = safe.right || 24;

  return (
    <View style={styles.base}>
      {state.type === 'loading' && <LoaderView />}
      {state.type === 'error' && <ErrorView errors={state.error} />}
      {state.type === 'success' && (
        <>
          <CoursesTagSelectButton tags={state.tags} onSelect={onSelect} />
          <View style={styles.centerContainer}>
            <View style={styles.listWrapper}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.contentContainer,
                  { paddingLeft, paddingRight },
                ]}
                data={
                  filteredCourses.length > 0 ? filteredCourses : state.courses
                }
                renderItem={info => {
                  return <CourseListItem item={info.item} />;
                }}
              />
            </View>
          </View>
        </>
      )}
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
