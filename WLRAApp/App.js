import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Radio Screen component
function RadioScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup the timer on unmount or when isPlaying changes
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Stream</Text>
      <WebView
        javaScriptEnabled={true}
        source={{ html: '<audio controls autoplay><source src="http://199.245.229.210:8000/128" type="audio/mpeg"></audio>' }}
      />

      <StatusBar style="auto" />

      <View style={styles.playerContainer}>
        <View style={styles.controlRow}>
          <TouchableOpacity 
            style={styles.playPauseButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? 'pause-outline' : 'play-outline'} 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>

          <Slider
            style={styles.progressBar}
            minimumValue={0}
            value={currentTime}
            onValueChange={(value) => setCurrentTime(value)}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#000000"
            thumbTintColor="#1EB1FC"
          />

          <TouchableOpacity 
            style={styles.volumeIcon}
            onPress={() => setShowVolume(!showVolume)}
          >
            <Ionicons 
              name="volume-high-outline" 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>Live</Text>
        </View>

        {showVolume && (
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={(value) => setVolume(value)}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#000000"
            thumbTintColor="#1EB1FC"
          />
        )}
      </View>
    </View>
  );
}


// Calendar component
function Calendar() {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.text}>Calendar Screen</Text>
      <Image
        style={styles.image}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/55/55281.png' }}
      />
    </View>
  );
}

// Host Profiles component
function HostProfiles() {
  return (
    <View style={styles.centeredContainer}>
      <Text>Host Profiles Screen</Text>
      <Text>Host 1</Text>
      <Text>Host 2</Text>
      <Text>Host 3</Text>
    </View>
  );
}

// PlayerUI component
// function PlayerUI() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showVolume, setShowVolume] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [currentTime, setCurrentTime] = useState(4);
//   const [totalDuration, setTotalDuration] = useState(300);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <View style={styles.playerContainer}>
//       <StatusBar style="auto" />

//       <View style={styles.controlRow}>
//         <TouchableOpacity 
//           style={styles.playPauseButton}
//           onPress={() => setIsPlaying(!isPlaying)}
//         >
//           <Ionicons 
//             name={isPlaying ? 'pause-outline' : 'play-outline'} 
//             size={24} 
//             color="black" 
//           />
//         </TouchableOpacity>

//         <Slider
//           style={styles.progressBar}
//           minimumValue={0}
//           maximumValue={totalDuration}
//           value={currentTime}
//           onValueChange={(value) => setCurrentTime(value)}
//           minimumTrackTintColor="#1EB1FC"
//           maximumTrackTintColor="#000000"
//           thumbTintColor="#1EB1FC"
//         />

//         <TouchableOpacity 
//           style={styles.volumeIcon}
//           onPress={() => setShowVolume(!showVolume)}
//         >
//           <Ionicons 
//             name="volume-high-outline" 
//             size={24} 
//             color="black" 
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.timeContainer}>
//         <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
//         <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
//       </View>

//       {showVolume && (
//         <Slider
//           style={styles.volumeSlider}
//           minimumValue={0}
//           maximumValue={1}
//           value={volume}
//           onValueChange={(value) => setVolume(value)}
//           minimumTrackTintColor="#1EB1FC"
//           maximumTrackTintColor="#000000"
//           thumbTintColor="#1EB1FC"
//         />
//       )}
//     </View>
//   );
// }

// Drawer navigation setup
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="RadioScreen">
      <Drawer.Screen
        name="Radio"
        component={RadioScreen}
        options={{ drawerLabel: 'Radio' }}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{ drawerLabel: 'Program Schedule' }}
      />
      <Drawer.Screen
        name="Host Profiles"
        component={HostProfiles}
        options={{ drawerLabel: 'Host Profiles' }}
      />

    </Drawer.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C22033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    flex: 1,
    backgroundColor: '#C22033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  webview: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  playPauseButton: {
    marginRight: 10,
  },
  progressBar: {
    flex: 1,
    height: 40,
  },
  volumeIcon: {
    marginLeft: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    paddingTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: 'black',
  },
  volumeSlider: {
    width: 250,
    height: 40,
    marginTop: 10,
  },
});