import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm';
import ProfileScreen from './ProfilScreen';
import LoginForm from './LoginForm';
import LocationMap from './LocationMap';
import CameraScreen from './CameraScreen';

import { getApps, initializeApp } from 'firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFirestore } from "firebase/firestore";

import dbConfig from './firebaseConfig';

const Tab = createBottomTabNavigator();

// Check if Firebase is already initialized
let app;
if (getApps().length < 1) {
    app = initializeApp(dbConfig);
    console.log("Firebase On!");
    if (isAnalyticsSupported()) {
        const analytics = getAnalytics();
    }
} else {
    console.log("Firebase already initialized!");
    app = getApps()[0];
}

const db = getFirestore(app);

const App = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });

        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                {user ? (
                    <Tab.Navigator>
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                        <Tab.Screen name="Map" component={LocationMap} />
                        <Tab.Screen name="Camera" component={CameraScreen} />
                    </Tab.Navigator>
                ) : (
                    <Tab.Navigator>
                        <Tab.Screen name="Login" component={LoginForm} />
                        <Tab.Screen name="SignUp" component={SignUpForm} />
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
