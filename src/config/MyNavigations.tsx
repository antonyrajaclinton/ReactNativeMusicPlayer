import { lazy } from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { StaticParamList } from '@react-navigation/native';


//routes:


const SignIn = lazy(() => import('../pages/auth/SignIn'));
const HomePage = lazy(() => import('../pages/HomePage'));


const RootStack = createNativeStackNavigator({
    initialRouteName: 'signIn',
    screens: {
        signIn: {
            screen: SignIn,
            options: {
                headerShown: false
            }
        },
        homePage: {
            screen: HomePage,
            options: {
                headerShown: false
            }
        },

    },

});

export default createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

