import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";

import HeaderComponent from "../component/HeaderComponent";
import { hp, wp } from "../style/Dimensions";
import TextView from "../component/TextView";

import { MyColors } from "../style/MyColors";
import ActivityIndicatorComponent from "../component/ActivityIndicatorComponent";
import { normalize } from "react-native-elements";
import HeaderCircle from "../component/HeaderCircle";

const LatestBookingDetails = ({ navigation, route, id }) => {
  const { BookingItem, otherParam } = route.params;
  const { booking, bookingdetail, message, error, loading } = useSelector(
    (state) => state.bookinglist
  );

  console.log(
    "latest booking details is =======================>",
    BookingItem
  );

  const dispatch = useDispatch();

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={styles.container}>
      <HeaderCircle />

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() =>
          navigation.navigate("HomeScreen") && dispatch(clearState())
        }
        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: hp(10),
          paddingBottom: normalize(20)
        }}
      >
        <Text
          style={{
            color: MyColors.primary,
            fontSize: 20,
            fontWeight: "800",
            paddingBottom: normalize(10)
          }}
        >
          Booking Details
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10
            // marginTop: Platform.OS == "android" ? normalize(30) : 0
          }}
        >
          <TextView
            text={BookingItem?.first_name + " " + BookingItem?.last_name}
            heading={"Name"}
          />

          <TextView text={BookingItem?.email} heading={"Email"} />
          <TextView text={BookingItem?.phone} heading={"Phone"} />

          <TextView text={BookingItem?.event_id} heading={"Event Id"} />
          <TextView
            text={BookingItem?.booking_number}
            heading={"Booking Number"}
          />
          <TextView text={BookingItem?.booking_date} heading={"Booking Date"} />

          <TextView text={BookingItem?.time_slot} heading={"Time Slot"} />
          <TextView text={BookingItem?.group_name} heading={"Group Name"} />
          <TextView
            text={BookingItem?.total_participants}
            heading={"Total Participants"}
          />
          <TextView text={BookingItem?.unit_price} heading={"Unit Price"} />

          <TextView text={BookingItem?.total_price} heading={"Total Price"} />
          <TextView
            text={BookingItem?.completed_waiver_count}
            heading={"Completed Waivers"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LatestBookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: hp(2)
    // padding: 16,
    // justifyContent: 'center',
  },
  textStyle: {
    height: hp(6),
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: wp(3)
  }
});
