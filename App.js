import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm';
import ProfileScreen from './ProfilScreen';
import LoginForm from './LoginForm';


import { getApps } from 'firebase/app';
import { initializeApp } from "firebase/app";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // <-- Here's the correction
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFirestore } from "firebase/firestore";

import db from './firebaseConfig';

const Tab = createBottomTabNavigator();


// Check if Firebase is already initialized
if (getApps().length < 1) {
  initializeApp(db);
  console.log("Firebase On!");
  if (isAnalyticsSupported()) {
    const analytics = getAnalytics();
  }
} else {
  console.log("Firebase already initialized!");
}

const App = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  let app;
if (getApps().length < 1) {
  app = initializeApp(db); // Store the initialized app in a variable
  console.log("Firebase On!");
  if (isAnalyticsSupported()) {
    const analytics = getAnalytics();
  }
} else {
  console.log("Firebase already initialized!");
  app = getApps()[0]; // Get the already initialized app
}
  
  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup: Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user ? (
        <ProfileScreen />
      ) : (
        <>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginForm} />
            <Tab.Screen name="SignUp" component={SignUpForm} />
          </Tab.Navigator>
        </NavigationContainer>
        </>
      )}
    </SafeAreaView>
  );
};

export default App;