import { TextStyle } from 'react-native';

const LightTheme = {
  textSecondary: '#5A5776',
  textTertiary: '#ffffff',
  title: '#39414B',
  tagTitle: '#000000',
  primaryBg: '#7446EE',
  secondaryBb: '#FFFFFF',
  themeChooserBg: 'rgba(0, 0, 0, 0.2)',
  tagBorder: '#C5D0E6',
  selection: '#5CBB73',
  loader: '#FFFFFF',
  courseBorder: '#E5E8FE',
};

export const fonts = {
  'headers/14-bold-small-header': {
    fontWeight: '800',
    fontSize: 14,
  } as TextStyle,

  'headers/12-bold-small-header': {
    fontWeight: '800',
    fontSize: 12,
  } as TextStyle,

  'headers/18-bold-regular-header': {
    fontWeight: '800',
    fontSize: 18,
  } as TextStyle,
};

export const theme = LightTheme;
