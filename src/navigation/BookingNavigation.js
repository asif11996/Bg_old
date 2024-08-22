import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BookingList from "../screens/Booking/BookingList";
import BookingDetail from "../screens/Booking/BookingDetail";
import BookingForm from "../screens/Booking/BookingForm";
import Booking_waivers from "../screens/Booking/Booking_waivers";
import ParticipantForm from "../screens/Booking/ParticipantForm";
import BookingCalendar from "../screens/Booking/BookingCalendar";
import Edit_Participant from "../screens/Booking/Edit_Participant";
import EditBooking from "../screens/Booking/EditBooking";
import { MyColors } from "../style/MyColors";

const BookingNavigation = () => {
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
    headerStyle: { backgroundColor: MyColors.onPrimary },
    headerTitleAlign: "center",
    headerShadowVisible: false
  };

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Bookinglist"
    >
      <Stack.Screen name="Bookinglist" component={BookingList} />
      <Stack.Screen name="BookingForm" component={BookingForm} />
      <Stack.Screen name="EditBooking" component={EditBooking} />
      <Stack.Screen name="BookingCalendar" component={BookingCalendar} />
      <Stack.Screen name="BookingDetail" component={BookingDetail} />
      <Stack.Screen name="Booking_Waivers" component={Booking_waivers} />
      <Stack.Screen name="ParticipantForm" component={ParticipantForm} />
      <Stack.Screen name="EditParticipant" component={Edit_Participant} />
    </Stack.Navigator>
  );
};

export default BookingNavigation;
