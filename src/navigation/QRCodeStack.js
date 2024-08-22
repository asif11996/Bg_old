import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Booking_waivers from "../screens/Booking/Booking_waivers";
import Detail from "../screens/Detail";
import Home from "../screens/Home";
import LatestBookingDetails from "../screens/LatestBookingDetails";
import Scan from "../screens/Scan";
import BookingNavigation from "./BookingNavigation";
import BookingCalendar from "../screens/Booking/BookingCalendar";
import Logout from "../screens/Logout";
import { MyColors } from "../style/MyColors";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={"HomeScreen"}
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => null,

        headerTintColor: MyColors.onPrimary,
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ScanScreen"
        component={Scan}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetailScreen"
        component={Detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LatestBookingDetails"
        component={LatestBookingDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking_Waivers"
        component={Booking_waivers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bookings"
        component={BookingNavigation}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign name="minussquareo" size={size} />
          ),
          headerTitleAlign: "center",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="BookingCalendar"
        component={BookingCalendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default HomeStack;
