import { StyleSheet } from "react-native";
import { normalize } from "react-native-elements";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { MyColors } from "./MyColors";

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  imgBackground: {
    flex: 1,
    height: normalize(240)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(16),
    height: normalize(60)
  },
  iconContainer: {
    padding: normalize(8)
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    color: MyColors.onPrimary
  },

  iconContainer: {
    padding: responsiveFontSize(1)
  },
  scanButton: {
    alignSelf: "flex-end",
    height: responsiveFontSize(7),
    borderRadius: normalize(10),
    marginHorizontal: normalize(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize(20)
  },
  scanButtonText: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2)
  },
  headerText: {
    // fontSize: responsiveFontSize(2),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),

    color: MyColors.onPrimary
  },

  latestListHeader: {
    flex: 2,
    top: normalize(-20),
    height: "35%",

    backgroundColor: "white",
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20)
  },
  listHeadingStyle: {
    flexDirection: "column",
    margin: normalize(6),
    padding: normalize(6),
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  listHeadingText: {
    fontSize: 20,
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: MyColors.primary
  },
  latestBookingHeader: {
    flex: 1.7,
    top: -20,
    height: "30%",

    backgroundColor: MyColors.onTertiary,
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20)
  }
});
export { HomeStyle };
