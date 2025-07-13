
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Linking, TouchableOpacity, Text  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';
import { checkInactivity, updateLastActive } from '../scripts/inactivityChecker';
import { Ionicons } from '@expo/vector-icons';

import BottomTabs from './bottomTabs'; // The new tab navigator
import LoginScreen from './(tabs)/login';
import RegisterScreen from './(tabs)/register';
import ResetPassword from './(tabs)/resetPassword';


const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isActive = await checkInactivity();
        if (isActive) {
          setIsLoggedIn(true);
          updateLastActive();
        } else {
          setIsLoggedIn(false);
          await auth.signOut();
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      const oobCode = new URL(url).searchParams.get('oobCode');
      if (oobCode) {
        navigation.navigate('ResetPassword', { oobCode });
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    return () => Linking.removeEventListener('url', handleDeepLink);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

   console.log('isLoggedIn:', isLoggedIn);

  return (
   <View style={{ flex: 1 }}>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} />

        )}
      </Stack.Navigator>

      {isLoggedIn && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            console.log('FAB Pressed');
          }}
        >
            <Ionicons name="camera" size={32} color="#fff" />

        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fab: {
      position: 'absolute',
      bottom: 70,
      right: 30,
      width: 50,
      height: 50,
      borderRadius: 30, // makes it circular
      backgroundColor: '#2196F3', // blue color
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 7, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
  },

});
