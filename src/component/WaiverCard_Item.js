import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WaiverRow from "./WaiverRow";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import useOrientation from "./useOrientation";

const WaiverCard_Item = ({
  bookingdetails,
  name,
  type,
  maxWidth,
  second,
  second_bookingdetails,
  second_name,
  second_type
}) => {
  const { width, height, orientation } = useOrientation();

  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }
  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  return (
    <View
      style={{
        ...BookingWaiverStyle.cardItemContainer,
        width: wp(90),
        marginTop: hp(0.5)
      }}
    >
      {/* <AntDesign
        style={BookingStyle.keftIcon}
        name="rightcircle"
        size={20}
      /> */}
      <WaiverRow
        bookingdetails={bookingdetails}
        name={name}
        type={type}
        maxWidth={maxWidth}
      />

      {second && (
        <WaiverRow
          bookingdetails={second_bookingdetails}
          name={second_name}
          type={second_type}
          maxWidth={maxWidth}
        />
      )}
      {/* <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
        paddingHorizontal: 10,
        backgroundColor: "yellow"
      }}
    >
      <MaterialCommunityIcons
        // style={BookingStyle.keftIcon}
        style={BookingWaiverStyle.iconStyle}
        name="email"
        size={responsiveFontSize(3)}
      />
      <View
        style={BookingWaiverStyle.cardItemValue}
        // style={{
        //   flexDirection: "row",
        //   // borderWidth: 0.3,
        //   height: responsiveHeight(6),

        //   padding: 5,
        //   backgroundColor: "white",
        //   borderRadius: 5,
        //   borderColor: "grey",
        //   alignItems: "center",
        //   shadowColor: "#000",
        //   shadowOffset: {
        //     width: 0,
        //     height: 2
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 3.84,

        //   elevation: 5
        // }}
      >
        <Text style={BookingStyle.title}>
          {bookingdetails?.email}
        </Text>
      </View>
    </View> */}
    </View>
  );
};

export default WaiverCard_Item;

const styles = StyleSheet.create({});
