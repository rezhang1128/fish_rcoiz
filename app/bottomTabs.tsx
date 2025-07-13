import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './(tabs)/index';
import ExploreScreen from './(tabs)/explore';
import AnalyseScreen from './(tabs)/analyse';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Home' ? 'home' : 'search';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Analyse" component={AnalyseScreen}
      options={{
         tabBarIcon: ({ color, size }) => (
           <Ionicons name="camera-outline" size={size} color={color} />
         ),}}
         />

    </Tab.Navigator>
  );
}
