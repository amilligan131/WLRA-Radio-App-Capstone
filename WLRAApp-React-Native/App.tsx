import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {WebView} from 'react-native-webview'; /* Might delete this import and related things as it doesn't work right */
import TrackPlayer from 'react-native-track-player';


// Define types for screens
interface ScreenProps {
  route: any;
  navigation: any;
}

// Radio Screen component with proper typing
function RadioScreen({ route, navigation }: ScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radio Screen</Text>
	  <WebView
        style={styles.webview}
        javaScriptEnabled={true}
        source={{ html: '<audio controls autoplay><source src="http://199.245.229.210:8000/128" type="audio/mpeg"></audio>' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
	alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

// Calendar component with proper typing
function Calendar({ route, navigation }: ScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Calendar Screen</Text>
	  <Image
		style={styles.image}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/55/55281.png' }}
      />
    </View>
  );
}

// HostProfiles component with proper typing
function HostProfiles({ route, navigation }: ScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Host Profiles Screen</Text>
	  <Text></Text>
	  <Text></Text>
	  <Text></Text>
	  <Text>Host 1</Text>
	  <Text></Text>
	  <Text>Host 2</Text>
	  <Text></Text>
	  <Text>Host 3</Text>
    </View>
  );
}

// Create drawer navigator
const Drawer = createDrawerNavigator();

// Drawer component with typed screens
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="RadioScreen">
      <Drawer.Screen
        name="Radio Screen"
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
