import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, { State } from 'react-native-track-player';
import axios from 'axios';


// Define types for screens
interface ScreenProps {
  route: any;
  navigation: any;
}

// Define types for the Strapi API response
interface HostAttributes {
  Name: string;
  Biography: string;
  // Add more fields here (e.g., imageUrl)
}

interface HostBio {
  id: number;
  attributes: HostAttributes;
}

interface BlogAttributes {
  Title: string;
  Content: string;
  PublishedDate: string;
}

interface BlogPost {
  id: number;
  attributes: BlogAttributes;
}

interface ScreenProps {
  route: any;
  navigation: any;
}

interface EventAttributes {
  Title: string;
  Description: string;
  Date: string;
  Time: string;
}

interface CalendarEvent {
  id: number;
  attributes: EventAttributes;
}



function RadioScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize TrackPlayer
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add({
        id: '1',
        url: 'http://199.245.229.210:8000/128',
        title: 'Live Stream',
        artist: 'WLRA Radio',
      });
    });

    return () => {
      TrackPlayer.stop(); // Cleanup on unmount
    };
  }, []);

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Play and Pause the Radio</Text>
      <TouchableOpacity style={styles.roundButton} onPress={togglePlayback}>
        <Image
          source={
            isPlaying
              ? require('./assets/WLRAPauseButton.png')
              : require('./assets/WLRAPlayButton.png')
          }
          style={styles.icon} // Apply styles to adjust image size
        />
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  webview: {
    width: 400,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  roundButton: {
    width: 200,
    height: 200,
    borderRadius: 100, // Makes it a circle
    backgroundColor: '#800000', // Button color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Adds a shadow for Android
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
   blogContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
   blogDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  blogContent: {
    fontSize: 16,
    color: '#333',
  },
  AboutUsText: {
    fontSize: 18,
    marginBottom: 20,
	alignItems: 'center',
  },
  eventContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
  },
   grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  hostContainer: {
    fontWeight: 'bold',
	marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
});

function Calendar({ route, navigation }: ScreenProps) {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('http://192.168.56.1:1337/api/calendar-events') // Replace with your actual Strapi endpoint
      .then((response) => {
        const fetchedData = response.data.data;
        setCalendarEvents(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching calendar events:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calendar Events</Text>
      {calendarEvents.map((event) => {
		  const { attributes } = event;

		  // Format the date-time strings
		  const formatDateTime = (dateTime) => {
			const date = new Date(dateTime);
			return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
		  };

		  return (
			<View key={event.id} style={styles.eventContainer}>
			  <Text style={styles.eventTitle}>{event.calendarEventTitle || 'No Title'}</Text>
			  <Text style={styles.eventDate}>
				{event.calendarEventStarts
				  ? `Starting at: ${formatDateTime(event.calendarEventStarts)}`
				  : 'No start time.'}
			  </Text>
			  <Text style={styles.eventDate}>
				{event.calendarEventEnds
				  ? `Ending at: ${formatDateTime(event.calendarEventEnds)}`
				  : 'No end time.'}
			  </Text>
			  <Text style={styles.eventDescription}>
				{event.calendarEventDescription || 'No Description.'}
			  </Text>
			</View>
		  );
		})}
    </ScrollView>
  );
}

// HostBiographies component with proper typing
function HostBiographies({ route, navigation }: ScreenProps) {
  const [hostBiographies, setHostBiographies] = useState<HostBio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data from Strapi API
    axios
       .get('http://192.168.56.1:1337/api/host-biographies')
      .then((response) => {
        const fetchedData = response.data.data;
        setHostBiographies(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching Host Biographies:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Host Biographies</Text>
      {hostBiographies.map((host) => {
        const { attributes } = host; // Destructure attributes from the host object
        return (
          <View key={host.id} style={styles.hostContainer}>
            <Text style={styles.eventTitle}>
              {host.Name || 'Name not available'}
			</Text>
			<Text style={styles.eventContainer}>
              {host.Biography || 'Biography not available'}
            </Text>
          {/* Uncomment below if you have host images */}
          {/* <Image 
            style={styles.hostImage}
            source={{ uri: host.attributes.imageUrl }}
          /> */}
        </View>
        );
      })}
    </View>
  );
}

function StationBlog({ route, navigation }: ScreenProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('http://192.168.56.1:1337/api/articles')
      .then((response) => {
        const fetchedData = response.data.data;
        setBlogPosts(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Station Blog</Text>
      {blogPosts.map((post) => {
        const { attributes } = post;
        return (
          <View key={post.id} style={styles.blogContainer}>
            <Text style={styles.title}>{post.articleTitle || 'No Title'}</Text>
            <Text style={styles.blogDate}>
              {post.articlePublishedDate || 'No Date'}
            </Text>
            <Text style={styles.blogContent}>
              {post.articleDescription || 'No Content'}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

// Links for About Us page
function AboutUs({ route, navigation }: ScreenProps) {
  const socialMediaLinks = [
    {
      name: 'Instagram',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
      url: 'https://www.instagram.com/wlraradio/',
    },
    {
      name: 'Facebook',
      logo: 'https://www.citypng.com/public/uploads/preview/hd-blue-and-white-square-facebook-fb-logo-70175169479235560lh86s7jg.png',
      url: 'https://www.facebook.com/wlraradiostation/',
    },
    {
      name: 'Twitter',
      logo: 'https://banner2.cleanpng.com/20240119/kxy/transparent-abstract-design-black-square-with-white-letter-x-on-1710915506770.webp',
      url: 'https://twitter.com/wlraradio',
    },
    {
      name: 'Placeholder',
      logo: '', // Empty placeholder for more social media
      url: '',
    },
  ];
  
    const openLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error('Error opening link:', err)
      );
    }
  };

  return (
    <View style={styles.eventContainer}>
      <Text style={styles.title}>About Us</Text>
	  <Text style={styles.AboutUsText}>
		  WLRA was founded with the objective of providing Lewis students with a practical 
		  means of practicing their broadcasting skills. Today, the team leverages this experience 
		  and seeks to share their skills with the Lewis community. 
	  </Text>
	  <Text style={styles.title}>Connect with us</Text>
      <View style={styles.grid}>
        {socialMediaLinks.map((social, index) => (
          <TouchableOpacity
            key={index}
            style={styles.logoContainer}
            onPress={() => openLink(social.url)}
            disabled={!social.url} // Disable touchable if the URL is empty
          >
              <Image source={{ uri: social.logo }} style={styles.logo} />
          </TouchableOpacity>
        ))}
      </View>
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
        name="Host Biographies"
        component={HostBiographies}
        options={{ drawerLabel: 'Host Biographies' }}
      />
	  <Drawer.Screen
        name="Station Blog"
        component={StationBlog}
        options={{ drawerLabel: 'Station Blog' }}
      />
	   <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{ drawerLabel: 'About Us' }}
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
