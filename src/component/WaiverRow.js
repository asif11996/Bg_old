import { StyleSheet, Text, View, ScrollView } from "react-native";
BookingWaiverStyle;
import React from "react";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import useOrientation from "./useOrientation";
import { hp, wp } from "../style/Dimensions";

const WaiverRow = ({ bookingdetails, name, type, maxWidth }) => {
  const { width, height, orientation } = useOrientation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
        paddingHorizontal: 10
        // backgroundColor: "yellow"
      }}
    >
      {/* <MaterialCommunityIcons
        // style={BookingStyle.keftIcon}
        style={BookingWaiverStyle.iconStyle}
        name={"email"}
        size={responsiveFontSize(3)}
      /> */}
      <Icon
        name={name}
        type={type}
        // size={30}
        // color="purple"
        style={BookingWaiverStyle.iconStyle}
        onPress={() => {}}
      />
      <View style={BookingWaiverStyle.cardItemValue}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
          style={{
            marginEnd: 4,
            // width: "flexGrow"
            maxWidth: maxWidth
          }}
        >
          <Text style={BookingStyle.title}>{bookingdetails}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default WaiverRow;

const styles = StyleSheet.create({});
