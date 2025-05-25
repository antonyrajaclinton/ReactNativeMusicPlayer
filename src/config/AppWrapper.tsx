import MyNavigations from "./MyNavigations";
import { PaperProvider } from "react-native-paper";
import { darkThemeStyles, lightThemeStyles } from "./MyThemes";
import { StatusBar, useColorScheme } from "react-native";

const AppWrapper = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const getThemeStyles = (isDarkMode) ? darkThemeStyles : lightThemeStyles;
    return (
        <PaperProvider theme={getThemeStyles}>
            <StatusBar animated={true} barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={getThemeStyles.colors.surface} showHideTransition={'fade'} />
            <MyNavigations />
        </PaperProvider>
    )
}

export default AppWrapper
