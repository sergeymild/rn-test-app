import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconView } from 'react-native-icon';
import { fonts, theme } from 'src/theme.ts';
import { useOrientationChange } from 'src/utils/safe.utils.ts';

interface Props {
  onClose: () => void;
}

export const TagsListHeaderView: React.FC<Props> = memo(props => {
  const { safeArea, isLandscape } = useOrientationChange();
  const marginTop = isLandscape ? 0 : safeArea.top;
  return (
    <View style={[styles.header, { marginTop }]}>
      <Text children={'Выбор темы'} style={styles.title} />
      <TouchableOpacity
        onPress={props.onClose}
        style={[
          styles.close,
          { end: isLandscape ? safeArea.right || safeArea.left : 8 },
        ]}
      >
        <IconView icon={'icn_cross_36px'} />
      </TouchableOpacity>
    </View>
  );
});
TagsListHeaderView.displayName = 'TagsListHeaderView';

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    ...fonts['headers/18-bold-regular-header'],
    color: theme.title,
  },

  close: {
    position: 'absolute',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
