// component/CustomTextInput.js
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { MyColors } from "../style/MyColors";
import { normalize } from "react-native-elements";
import { hp, wp } from "../style/Dimensions";

const CustomLoginInput = ({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  setIsPasswordSecure,
  eyeIcon
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      style={styles.input}
      mode="outlined"
      outlineColor={MyColors.primary}
      activeOutlineColor={MyColors.primary}
      contentStyle={{ height: normalize(50), lineHeight: normalize(15) }}
      placeholder={label}
      secureTextEntry={secureTextEntry}
      right={
        eyeIcon &&
        secureTextEntry !== undefined && (
          <TextInput.Icon
            icon={secureTextEntry ? "eye" : "eye-off"}
            onPress={() => setIsPasswordSecure((prev) => !prev)}
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              height: normalize(50),
              marginTop: normalize(14)
            }}
          />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: normalize(16),
    height: normalize(50),
    lineHeight: normalize(50),
    padding: 0
  }
});

export default CustomLoginInput;
