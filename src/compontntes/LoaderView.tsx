import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from 'src/theme.ts';

export const LoaderView: React.FC = memo(() => {
  return (
    <View style={styles.base}>
      <ActivityIndicator color={theme.loader} />
    </View>
  );
});
LoaderView.displayName = 'LoaderView';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
