import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React from "react";
import { HomeStyle } from "../style/HomeStyle";
import { wp } from "../style/Dimensions";
import { MyColors } from "../style/MyColors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ScanButton = ({ buttonText, onPressed }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end"
      }}
    >
      <TouchableOpacity
        onPress={onPressed}
        style={{
          backgroundColor: "#ffffff",
          ...HomeStyle.scanButton,
          width: wp(28)
        }}
      >
        <Text style={{ color: MyColors.primary, ...HomeStyle.scanButtonText }}>
          {buttonText}
        </Text>
        <View style={HomeStyle.iconContainer}>
          <Ionicons
            name="qr-code-outline"
            size={responsiveFontSize(4)}
            color={MyColors.primary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScanButton;

const styles = StyleSheet.create({});
