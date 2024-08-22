import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import useOrientation from "./useOrientation";
import { normalize } from "react-native-elements";
import { MyColors } from "../style/MyColors";
import { SafeAreaView } from "react-native-safe-area-context";

const HeaderCircle = () => {
  const { height, width, orientation } = useOrientation();

  return (
    <SafeAreaView
      style={{
        height: normalize(height > 1000 || width > 1000 ? 250 : normalize(200)),
        width: normalize(height > 1000 || width > 1000 ? 250 : normalize(200)),
        backgroundColor: Platform.OS === "ios" ? "" : MyColors.primary, // Corrected Platform.OS usage
        borderRadius: normalize(height > 1000 || width > 1000 ? 125 : 95),

        position: "absolute",
        top: 0,
        left: -normalize(height > 1000 || width > 1000 ? 105 : 80),
        top: -normalize(height > 1000 || width > 1000 ? 105 : 80)
      }}
    ></SafeAreaView>
  );
};

export default HeaderCircle;

const styles = StyleSheet.create({});
