import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BookingStyle from "../style/BookingStyle";

const Heading = ({ title }) => {
  return (
    <View style={BookingStyle.emptyContainer}>
      <Text style={BookingStyle.emptyContainerText}>{title}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({});
