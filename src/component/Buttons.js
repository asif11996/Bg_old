import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { hp, wp } from "../style/Dimensions";

export default function Buttons({
  onPresses,
  bg,
  textColor,
  title,
  heights,
  widths,
  border,
  disable
}) {
  return disable ? (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: bg,
        height: heights,
        width: widths,
        borderRadius: border,
        justifyContent: "center",
        alignItems: "center"
      }}

      // onPress={onPresses}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: hp(1.7),
          color: textColor,
          fontWeight: "700"
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: bg,
        height: heights,
        width: widths,
        borderRadius: border,
        justifyContent: "center",
        alignItems: "center"
      }}
      onPress={onPresses}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: hp(1.7),
          color: "white",
          fontWeight: "700"
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
