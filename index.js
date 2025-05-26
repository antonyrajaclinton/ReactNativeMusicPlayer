/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWrapper from './src/config/AppWrapper';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => AppWrapper);
TrackPlayer.registerPlaybackService(() => require('./service'));


