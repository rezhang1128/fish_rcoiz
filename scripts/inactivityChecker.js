import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../constants/firebaseConfig';

export const checkInactivity = async () => {
  try {
    const lastActive = await AsyncStorage.getItem('lastActive');
    if (lastActive) {
      const lastActiveDate = new Date(lastActive);
      const currentDate = new Date();
      const diffInMilliseconds = currentDate - lastActiveDate;
      const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

      if (diffInDays > 15) {
        // More than 15 days of inactivity
        await auth.signOut();
        console.log('User signed out due to inactivity.');
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Error checking inactivity:', error);
    return false;
  }
};

export const updateLastActive = async () => {
  const currentTime = new Date().toISOString();
  try {
    await AsyncStorage.setItem('lastActive', currentTime);
  } catch (error) {
    console.error('Error updating last active time:', error);
  }
};
