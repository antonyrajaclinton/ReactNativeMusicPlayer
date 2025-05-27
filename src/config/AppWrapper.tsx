import MyNavigations from "./MyNavigations";
import { PaperProvider } from "react-native-paper";
import { darkThemeStyles, lightThemeStyles } from "./MyThemes";
import { StatusBar, useColorScheme } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../reduxStore";

import { SnackbarProvider } from "../components/customUiComponents/SnackbarProvider";

const AppWrapper = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const getThemeStyles = (isDarkMode) ? darkThemeStyles : lightThemeStyles;
    return (
        <ReduxProvider store={store} >
            <PaperProvider theme={getThemeStyles}>
                <StatusBar animated={true} barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={getThemeStyles.colors.surface} showHideTransition={'fade'} />
                <MyNavigations />
                <SnackbarProvider />
            </PaperProvider>
        </ReduxProvider>

    )
}

export default AppWrapper
