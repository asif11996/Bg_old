import React from "react";
import { View } from "react-native";
import styles from "../style/Styles";

const Container = ({ children, backgroundColor, style }) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );
};

export default Container;
