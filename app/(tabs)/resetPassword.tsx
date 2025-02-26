import React, { useState } from 'react';
import {
Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth } from '../../constants/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    try {
      // Check if the email is registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        // If email is registered, send the reset email
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          'Password Reset Email Sent',
          'Please check your inbox for instructions to reset your password.'
        );
        navigation.replace('Login');
      } else {
        // If email is not registered, show a specific message
        setErrorMessage('No account found with this email.');
      }
    } catch (error: any) {
      console.error('Forgot Password Error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format.');
          break;
        case 'auth/user-not-found':
          setErrorMessage('No account found with this email.');
          break;
        default:
          setErrorMessage('Failed to send reset email. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('@/assets/images/login_logo.png')} style={{ alignSelf: 'center' }} />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <Text
        style={styles.backToLogin}
        onPress={() => navigation.replace('Login')}
      >
        Back to Login
      </Text>
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  backToLogin: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ResetPassword;
