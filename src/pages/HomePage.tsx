import React, { useEffect } from 'react';
import { Alert, View, BackHandler, ActivityIndicator } from 'react-native';
import { Text, useTheme, Appbar, Button, Icon, IconButton } from 'react-native-paper';
import { requestStoragePermission, openAppSetting } from '../utilities/requestPermissions';
import { readAllFilesByExtension } from '../utilities/fileOperation';
import environmentConfig from '../../environment.config';
import { AppThemeType } from '../config/MyThemes';
import MusicListComp from '../components/MusicListComp';
import SpinAnimationComp from '../components/animation/SpinAnimationComp';

import { useAppDispatch, useAppSelector } from '../reduxStore';
import { setSongLists, setMediaisLoading, setMediaTotalCount } from '../reduxReducers/mediaPlayerDatas';
import useAppSnackbar from '../components/customHooks/useAppSnackbar';
import { useMediaPlayerStatus, useMediaResumeControl, useMediaPauseControl, useMediaForwardBackwardControl } from '../components/customHooks/useMediaController';

const HomePage = () => {
    const getPaperTheme = useTheme<AppThemeType>();
    // const navigation = useNavigation();
    const appDispatch = useAppDispatch();
    const appSnackbar = useAppSnackbar();
    const appMediaPlayerDetails = useMediaPlayerStatus();
    const appMediaPlayerResumeControl = useMediaResumeControl();
    const appMediaPlayerPauseControl = useMediaPauseControl();
    const appMediaPlayerForwardBackwardControl = useMediaForwardBackwardControl();
    const getSongListArray = useAppSelector(state => state.mediaPlayerDatas.songLists);
    const getCurrentPlayIndex = useAppSelector(state => state.mediaPlayerDatas.currentPlayIndex);
    const getMediaListIsLoading = useAppSelector(state => state.mediaPlayerDatas.isLoading);
    const getMediaTotalCount = useAppSelector(state => state.mediaPlayerDatas.totalCount);

    // const getIsMediaPlaying = useAppSelector(state => state.mediaPlayerDatas.totalCount);



    useEffect(() => {
        fetchSongLists();
    }, []);

    const fetchSongLists = () => {
        requestStoragePermission().then((requestStatus: boolean) => {

            if (requestStatus) {
                if (getSongListArray.length === 0) {
                    appDispatch(setMediaisLoading(true));
                    readAllFilesByExtension('.mp3').then((files) => {
                        appDispatch(setMediaTotalCount(files.length));
                        appDispatch(setSongLists(files));
                        appDispatch(setMediaisLoading(false));
                    });
                }
            } else {
                Alert.alert('Permission', 'Media read perssion required to access the local files.', [
                    { text: 'Exit', onPress: () => BackHandler.exitApp() },
                    { text: 'Open Setting', onPress: openAppSetting },
                ], { cancelable: false });
            }

        })
    }



    const playResumeSong = (status: 'play' | 'pause') => {
        // appSnackbar({ visible: true, message: 'hagfuiagfdugafuooihauohfaohuoSAHF' });
        if (status === 'play') {
            appMediaPlayerResumeControl();
        } else {
            appMediaPlayerPauseControl();
        }
    }
    // console.log(appMediaPlayerDetails);



    return (
        <>
            <View style={{ backgroundColor: getPaperTheme.colors.lightHash, height: '100%' }}>
                <Appbar.Header style={{ backgroundColor: getPaperTheme.colors.lightHash }} >

                    <Appbar.Content title={<Text variant='titleLarge' style={{ color: getPaperTheme.colors.brandColor }}>{environmentConfig.ENV_APP_NAME}</Text>} />
                    <Appbar.Action icon="magnify" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>

                {getMediaListIsLoading && <View style={{ flexGrow: 1 }}>
                    <View style={{ margin: 'auto' }}>
                        <ActivityIndicator animating={true} size={60} color={getPaperTheme.colors.brandColor} />
                        <Text style={{ marginTop: 10 }}>Loading...</Text>
                    </View>
                </View>}
                {(getMediaTotalCount === 0 && !getMediaListIsLoading) && <View style={{ flexGrow: 1 }}>
                    <View style={{ margin: 'auto' }}>
                        <View style={{ paddingHorizontal: 50 }}>
                            <Icon source={'folder-search-outline'} size={70} color={getPaperTheme.colors.brandColor} />
                        </View>
                        <Text style={{ marginTop: 10, textAlign: 'center' }}>No media was found!</Text>
                        <Button icon='cached' onPress={fetchSongLists}>Retry</Button>
                    </View>
                </View>}
                {(getMediaTotalCount !== 0 && !getMediaListIsLoading) &&
                    <MusicListComp musicsList={getSongListArray} styleOveride={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: getPaperTheme.colors.background }} />
                }



                <View style={{ backgroundColor: getPaperTheme.colors.background }}>
                    <View style={{ borderRadius: 30, margin: 5, marginTop: 0, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: getPaperTheme.colors.lightHash, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '50%', justifyContent: 'flex-start' }}>
                            <SpinAnimationComp animation={(appMediaPlayerDetails.isPlaying ? true : false)}>
                                <Icon source="music-circle-outline" size={35} />
                            </SpinAnimationComp>
                            <View>
                                <Text numberOfLines={1} >{appMediaPlayerDetails.songName}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', justifyContent: 'flex-end' }}>
                            <IconButton icon="skip-backward" size={20} onPress={() => appMediaPlayerForwardBackwardControl('backward')} />
                            {appMediaPlayerDetails.isPlaying ? <IconButton icon="pause" size={20} onPress={() => playResumeSong('pause')} /> :
                                <IconButton icon="play" size={20} onPress={() => playResumeSong('play')} />}


                            <IconButton icon="skip-forward" size={20} onPress={() => appMediaPlayerForwardBackwardControl('forward')} />
                        </View>

                    </View>
                </View>

            </View>



        </>
    )
}

export default HomePage;


