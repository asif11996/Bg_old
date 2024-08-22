import { MyColors } from "./MyColors";
import { normalize } from "react-native-elements";
import { StyleSheet, Dimensions, Alert } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions"; // alert(itemId);
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
// alert(windowWidth);
const { wp, hp } = require("./Dimensions");

export default BookingStyle = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "white"
  },
  imgbackground: {
    flex: 1,
    // height: hp(42),
    height: windowHeight > 800 ? hp(42) : hp(45),

    backgroundColor: MyColors.primary
    // backgroundColor: "#121212",
  },
  headerStyle: {
    backgroundColor: "rgba(245, 0, 0, 0.5)",
    flex: 1
  },
  cardStyle: {
    // flex: 1,
    // height: hp(70),

    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red",
  },
  card: {
    // width: responsiveWidth(92),
    // width: wp(72),

    // height: windowHeight > 800 ? responsiveHeight(32) : hp(32),
    // flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 10,
    // padding: 5,
    backgroundColor: MyColors.onPrimary,
    marginTop: windowHeight > 800 ? hp(3) : hp(0),

    // alignItems: 'center',
    borderRadius: normalize(8),
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  cardItemContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "space-between"

    // width: wp(90)
  },
  cardItemStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    paddingHorizontal: normalize(10),
    marginTop: normalize(10)
    // marginBottom: normalize(5)
    // backgroundColor: "red",
  },
  iconStyle: {
    color: "grey",
    paddingHorizontal: normalize(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: normalize(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  cardItemValue: {
    height:
      windowWidth > 1200
        ? normalize(40)
        : windowHeight > 800
        ? normalize(45)
        : normalize(30),

    flexDirection: "row",
    // borderWidth: 0.3,
    // height: responsiveHeight(5),
    padding: normalize(5),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: normalize(5),
    borderColor: "grey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  switchButtonStyle: {
    height:
      windowWidth > 1000
        ? normalize(50)
        : windowHeight > 800
        ? hp(5.3)
        : normalize(40),
    // width: wp(32),
    // backgroundColor: "#3155A5",

    // backgroundColor: !showTransaction ? MyColors.secondary : "#ffffff",
    // borderRadius: hp(4),
    borderTopLeftRadius: normalize(10),
    borderBottomLeftRadius: normalize(10),
    borderWidth: normalize(1),
    justifyContent: "center"
    // paddingVertical: normalize(20)
  },
  secondswitchButtonStyle: {
    height:
      windowWidth > 1000
        ? normalize(50)
        : windowHeight > 800
        ? hp(5.3)
        : normalize(40),
    // width: wp(32),
    // backgroundColor: "#D14E52",
    borderTopRightRadius: normalize(10),
    borderBottomRightRadius: normalize(10),
    borderWidth: 1,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // paddingRight: wp(6),
    // alignSelf: "center",
  },
  switchButtonText: {
    textAlign: "center",
    fontSize: responsiveFontSize(1.7),
    fontFamily: "OpenSans-Bold",
    fontWeight: "bold"
  },
  second_switchButtonText: {
    color: "white",
    // fontSize: 12,

    fontFamily: "OpenSans-Bold",
    textAlign: "center",
    fontWeight: "bold"
  },
  transactionItem: {
    flexDirection: "row",
    marginBottom: 4,
    padding: 5,
    height: normalize(96),
    // width: wp(97),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: normalize(8),
    shadowColor: "grey",
    // shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: normalize(8),
    elevation: normalize(4),
    zIndex: normalize(4)
  },
  transactionImgStyle: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    shadowColor: "#000",
    backgroundColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84

    // elevation: 5
  },
  price: {
    marginTop: normalize(5),
    position: "absolute",
    end: 0,
    bottom: 0,
    padding: normalize(10),
    margin: normalize(8),
    fontSize: responsiveFontSize(2),
    fontFamily: "Avenir-Heavy",
    color: "#EE5A55"
  }
});
