import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';



const themeStyles = {
  colors: {
    brandColor: '#BADA55',

  }

};

const lightThemeStyles = {
  ...MD3LightTheme, ...themeStyles,
  colors: {
    ...MD3LightTheme.colors,
    ...themeStyles.colors,
    lightHash: '#f5f5f5'
  },
};

const darkThemeStyles = {
  ...MD3DarkTheme, ...themeStyles,
  colors: {
    ...MD3DarkTheme.colors,
    ...themeStyles.colors,
    lightHash: '#141414'
  },
};


export type AppThemeType = typeof lightThemeStyles;

export { darkThemeStyles, lightThemeStyles, themeStyles };