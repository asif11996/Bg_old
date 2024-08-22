import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import UserList from '../screens/User/UserList';
import CreateUser from '../screens/User/CreateUser';

const UserStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: true}}
      initialRouteName="UserList">
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          headerStyle: [{backgroundColor: '#E5E4E2'}],
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
          headerShown: false,
          //   headerLeft: () => (
          //     <AntDesign
          //       onPress={() => navigation.openDrawer()}
          //       name="arrowleft"
          //       size={25}
          //       color="#074365"
          //     />
          //   ),
          title: ' ',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{
          headerStyle: [{backgroundColor: '#E5E4E2'}],
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
          headerShown: false,
          title: ' ',
          headerShadowVisible: false,
          headerTintColor: '#074365',
        }}
      />
      {/*  <Stack.Screen
        name="EventView"
        component={EventView}
        options={{
          headerStyle: [{backgroundColor: '#E5E4E2'}],
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
          headerShown: true,
          title: ' ',
          headerShadowVisible: false,
          headerTintColor: '#074365',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default UserStack;
