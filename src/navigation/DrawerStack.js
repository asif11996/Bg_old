import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./QRCodeStack";
import BookingNavigation from "./BookingNavigation";
import BookingCalendar from "../screens/Booking/BookingCalendar";
import Logout from "../screens/Logout";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Bogathon"
        component={BookingNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Worriors"
        component={BookingNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Booking Calendar"
        component={BookingCalendar}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
