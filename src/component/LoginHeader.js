import { StyleSheet, Text, View } from "react-native";
import React from "react";
import appTheme from "../constants/theme";
import { logo } from "./../constants/images";
import LoginLogo from "./LoginLogo";
import { normalize } from "react-native-elements";
import { hp, wp } from "../style/Dimensions";

const LoginHeader = ({ isKeyboardVisible }) => {
  let MyColors = appTheme.COLORS;

  return (
    <View>
      <View
        style={{
          // backgroundColor: '#3f5c83',
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <LoginLogo
          logoHeight={10}
          logoWidth={2}
          logo={require("../style/assets/logo.png")}
        />
      </View>

      {isKeyboardVisible ? (
        <View style={{ paddingVertical: hp(3) }}>
          <Text
            style={{
              color: MyColors.primary,
              fontSize: 18,
              fontWeight: "600",
              paddingLeft: 0,
              paddingBottom: hp(1),
              paddingTop: hp(8)
              // backgroundColor: 'green',
            }}
          >
            Welcome!
          </Text>
          <Text
            style={{
              color: MyColors.primary,
              fontSize: 20,
              fontWeight: "800",
              paddingBottom: hp(5)
            }}
          >
            Login
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: MyColors.primary,
              fontSize: normalize(18),
              fontWeight: "600",
              paddingBottom: hp(1),
              paddingTop: hp(8)
              // backgroundColor: 'green',
            }}
          >
            Welcome!
          </Text>
          <Text
            style={{
              color: MyColors.primary,
              fontSize: normalize(20),
              fontWeight: "800",
              paddingBottom: hp(5)
            }}
          >
            Login
          </Text>
        </View>
      )}
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({});
