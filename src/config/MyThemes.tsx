import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';



const themeStyles = {
    colors: {
        myOwnColor: '#BADA55',
    }

};

const lightThemeStyles = {
    ...MD3LightTheme, ...themeStyles,
    colors: {
        ...MD3LightTheme.colors,
        ...themeStyles.colors
    },
};

const darkThemeStyles = {
    ...MD3DarkTheme, ...themeStyles,
    colors: {
        ...MD3DarkTheme.colors,
        ...themeStyles.colors
    },
};



export { darkThemeStyles, lightThemeStyles, themeStyles };