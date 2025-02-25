import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../../constants/firebaseConfig';
import { updateLastActive } from '../../scripts/inactivityChecker';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();

    useEffect(() => {
      updateLastActive();
    }, []);

    const handleLogout = async () => {
      await auth.signOut();
      navigation.navigate('Login');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
});