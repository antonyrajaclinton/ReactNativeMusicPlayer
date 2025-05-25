import { lazy } from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//routes:

 
const SignIn = lazy(() => import('../pages/auth/SignIn'));

 
const RootStack = createNativeStackNavigator({
    initialRouteName: 'signIn',
    screens: {
        signIn: {
            screen: SignIn,
            options: {
                headerShown: false
            }
        },

    },

});

export default createStaticNavigation(RootStack);

