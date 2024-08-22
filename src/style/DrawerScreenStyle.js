import { StyleSheet } from "react-native";
import { MyColors } from "./MyColors";
import { constant } from "../constants/constants";

export default DrawerScreenStyle = StyleSheet.create({
  header: {
    flex: 0.5,
    // backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: MyColors.primary,
    fontWeight: "bold",
    fontSize: 16
    // marginBottom: 4
  },
  emailText: {
    color: MyColors.primary,
    fontWeight: "500",
    fontSize: 12
    // marginBottom: 4
  },
  borderLine: {
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginBottom: 10
  },
  menu: {
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderRadius: constant.borderRadius
  }
});
