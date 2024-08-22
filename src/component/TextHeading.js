import React from "react";
import { View, Text } from "react-native";
import { wp } from "../style/Dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { normalize } from "react-native-elements";
import { MyColors } from "../style/MyColors";

export default function TextHeading({ title, color }) {
  return (
    <>
      {color == "first" ? (
        <Text
          style={{
            marginHorizontal: 5,
            // backgroundColor: "#121212",
            color: "#ffffff",
            fontSize: normalize(15),
            fontWeight: "bold",
            color: MyColors.primary,

            //   fontWeight: '700',
            paddingBottom: 5
          }}
        >
          {title}
        </Text>
      ) : (
        <Text
          style={{
            marginHorizontal: 5,
            // backgroundColor: "#121212",
            // color: "#9e9e9e",
            fontWeight: "bold",
            color: MyColors.primary,
            //   fontWeight: '700',
            fontSize: normalize(13),
            paddingBottom: 5
          }}
        >
          {title}
        </Text>
      )}
    </>
  );
}
