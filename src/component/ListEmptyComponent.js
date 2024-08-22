import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp } from "../style/Dimensions";

const ListEmptyComponent = () => {
  return (
    <View
      style={{
        height: hp(35),
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontWeight: "bold" }}>No bookings found</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({});
