// src/constants/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Firebase configuration using information from google-services.json
const firebaseConfig = {
  apiKey: 'AIzaSyCiMPSlQ_hxLest26fXZTFZevkcv4a_YSc',
  authDomain: 'fish-rcoiz.firebaseapp.com',
  projectId: 'fish-rcoiz',
  appId: '1:296732664095:android:784e5286ac1959e14d102a',
  messagingSenderId: '296732664095',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
