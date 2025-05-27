import { useAppDispatch, useAppSelector } from "../../reduxStore";
import soundManager from "../../utilities/soundManager";
import { setCurrentPlayIndex } from "../../reduxReducers/mediaPlayerDatas";
import { setPlayerStatus } from "../../reduxReducers/mediaPlayerControls";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';






interface MediaPlayControlTypes {
    fileIndex: number,
    uriPrefix?: string
}
interface MediaPlayerStatusTypes {
    isPlaying: boolean | undefined | null,
    songName: string | null
}

const useMediaPlayControl = () => {
    const appDispatch = useAppDispatch();
    const getSongListArray = useAppSelector(state => state.mediaPlayerDatas.songLists);
    return ({ fileIndex, uriPrefix }: MediaPlayControlTypes) => {
        let getUriPrefix = uriPrefix || 'file://';
        let getFileIndex = (getSongListArray[fileIndex]) ? fileIndex : 0;
        let fileURI = getSongListArray[getFileIndex]?.filePath;
        appDispatch(setCurrentPlayIndex(getFileIndex));
        setIndexToLocalStorage(getFileIndex);
        appDispatch(setPlayerStatus(true));
        soundManager.playSound(getUriPrefix + fileURI);
    }
}
const useMediaResumeControl = () => {
    const appDispatch = useAppDispatch();
    const mediaPlayControl = useMediaPlayControl();
    return () => {
        if (soundManager.getSoundInstance()?.isLoaded()) {
            appDispatch(setPlayerStatus(true));
            soundManager.resumeSound();
        } else {
            getIndexToLocalStorage().then((response: number) => {
                mediaPlayControl({ fileIndex: response });
            });
        }
    }
}
const useMediaForwardBackwardControl = () => {
    const appDispatch = useAppDispatch();
    const mediaPlayControl = useMediaPlayControl();
    const getSongListArray = useAppSelector(state => state.mediaPlayerDatas.songLists);

    return (status: 'forward' | 'backward') => {
        let getTotalFiles = getSongListArray.length;
        if (getTotalFiles !== 0) {
            getIndexToLocalStorage().then((response: number) => {
                let getResonseIndex = response;
                if (status === 'forward') {
                    if (getTotalFiles === getResonseIndex) {
                        mediaPlayControl({ fileIndex: getResonseIndex });
                    } else {
                        mediaPlayControl({ fileIndex: getResonseIndex + 1 });
                    }
                } else if (status === 'backward') {

                    if (getTotalFiles === 0) {
                        mediaPlayControl({ fileIndex: getResonseIndex });
                    } else {
                        mediaPlayControl({ fileIndex: getResonseIndex - 1 });
                    }
                }
            });
        }

    }
}
const useMediaPauseControl = () => {
    const appDispatch = useAppDispatch();
    return () => {
        try {
            appDispatch(setPlayerStatus(false));
            soundManager.pauseSound();
        } catch (error) {
            console.error(error);
        }
    }
}

const setIndexToLocalStorage = (value: number) => {
    AsyncStorage.setItem('songIndex', value.toString());
}

const getIndexToLocalStorage = async () => {
    let getData = await AsyncStorage.getItem('songIndex');
    if (getData || getData == '0') {
        return parseInt(getData);
    } else {
        return 0;
    }
}

const useMediaPlayerStatus = (): MediaPlayerStatusTypes => {
    const getPlayerStatus = useAppSelector(state => state.mediaPlayerControls.isMediaPlaying);
    const getSongListArray = useAppSelector(state => state.mediaPlayerDatas.songLists);
    const getCurrentPlayIndex = useAppSelector(state => state.mediaPlayerDatas.currentPlayIndex);
    const [details, setDetails] = useState<any>({});
    const appDispatch = useAppDispatch();
    useEffect(() => {
        appDispatch(setPlayerStatus((soundManager.getSoundInstance()?.isPlaying()) ? true : false));
    }, []);
    useEffect(() => {
        if (getSongListArray.length !== 0) {
            getIndexToLocalStorage().then((response: number) => {
                let getDetails: any = {};
                let getFileIndex = (getSongListArray[response]) ? response : 0;
                appDispatch(setCurrentPlayIndex(getFileIndex));
                getDetails.songName = getSongListArray[getFileIndex]?.fileName;
                setDetails(getDetails);
            });
        }
    }, [getCurrentPlayIndex, getSongListArray]);
    return { isPlaying: getPlayerStatus, songName: details?.songName };
}


export { useMediaPlayControl, useMediaResumeControl, useMediaPauseControl, useMediaPlayerStatus, useMediaForwardBackwardControl };
