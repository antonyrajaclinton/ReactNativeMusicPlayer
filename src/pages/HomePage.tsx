import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View, BackHandler, StyleSheet, Animated, Easing } from 'react-native';
import { Text, useTheme, Appbar, Button, Icon, IconButton } from 'react-native-paper';
import { requestStoragePermission, openAppSetting } from '../utilities/requestPermissions';

import { readAllFilesByExtension } from '../utilities/fileOperation';
import environmentConfig from '../../environment.config';
import { AppThemeType } from '../config/MyThemes';
import MusicListComp from '../components/MusicListComp';
import { MusicListTypes } from '../utilities/global.types';
import SpinAnimationComp from '../components/animation/SpinAnimationComp';




const HomePage = () => {
    const getPaperTheme = useTheme<AppThemeType>();
    // const navigation = useNavigation();

    const [allSongsList, setAllSongsLists] = useState<MusicListTypes[]>([]);

    useEffect(() => {
        requestStoragePermission().then((requestStatus: boolean) => {

            if (requestStatus) {

                readAllFilesByExtension('.mp3').then((files) => {
                    if (Array.isArray(files)) {
                        setAllSongsLists(files);
                    }
                })
            } else {
                Alert.alert('Permission', 'Media read perssion required to access the local files.', [
                    { text: 'Exit', onPress: () => BackHandler.exitApp() },
                    { text: 'Open Setting', onPress: openAppSetting },
                ]);
            }

        })
    }, []);

 






    return (
        <>
            <View style={{ backgroundColor: getPaperTheme.colors.lightHash, height: '100%' }}>
                <Appbar.Header style={{ backgroundColor: getPaperTheme.colors.lightHash }} >

                    <Appbar.Content title={<Text variant='titleLarge' style={{ color: getPaperTheme.colors.brandColor }}>{environmentConfig.ENV_APP_NAME}</Text>} />
                    <Appbar.Action icon="magnify" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>
                <ScrollView style={{ flexGrow: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: getPaperTheme.colors.background }}>
                    <MusicListComp musicsList={allSongsList} />
                </ScrollView>
                <View style={{ backgroundColor: getPaperTheme.colors.background }}>
                    <View style={{ borderRadius: 30, margin: 5, marginTop: 0, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: getPaperTheme.colors.lightHash, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '50%', justifyContent: 'flex-start' }}>
                            <SpinAnimationComp>
                                <Icon source="music-circle-outline" size={35} />
                            </SpinAnimationComp>
                            <View>
                                <Text numberOfLines={1} > sdafdafas sdffffffffffffffffffffffffffffff </Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', justifyContent: 'flex-end' }}>
                            <IconButton icon="skip-backward" size={20} onPress={() => console.log('Pressed')} />
                            <IconButton icon="play" size={20} onPress={() => console.log('Pressed')} />
                            <IconButton icon="skip-forward" size={20} onPress={() => console.log('Pressed')} />
                        </View>

                    </View>
                </View>

            </View>



        </>
    )
}

export default HomePage;


