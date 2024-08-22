import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import EventList from '../screens/Event/EventList';
import EventForm from '../screens/Event/EventForm';
import EventView from '../screens/Event/EventView';

const EventStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="EventList"
        component={EventList}
        options={{
          headerStyle: [{backgroundColor: '#E5E4E2'}],
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
          headerShown: false,

          // headerShown: true,
          // headerLeft: () => (
          //   <AntDesign
          //     onPress={() => navigation.openDrawer()}
          //     name="arrowleft"
          //     size={25}
          //     color="#074365"
          //   />
          // ),
          title: ' ',
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
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
      />
      <Stack.Screen
        name="EventForm"
        component={EventForm}
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
      {/* <Stack.Screen
        name="Facilities"
        component={Facillities}
        options={{
          headerStyle: [{backgroundColor: '#E5E4E2'}],
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#074365'},
          headerShown: true,
          title: ' ',
          headerShadowVisible: false,
          headerTintColor: '#074365',
        }}
      />
      <Stack.Screen
        name="FacilitiesEditPage"
        component={FacilitiesEditPage}
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

export default EventStack;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     backgroundColor: 'lightgrey',
//   },
//   bigBlue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   red: {
//     color: 'red',
//   },
// });
