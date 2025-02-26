import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../constants/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home'); // Navigate to Home after successful login
    } catch (error: any) {
      console.error('Login Error:', error);

      setErrorMessage("Invalid account or password.");

    }
  };


  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/login_logo.png')} style={{ alignSelf: 'center' }} />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Button title="Login" onPress={handleLogin} />

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* New Sign Up Button */}
      <Text style={styles.signupText} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Sign Up
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#007bff',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
  },
  signupText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Login;
