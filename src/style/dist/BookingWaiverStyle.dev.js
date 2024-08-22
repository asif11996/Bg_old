"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MyColors = require("./MyColors");

var _reactNativeElements = require("react-native-elements");

var _reactNative = require("react-native");

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

// alert(itemId);
var windowHeight = _reactNative.Dimensions.get("window").height;

var windowWidth = _reactNative.Dimensions.get("window").width; // alert(windowWidth);


var _require = require("./Dimensions"),
    wp = _require.wp,
    hp = _require.hp;

var _default = BookingStyle = _reactNative.StyleSheet.create({
  container: {
    flex: 1 // backgroundColor: "white"

  },
  imgbackground: {
    flex: 1,
    // height: hp(42),
    height: windowHeight > 800 ? hp(42) : hp(45),
    backgroundColor: _MyColors.MyColors.primary // backgroundColor: "#121212",

  },
  headerStyle: {
    backgroundColor: "rgba(245, 0, 0, 0.5)"
  },
  cardStyle: {
    // flex: 1,
    // height: hp(70),
    justifyContent: "center",
    alignItems: "center" // backgroundColor: "red",

  },
  card: {
    // width: responsiveWidth(92),
    // width: wp(72),
    // height: windowHeight > 800 ? responsiveHeight(32) : hp(32),
    // flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 10,
    // padding: 5,
    backgroundColor: "white",
    marginTop: windowHeight > 800 ? hp(3) : hp(0),
    // alignItems: 'center',
    borderRadius: (0, _reactNativeElements.normalize)(8),
    shadowColor: "#000",
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
    justifyContent: "space-between" // width: wp(90)

  },
  cardItemStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    paddingHorizontal: (0, _reactNativeElements.normalize)(10),
    marginTop: (0, _reactNativeElements.normalize)(10),
    marginBottom: (0, _reactNativeElements.normalize)(5) // backgroundColor: "red",

  },
  iconStyle: {
    color: "grey",
    padding: (0, _reactNativeElements.normalize)(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: (0, _reactNativeElements.normalize)(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardItemValue: {
    height: windowWidth > 1200 ? (0, _reactNativeElements.normalize)(40) : windowHeight > 800 ? (0, _reactNativeElements.normalize)(45) : (0, _reactNativeElements.normalize)(30),
    flexDirection: "row",
    // borderWidth: 0.3,
    // height: responsiveHeight(5),
    padding: (0, _reactNativeElements.normalize)(5),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: (0, _reactNativeElements.normalize)(5),
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
    height: windowWidth > 1000 ? (0, _reactNativeElements.normalize)(50) : windowHeight > 800 ? hp(5.3) : (0, _reactNativeElements.normalize)(40),
    // width: wp(32),
    // backgroundColor: "#3155A5",
    // backgroundColor: !showTransaction ? MyColors.secondary : "#ffffff",
    // borderRadius: hp(4),
    borderTopLeftRadius: (0, _reactNativeElements.normalize)(10),
    borderBottomLeftRadius: (0, _reactNativeElements.normalize)(10),
    borderWidth: (0, _reactNativeElements.normalize)(1),
    justifyContent: "center" // paddingVertical: normalize(20)

  },
  secondswitchButtonStyle: {
    height: windowWidth > 1000 ? (0, _reactNativeElements.normalize)(50) : windowHeight > 800 ? hp(5.3) : (0, _reactNativeElements.normalize)(40),
    // width: wp(32),
    // backgroundColor: "#D14E52",
    borderTopRightRadius: (0, _reactNativeElements.normalize)(10),
    borderBottomRightRadius: (0, _reactNativeElements.normalize)(10),
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center" // paddingRight: wp(6),
    // alignSelf: "center",

  },
  switchButtonText: {
    textAlign: "center",
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(1.7),
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
    height: (0, _reactNativeElements.normalize)(96),
    // width: wp(97),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: (0, _reactNativeElements.normalize)(8),
    shadowColor: "grey",
    // shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: (0, _reactNativeElements.normalize)(8),
    elevation: (0, _reactNativeElements.normalize)(4),
    zIndex: (0, _reactNativeElements.normalize)(4)
  },
  transactionImgStyle: {
    width: (0, _reactNativeElements.normalize)(50),
    height: (0, _reactNativeElements.normalize)(50),
    borderRadius: (0, _reactNativeElements.normalize)(25),
    shadowColor: "#000",
    backgroundColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  price: {
    marginTop: (0, _reactNativeElements.normalize)(5),
    position: "absolute",
    end: 0,
    bottom: 0,
    padding: (0, _reactNativeElements.normalize)(10),
    margin: (0, _reactNativeElements.normalize)(8),
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2),
    fontFamily: "Avenir-Heavy",
    color: "#EE5A55"
  }
});

exports["default"] = _default;