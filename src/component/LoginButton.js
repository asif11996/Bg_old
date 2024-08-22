import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import appTheme from "./../constants/theme";
import { hp, wp } from "../style/Dimensions";
import { normalize } from "react-native-elements";

const LoginButton = (onPress, email, password) => {
  let MyColors = appTheme.COLORS;

  return (
    <TouchableOpacity
      disabled={email !== "" && password !== "" ? false : true}
      disabledStyle={{ backgroundColor: "#999999" }}
      onPress={onPress}
      style={{
        height: hp(6),
        width: wp(35),
        color: MyColors.primary,

        backgroundColor:
          email !== "" && password !== "" ? MyColors.primary : "#999999",

        shadowColor: MyColors.primary,
        borderRadius: hp(3.5),
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: hp(5)
      }}
    >
      <Text
        style={{
          color: "#ffff",
          fontSize: normalize(14),
          fontWeight: "600"
        }}
      >
        LOGIN
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({});
