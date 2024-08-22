import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  SafeAreaP
} from "react-native";
import React from "react";

import { hp, wp } from "../style/Dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import useOrientation from "./useOrientation";

const InputTexts = ({
  placeHolders,
  keyboardTypes,
  values,
  onChangeTexts,
  secureTextEntries,
  editables,
  IconName,
  IconType,
  size,
  eyeicons,
  types,
  key
}) => {
  const { width, height } = useOrientation();

  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  return (
    <View
      style={{
        ...styles.input,
        height: width > height ? hp(12) : hp(6.5),
        alignSelf: "center",
        width: wp(96)
      }}
    >
      {/* <Icon
        color={'#3155a5'}
        name={IconName}
        type={IconType}
        size={size}
        onPress={() => {}}
      /> */}

      <TextInput
        // key={key}
        style={{
          // paddingHorizontal: wp(2),
          // width: wp(96),
          paddingRight: wp(5),
          flex: 1,
          // width: '84%',
          color: "#636262",
          fontSize: responsiveFontSize(1.5)
          // backgroundColor:'red',
          // placeholderTextColor: "",

          // height: wp(7),
        }}
        // style={Platform.OS == "ios" ? loginStyle.inputIos : loginStyle.input}
        onChangeText={onChangeTexts}
        value={values}
        placeholderTextColor={"grey"}
        placeholder={placeHolders}
        keyboardType={keyboardTypes}
        // secureTextEntry={password ? secureTextEntries : false}
        rejectResponderTermination={true}
        spellCheck={true}
        editable={editables}
      />
      {/* <Icon
      // name={eyeicons ? eyeIcon : ""}
      type={types}
      size={size}
      style={{ paddingVertical: hp(2), paddingRight: wp(3.5) }}
      onPress={() => {
        changeIcon();
      }}
    /> */}
    </View>
  );
};

export default InputTexts;

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: wp(2),
    shadowColor: "#000",
    borderRadius: wp(1.5),
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2
  }
});
