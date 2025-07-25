import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  errors: string;
}

export const ErrorView: React.FC<Props> = memo(props => {
  return (
    <View style={styles.base}>
      <Text children={props.errors} />
    </View>
  );
});
ErrorView.displayName = 'ErrorView';

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
