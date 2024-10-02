import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';



export default function PlayerUI() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] =useState(0.5); //+++++Functionality++++++

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Text style ={styles.title}>
        </Text>
        
        {/* Play/Pause Button */}
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={() => setIsPlaying(!isPlaying)}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

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
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'lightblue',
    fontSize: 18,
  },
  // ++++++++++Volume Button Add functionality++++++++
  volumeText: {
    marginTop: 20,
    fontSize: 18,
  },
  volumeSlider: {
    width: 200,
    height: 40,
    marginTop: 20,
  },
});
