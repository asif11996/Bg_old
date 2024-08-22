import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import BookingStyle from "../style/BookingStyle";
import useOrientation from "./useOrientation";
import { normalize } from "react-native-elements";

const SearchBar = ({ setSearchQuery, searchQuery }) => {
  const { height, width } = useOrientation();

  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  return (
    <View>
      <TextInput
        style={{
          ...BookingStyle.searchBar,
          width: wp(95),
          height: normalize(40),
          marginBottom: hp(3)
        }}
        placeholder="Search"
        placeholderTextColor={"#074365"}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
