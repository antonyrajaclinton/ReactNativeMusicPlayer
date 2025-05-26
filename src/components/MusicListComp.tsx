import { FC, Fragment } from "react";
import { View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { MusicListTypes } from "../utilities/global.types";
import TrackPlayer from 'react-native-track-player';




interface PropsType {
    musicsList: MusicListTypes[]
}

const MusicListComp: FC<PropsType> = ({ musicsList }) => {

    const playFile = async (uri: string) => {
        await TrackPlayer.setupPlayer()

        console.log(uri);

        // const sound = new Sound('file://' + uri, Sound.MAIN_BUNDLE, (error:any) => {
        //     if (error) {
        //         console.log('error loading file:', error);
        //         return;
        //     }
        //       console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());

        //     // sound.play();
        // });
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
