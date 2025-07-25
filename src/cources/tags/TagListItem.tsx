import React, { memo } from 'react';
import { TagModel } from 'src/api/models.ts';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts, theme } from 'src/theme.ts';

interface Props {
  isSelected: boolean;
  index: number;
  tag: TagModel;
  onSelect: (index: number) => void;
}

export const TagListItem: React.FC<Props> = memo(props => {
  return (
    <TouchableOpacity
      onPress={() => props.onSelect(props.index)}
      activeOpacity={0.8}
      style={[
        styles.base,
        {
          backgroundColor: props.isSelected ? theme.selection : undefined,
          borderWidth: props.isSelected ? 0 : 2,
          borderColor: props.isSelected ? undefined : theme.tagBorder,
        },
      ]}
    >
      <Text
        children={props.tag}
        style={[
          fonts['headers/18-bold-regular-header'],
          { color: props.isSelected ? theme.secondaryBb : theme.tagTitle },
        ]}
      />
    </TouchableOpacity>
  );
});
TagListItem.displayName = 'TagListItem';

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 18,
    width: Math.min(Dimensions.get('window').width - 16, 336),
  },
});
