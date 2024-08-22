import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Login from '../screens/Login';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      mode="card"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => null,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
export default MyStack;
