import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

//+++++Test functionality with sample audio +++++
export default function PlayerUI() {
  const [isPlaying, setIsPlaying] = useState(false); // Button logic
  const [volume, setVolume] = useState(0.5); // Volume logic

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Play/Pause Button logic-> toggles through play and pause */}
      <TouchableOpacity // Touchable UI component that responds to presses
        style={styles.playPauseButton}
        onPress={() => setIsPlaying(!isPlaying)}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
  
      {/* Volume Control */}
      <View style={styles.volumeControl}>
      <Text style={styles.volumeText}>Volume: {Math.round(volume * 100)}%</Text>
      <Slider
        style={styles.volumeSlider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={(value) => setVolume(value)} // Update volume as the slider moves
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1EB1FC"
      />
      </View>
    </View>
  );
}


{/*Pause/Play Buttons UI */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  playPauseButton: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50, // Circular shape
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'lightblue',
    fontSize: 18,
  },
  // ++++++++++Volume Button Add functionality++++++++
  volumeControl: {
    alignItems: 'center',
  },
  volumeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  volumeSlider: {
    width: 200,
    height: 40,
  },
});
