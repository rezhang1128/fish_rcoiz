import React, { useEffect, useState }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, Linking  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';
import { checkInactivity, updateLastActive } from '../scripts/inactivityChecker';
import * as SplashScreen from 'expo-splash-screen';
// Import your screens
import LoadingScreen from './loading';
import HomeScreen from './(tabs)/index';
import ExploreScreen from './(tabs)/explore';
import LoginScreen from './(tabs)/login';
import RegisterScreen from './(tabs)/register';
import ResetPassword from './(tabs)/resetPassword';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [loading, setLoading] = useState(true);


   useEffect(() => {

     // Check auth state and inactivity on app launch
     const unsubscribe = onAuthStateChanged(auth, async (user) => {
       if (user) {

         const isActive = await checkInactivity();
         if (isActive) {

           setIsLoggedIn(true);
           updateLastActive(); // Update last active time
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

       return () => {
         Linking.removeEventListener('url', handleDeepLink);
       };
     }, []);





  return (

      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login', headerShown: false,headerLeft: () => null  }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Register',
            headerLeft: () => null, // Hides the back button
            gestureEnabled: false, // This hides the back button
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home',headerLeft: () => null  }}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ title: 'Explore',headerLeft: () => null  }}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>

  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Set background color
  },
});