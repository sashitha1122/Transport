import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/Screen/LoginScreen';
import SignupScreen from '@/Screen/SignupScreen';
import HomeScreen from '@/Screen/HomeScreen';
import { ClickCountProvider } from '@/Screen/ClickCountContext'; 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Ensure that the NavigationContainer is only used here
  
      <ClickCountProvider>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={SignupScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="SavedAirlines" component={SavedAirline} options={{ title: 'Saved Airlines' }} /> */}
          </Stack.Navigator>
        </View>
      </ClickCountProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});







