import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { COLORS } from "../constants";
import { HomeStyle } from "../style/HomeStyle";

const Header = ({ title, onBackPress, onMenuPress, qr }) => {
  return (
    <View
      style={{
        // backgroundColor: qr ? "rgba(63, 4, 0, 0.5)" : "",
        ...HomeStyle.headerContainer
      }}
    >
      <TouchableOpacity onPress={onBackPress} style={HomeStyle.iconContainer}>
        <Entypo
          name="menu"
          size={responsiveFontSize(4)}
          color={COLORS.onPrimary}
        />
      </TouchableOpacity>
      <Text style={HomeStyle.headerText}>{title}</Text>
      {qr ? (
        <TouchableOpacity onPress={onMenuPress} style={HomeStyle.iconContainer}>
          {/* <Ionicons name="qr-code-outline" size={28} color="#ffffff" /> */}
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

export default Header;
