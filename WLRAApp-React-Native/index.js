/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';


AppRegistry.registerComponent(appName, () => App);

// Registering a background service for TrackPlayer
TrackPlayer.registerPlaybackService(() => require('./trackPlayerService.js'));
