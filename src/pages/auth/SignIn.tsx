import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
// import { NavigationProp } from '@react-navigation/native';
import environmentConfig from '../../../environment.config';
import { AppThemeType } from '../../config/MyThemes';
import soundManager from '../../utilities/soundManager';


const SignIn = () => {
    const getPaperTheme = useTheme<AppThemeType>();
    const navigation = useNavigation();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleSubmit = () => {
        soundManager.pauseSound();
        Alert.alert('Message', 'This is not developed yet...!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    }
    const navigateToOfflineMusic = () => {
        navigation.navigate('homePage')
    }
    return (
        <>
            <View style={{ backgroundColor: getPaperTheme.colors.background, height: '100%' }}>
                <ScrollView>

                    <View style={{ ...styles.centerTitle, marginTop: 60 }} >
                        <Image style={styles.appLogoImage} source={require('../../../assets/app/app-logo.png')} />
                    </View>
                    <View style={{ ...styles.centerTitle, marginTop: 10 }} >
                        <Text variant='headlineSmall' style={{ fontWeight: 'bold', color: getPaperTheme.colors.brandColor }}>{environmentConfig.ENV_APP_NAME}</Text>
                    </View>
                    <View style={{ ...styles.centerTitle, marginTop: 10 }} >
                        <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>Sign in to your account</Text>
                    </View>
                    <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 30 }}>
                        <View>
                            <TextInput label="Email Address" value={emailAddress} mode='outlined' onChangeText={setEmailAddress} />
                            <HelperText type="error" visible={Boolean(emailAddress && !emailAddress.includes('@'))}>
                                Email address is invalid!
                            </HelperText>
                        </View>
                        <View>
                            <TextInput label="Password" value={password} mode='outlined' onChangeText={setPassword} />
                            <HelperText type="error" visible={Boolean(password && password.trim().length < 8)}>
                                Password Must be atleast 8 characters
                            </HelperText>
                        </View>
                        <View style={{ ...styles.spaceBetween, marginTop: -10 }}>
                            <Button ><Text style={{ ...styles.underlineText, color: getPaperTheme.colors.primary }} >Register here</Text></Button>
                            <Button ><Text style={{ ...styles.underlineText, color: getPaperTheme.colors.primary }} >Forgot Password</Text></Button>
                        </View>
                        <Button icon="arrow-right" mode="contained" style={{ marginTop: 5 }} onPress={handleSubmit}>
                            SIGN IN
                        </Button>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between' }}>
                            <Divider style={{ width: '44%' }} />
                            <Text>OR</Text>
                            <Divider style={{ width: '44%' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-evenly', paddingLeft: 30, paddingRight: 30 }}>

                            <Pressable onPress={handleSubmit}><Image style={{ height: 35, width: 35, borderRadius: 3 }} source={require('../../../assets/logo/google.png')} /></Pressable>
                            <Pressable onPress={handleSubmit}><Image style={{ height: 35, width: 35, borderRadius: 3 }} source={require('../../../assets/logo/microsoft.png')} /></Pressable>
                            <Pressable onPress={handleSubmit}><Image style={{ height: 35, width: 35, borderRadius: 3 }} source={require('../../../assets/logo/github.png')} /></Pressable>

                        </View>
                        <View style={{ marginTop: 50, marginBottom: 80 }} >
                            <Button icon="cloud-off-outline" textColor='#fff' buttonColor={getPaperTheme.colors.outline} mode="contained" style={{ marginTop: 5 }} onPress={navigateToOfflineMusic}>
                                Offline Music
                            </Button>
                        </View>

                    </View>





                </ScrollView>
            </View>



        </>
    )
}

export default SignIn;



const styles = StyleSheet.create({
    centerTitle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    appLogoImage: {
        height: 70,
        width: 70

    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    underlineText: {
        textDecorationLine: 'underline'

    }

})
