import { FC, Fragment, useRef, useState } from "react";
import { View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { MusicListTypes } from "../utilities/global.types";
// import Sound from 'react-native-sound';
import soundManager from "../utilities/soundManager";


// Sound.setCategory('Playback');

interface PropsType {
    musicsList: MusicListTypes[]
}

const MusicListComp: FC<PropsType> = ({ musicsList }) => {
    // const whoosh: any = useRef(null);
    const playFile = async (uri: string) => {


        try {

            soundManager.playSound('file://' + uri);


            // console.log('volume: ' + whoosh.current.getVolume());
            // console.log('pan: ' + whoosh.current.getPan());
            // console.log('loops: ' + whoosh.current.getNumberOfLoops());
        } catch (error) {
            console.log(error);


        }




    };

   
    return (
        <>
            <View>
                {musicsList.map((data, index) => {
                    return (<Fragment key={index}><List.Item
                        title={data.fileName}
                        description="Item description"
                        left={props => <List.Icon {...props} icon="music" />}
                        right={props => <List.Icon {...props} icon="dots-vertical" />}
                        onPress={() => playFile(data.filePath)}
                    /><Divider leftInset horizontalInset /></Fragment>)
                })}
            </View>
        </>
    )
}

export default MusicListComp;
