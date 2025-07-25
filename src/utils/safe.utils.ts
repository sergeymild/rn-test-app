import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export function useOrientationChange() {
  const safe = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const isLandscape = frame.width > frame.height;
  return { safeArea: safe, isLandscape };
}
