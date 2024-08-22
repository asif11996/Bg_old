import { Dimensions, StyleSheet } from "react-native";
import { normalize } from "react-native-elements";
// import { responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { hp, wp } from "./Dimensions";
import { MyColors } from "./MyColors";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  loginButton: {
    height: hp(6),
    width: wp(35),
    borderRadius: hp(3.5),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp(5),
    shadowColor: MyColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: normalize(14),
    fontWeight: "600",
  },
  snackMessage: {
    marginTop: hp(6),
  },
});
export { LoginStyle };
