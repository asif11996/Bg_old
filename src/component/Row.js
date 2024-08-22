import React from "react";
import { View } from "react-native";
import Styles from "../style/Styles";

const Row = ({ children, backgroundColor, style }) => {
  return (
    <View style={[Styles.rowView, { backgroundColor }, style]}>{children}</View>
  );
};

export default Row;
