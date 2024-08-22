import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import {Ionicons} from '@expo/vector-icons'; // You may need to install the appropriate icon library
import Ionicons from "react-native-vector-icons/Ionicons";
import { MyColors } from "../style/MyColors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { hp, wp } from "../style/Dimensions";
import { normalize } from "react-native-elements";
import useOrientation from "./useOrientation";

const HeaderComponent = ({
  title,
  onBackPress,
  onMenuPress,
  qr,
  color,
  link,
  backButtonColor,
  data,
  waiverLink
}) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const { height, width } = useOrientation();

  const copyToClipboard = () => {
    onMenuPress();
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 1000); // Hide message after 3 seconds
  };
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
        // backgroundColor: title ? MyColors.primary : '',
        ...styles.headerContainer,
        backgroundColor: color ? color : "",
        height: width > height ? normalize(40) : normalize(40)
      }}
    >
      <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
        <Ionicons
          name="arrow-back"
          size={responsiveFontSize(3)}
          color={
            color || (Platform.OS === "ios" && !backButtonColor) || data
              ? MyColors.primary
              : "#ffffff"
          }
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      {link && waiverLink ? (
        <TouchableOpacity
          onPress={copyToClipboard}
          style={{
            backgroundColor: MyColors.primary,
            width: wp(25),
            marginTop: normalize(5),
            paddingVertical: normalize(7),
            borderRadius: normalize(3),
            justifyContent: "center",
            alignItems: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: normalize(11),
              fontWeight: "bold",
              color: "white",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5
            }}
          >
            {"Waiver Link"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {showCopiedMessage && (
        <View
          style={{
            height: normalize(15),
            width: "auto",
            flexDirection: "row",
            // alignSelf: "center",
            // backgroundColor: " red",
            justifyContent: "center",
            alignItems: "center",
            top: normalize(40),
            alignSelf: "center",
            right: wp(60),
            position: "absolute"
          }}
        >
          <Text style={styles.copiedMessage}>Link copied to clipboard!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16

    // backgroundColor: '#5683f6',
    // elevation: 4, // Android shadow
    // shadowColor: '#000000', // iOS shadow
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  iconContainer: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    color: "#ffffff"
  },
  copiedMessage: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: normalize(20),
    fontSize: responsiveFontSize(2),
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    color: "white"
  }
});

export default HeaderComponent;
