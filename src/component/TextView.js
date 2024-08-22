import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "../style/Dimensions";
import TextHeading from "./TextHeading";
import { normalize } from "react-native-elements";

const TextView = ({ text, heading }) => {
  return (
    <>
      <TextHeading title={heading} />

      <View style={styles.textStyle}>
        <Text style={{ color: "grey" }}>{text}</Text>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'grey'}}>{text}</Text>
          <TextHeading title={heading} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'grey'}}>{text}</Text>
          <TextHeading title={heading} />
        </View> */}
      </View>
    </>
  );
};

export default TextView;

const styles = StyleSheet.create({
  textStyle: {
    height: normalize(40),
    backgroundColor: "#ffffff",
    // borderWidth:0.5,
    borderColor: "grey",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: wp(3),
    marginBottom: 5,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5
  }
});
