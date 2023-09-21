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



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMwyrKLb8YWzzc7j1U0_efT01K4jTaT34",
  authDomain: "oldjeans1-5dbbe.firebaseapp.com",
  projectId: "oldjeans1-5dbbe",
  storageBucket: "oldjeans1-5dbbe.appspot.com",
  messagingSenderId: "279762862098",
  appId: "1:279762862098:web:7cc0c65e9bfa7f222298cb",
  measurementId: "G-93R9ELLMJF"
};

const Tab = createBottomTabNavigator();

// Check if Firebase is already initialized
if (getApps().length < 1) {
  initializeApp(firebaseConfig);
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