import React, { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from 'src/theme.ts';
import { TagModel } from 'src/api/models.ts';
import { TagsListHeaderView } from 'src/cources/tags/TagsListHeaderView.tsx';
import { TagListItem } from 'src/cources/tags/TagListItem.tsx';

interface Props {
  tags: TagModel[];
  selected?: TagModel;
  onSelect: (index: number) => void;
  onClose: () => void;
}

const itemLayoutHeight = (_data: any, index: number) => ({
  length: 48,
  offset: 48 * index,
  index,
});
export const TagsListView: React.FC<Props> = memo(props => {
  return (
    <View style={styles.base}>
      <TagsListHeaderView onClose={props.onClose} />
      <FlatList
        data={props.tags}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        getItemLayout={itemLayoutHeight}
        renderItem={info => {
          const isSelected = props.selected === info.item;
          return (
            <TagListItem
              onSelect={props.onSelect}
              index={info.index}
              isSelected={isSelected}
              tag={info.item}
            />
          );
        }}
      />
    </View>
  );
});
TagsListView.displayName = 'TagsListView';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: theme.secondaryBb,
  },

  contentContainer: {
    gap: 6,
    alignItems: 'center',
  },
});
