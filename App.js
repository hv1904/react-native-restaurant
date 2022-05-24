import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import { Restaurant } from './screens'
import Tabs from './navigation/tabs'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
        >
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
        </Stack.Navigator>
    </NavigationContainer>
)
}

