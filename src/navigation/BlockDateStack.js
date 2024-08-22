import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import BlockDateList from '../screens/BlockDate/BlockDateList';
import BlockDateForm from '../screens/BlockDate/BlockDateForm';

const BlockDateStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: true}}
      initialRouteName="UserList">
      <Stack.Screen
        name="BlockDateList"
        component={BlockDateList}
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
        name="BlockDate_Form"
        component={BlockDateForm}
        options={{
          headerStyle: [{backgroundColor: '#E5E4E2'}],
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
          headerShown: false,

          title: ' ',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
        }}
      />
    </Stack.Navigator>
  );
};

export default BlockDateStack;

const styles = StyleSheet.create({});
