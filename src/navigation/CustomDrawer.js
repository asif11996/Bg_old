import React, { useCallback, useEffect } from "react";
import { View, Text, DrawerScreenStyleheet, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { MyColors } from "../style/MyColors";
import { fetchBooking_Events } from "../store/action/booking";
import DrawerHeader from "../component/DrawerHeader";
import DrawerScreenStyle from "../style/DrawerScreenStyle";

const CustomDrawer = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { bookingEvent } = useSelector((state) => state.bookinglist);
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  const fetchBooking_Event = useCallback(async () => {
    try {
      await dispatch(fetchBooking_Events());
    } catch (err) {
      console.error("Error fetching booking dashboard data:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBooking_Event();
  }, [fetchBooking_Event]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ minHeight: windowHeight }}
    >
      <DrawerHeader user={user} />

      <View style={{ flex: 1 }}>
        <DrawerItem
          label="Home"
          style={[
            DrawerScreenStyle.menu,
            { backgroundColor: MyColors.primary }
          ]}
          labelStyle={{ color: MyColors.onPrimary }}
          onPress={() => props.navigation.navigate("Home")}
          icon={({ focused, size }) => (
            <Feather name="home" size={size} color={MyColors.onPrimary} />
          )}
        />
        {user.type === "admin" && (
          <DrawerItem
            label="Booking Calendar"
            style={[
              DrawerScreenStyle.menu,
              { backgroundColor: MyColors.primary }
            ]}
            labelStyle={{ color: MyColors.onPrimary }}
            onPress={() => props.navigation.navigate("Booking Calendar")}
            icon={({ focused, size }) => (
              <MaterialIcons
                name="event-note"
                size={size}
                color={MyColors.onPrimary}
              />
            )}
          />
        )}
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text
            style={{
              color: MyColors.primary,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Events
          </Text>
        </View>
        {Array.isArray(bookingEvent) &&
          bookingEvent.map((item) => (
            <DrawerItem
              key={item.id}
              label={item.name}
              style={[
                DrawerScreenStyle.menu,
                { backgroundColor: MyColors.primary }
              ]}
              labelStyle={{ color: MyColors.onPrimary }}
              onPress={() =>
                props.navigation.navigate("Bogathon", {
                  screen: "Bookinglist",
                  params: { event_id: item.id }
                })
              }
              icon={({ focused, size }) => (
                <MaterialCommunityIcons
                  name="clipboard-text-clock"
                  size={size}
                  color={focused ? "#074365" : MyColors.onPrimary}
                />
              )}
            />
          ))}
      </View>

      <View style={{ flex: 0.5 }}>
        <DrawerItem
          label="Logout"
          style={[
            DrawerScreenStyle.menu,
            { backgroundColor: MyColors.secondary }
          ]}
          onPress={() => props.navigation.navigate("Logout")}
          icon={({ size }) => (
            <MaterialIcons
              name="logout"
              size={size}
              color={MyColors.onPrimary}
            />
          )}
          labelStyle={{ color: MyColors.onPrimary }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
