import React, { FC, memo, useCallback } from "react";
import { Divider, List, useTheme } from "react-native-paper";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { MusicListTypes } from "../utilities/global.types";
import { useMediaPlayControl } from "./customHooks/useMediaController";
import { useAppSelector } from "../reduxStore";
import { AppThemeType } from "../config/MyThemes";

// Props
interface PropsType {
    musicsList: MusicListTypes[];
    styleOveride: StyleProp<ViewStyle>;
}

const ListItem = ({ songName, fileIndex, onPress, selectedIndex, selectedBackgroundColor }: { songName: string; fileIndex: number; onPress: (index: number) => void; selectedIndex: number | null, selectedBackgroundColor: string }) => (

    <List.Item
        title={songName}
        description="song description"
        style={{ backgroundColor: selectedIndex === fileIndex ? selectedBackgroundColor : 'transparent' }}
        left={props => <List.Icon {...props} icon="music" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
        onPress={() => onPress(fileIndex)}
    />
);

const MusicListComp: FC<PropsType> = ({ musicsList, styleOveride }) => {
    const playControl = useMediaPlayControl();
    const getCurrentPlayIndex = useAppSelector(state => state.mediaPlayerDatas.currentPlayIndex);
    const getPaperTheme = useTheme<AppThemeType>();
    const handlePlay = useCallback((fileIndex: number) => {
        playControl({ fileIndex });
    }, [playControl]);

    const renderItem = useCallback(({ item, index }: { item: MusicListTypes; index: number }) =>
        (<ListItem songName={item.fileName} fileIndex={index} onPress={handlePlay} selectedIndex={getCurrentPlayIndex} selectedBackgroundColor={getPaperTheme.colors.lightHash} />),
        [handlePlay]
    );

    return (
        <FlatList
            style={styleOveride}
            data={musicsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={DividerWrapper}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
        />
    );
};

const DividerWrapper = () => <Divider leftInset horizontalInset />;

export default memo(MusicListComp);
