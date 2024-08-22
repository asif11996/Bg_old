import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import TimeSlot from '../screens/Time_Slot/TimeSlot';

const TimeStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="EventList"
        component={TimeSlot}
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
    </Stack.Navigator>
  );
};

export default TimeStack;

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
