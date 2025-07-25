import React, { memo } from 'react';
import { CourseModel } from 'src/api/models.ts';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fonts, theme } from 'src/theme.ts';

interface Props {
  item: CourseModel;
}

export const CourseListItem: React.FC<Props> = memo(props => {
  return (
    <View style={styles.base}>
      <View style={styles.bottomBorder} />
      <View
        style={[styles.imageWrapper, { backgroundColor: props.item.bgColor }]}
      >
        <Image source={{ uri: props.item.image }} style={styles.image} />
        <View style={styles.bottom}>
          <Text
            children={props.item.name}
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          />
        </View>
      </View>
    </View>
  );
});
CourseListItem.displayName = 'CourseListItem';

const styles = StyleSheet.create({
  base: {
    borderRadius: 24,
    height: 210,
    overflow: 'hidden',
  },

  bottomBorder: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: theme.courseBorder,
  },

  imageWrapper: {
    width: 210,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },

  image: {
    width: 210,
    height: 162,
    overflow: 'hidden',
    resizeMode: 'contain',
  },

  bottom: {
    height: 42,
    backgroundColor: theme.secondaryBb,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    ...fonts['headers/14-bold-small-header'],
    color: theme.textSecondary,
  },
});
