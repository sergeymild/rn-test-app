import React, { memo, RefObject, useCallback, useState } from 'react';
import { TagModel } from 'src/api/models.ts';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts, theme } from 'src/theme.ts';
import { IconView } from 'react-native-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TagsSelectionModal } from 'src/cources/tags/TagsSelectionModal.tsx';

interface Props {
  tags: RefObject<TagModel[]>;
  onSelect: (index: number) => void;
}

export const CoursesTagSelectButton: React.FC<Props> = memo(props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('All');
  const safe = useSafeAreaInsets();

  const onClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSelect = useCallback(
    (index: number) => {
      props.onSelect(index);
      setSelected(props.tags.current[index]);
      setModalVisible(false);
    },
    [props],
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(!isModalVisible)}
        style={[styles.base, { top: safe.top + 16 }]}
      >
        <Text children={selected} style={styles.title} />
        <IconView icon={'arrow_down'} containerStyle={styles.arrowWrapper} />
        <TagsSelectionModal
          selected={selected}
          tags={props.tags.current}
          onClose={onClose}
          isVisible={isModalVisible}
          onSelect={onSelect}
        />
      </TouchableOpacity>
    </>
  );
});
CoursesTagSelectButton.displayName = 'CoursesTagSelectButton';

const styles = StyleSheet.create({
  base: {
    height: 28,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: 10,
    gap: 3,
    paddingEnd: 5,
    backgroundColor: theme.themeChooserBg,
  },

  title: {
    color: theme.textTertiary,
    ...fonts['headers/12-bold-small-header'],
  },

  arrowWrapper: {
    width: 18,
    height: 18,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.themeChooserBg,
  },
});
