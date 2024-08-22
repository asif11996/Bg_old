import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenStyle from "../style/DrawerScreenStyle";

const DrawerHeader = ({ user }) => {
  return (
    <>
      <View style={DrawerScreenStyle.header}>
        <Text style={DrawerScreenStyle.headerText}>{user.name}</Text>
        <Text style={DrawerScreenStyle.emailText}>{user.email}</Text>
      </View>
      <View style={DrawerScreenStyle.borderLine} />
    </>
  );
};

export default DrawerHeader;
