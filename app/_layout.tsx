import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from './(tabs)/index';
import ExploreScreen from './(tabs)/explore';
import LoginScreen from './(tabs)/login';
import RegisterScreen from './(tabs)/register';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (

      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>

  );
}
