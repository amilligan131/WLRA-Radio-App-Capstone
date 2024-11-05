import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function PlayerUI() {
  const [isPlaying, setIsPlaying] = useState(false); // Play/Pause logic
  const [showVolume, setShowVolume] = useState(false); // Volume slider toggle
  const [volume, setVolume] = useState(0.5); // Volume logic
  const [currentTime, setCurrentTime] = useState(4); // Track current time (example)
  const [totalDuration, setTotalDuration] = useState(300); // Total duration (example like: 5 minutes)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Play/Pause Button, Progress Bar, and Volume Icon in Row all in here*/}
      <View style={styles.controlRow}>
        {/* Play/Pause Button */}
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

        {/* Progress Bar */}
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={totalDuration}
          value={currentTime}
          onValueChange={(value) => setCurrentTime(value)}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#000000"
          thumbTintColor="#1EB1FC"
        />

        {/* Volume Icon */}
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

      {/* Audio Time Display */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
      </View>

      {/* Volume Slider (shown only when volume icon is pressed) */}
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
  );
}

// Format time in minutes and seconds
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C22033',
    justifyContent: 'center',
    alignItems: 'center',
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
//testing push