import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useClickCount } from '../Screen/ClickCountContext';
import CardView from '../Screen/CardView';
import axios from 'axios';
import { dummyAirlineData } from '@/scripts/DummyData';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from '@/scripts/RootStackParamList'; // Correct import for your navigation types
import { StackNavigationProp } from '@react-navigation/stack';

interface Airline {
  image: string;
  name: string;
  icao: string;
  iata: string | null;
  country: string;
  country_iso: string;
  callsign: string;
  available: boolean;
}

// Define the navigation prop type for this screen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const route = useRoute();
  const { username } = route.params as { username: string };
  const { count, increment } = useClickCount();
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Fetch airline data from API
  const fetchAirlineData = async (airlineCode: string) => {
    try {
      const response = await axios.get(`https://api.adsbdb.com/v0/airline/${airlineCode}`);
      if (response.data.response && Array.isArray(response.data.response) && response.data.response.length > 0) {
        const airline = response.data.response[0];
        const airlineImage = dummyAirlineData[airlineCode]?.image || 'https://via.placeholder.com/150';
        const available = Math.random() > 0.5;

        setAirlines((prevAirlines) => [
          ...prevAirlines,
          { ...airline, image: airlineImage, available },
        ]);
      } else {
        setError(`No data found for airline code: ${airlineCode}`);
      }
    } catch (err) {
      setError(`Failed to fetch airline data for code: ${airlineCode}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const airlineCodes = ['UAL', 'AAL', 'SWA', 'DAL', 'RJA',"LHT","AFR","KLM","BAW","EZY","RYR","DLH","THY", "QFA"];
    airlineCodes.forEach(fetchAirlineData);
  }, []);

  const saveAirline = (airline: Airline) => {
    console.log('Saved Airline:', airline);
    increment();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello,</Text>
      <Text style={styles.welcomeText}>{username}</Text>

      {/* Conditionally render the imageContainer */}
      {!loading && !error && (
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/Ariport.jpg')} style={styles.topImage} />
          <Text style={styles.title}>The world's best collection of aviation information</Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loading} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {airlines.map((airline, index) => (
            <TouchableOpacity key={index} onPress={() => saveAirline(airline)}>
              <CardView
                item={{
                  image: airline.image,
                  title: `${airline.name} (${airline.icao})`,
                  description: `IATA: ${airline.iata || 'N/A'}\nCountry: ${airline.country}\nCallsign: ${airline.callsign}`,
                  status: airline.available ? 'Available' : 'Not Available',
                  statusColor: airline.available ? 'green' : 'red',
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
        <View style={styles.floatingButton}>
          <Text style={styles.buttonText}>
            Clicks: {count}
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  helloText: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: 'bold',
    color: 'navy',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'navy',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  topImage: {
    width: '100%',
    height: 200, // Adjust based on your design
    resizeMode: 'cover',
    marginTop: 16,
    borderRadius: 4,
  },
  title: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -160 }, { translateY: -12 }],
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;






















