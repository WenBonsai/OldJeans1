import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import SettingsScreen from '../SettingsScreen';
import DetailsScreen from '../DetailsScreen';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
      />
      <Stack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen} 
      />
      <Stack.Screen 
        name="DetailsScreen" 
        component={DetailsScreen} 
      />
    </Stack.Navigator>

  );
}

export default StackNavigator;
