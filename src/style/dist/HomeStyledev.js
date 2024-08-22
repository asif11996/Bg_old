"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeStyle = void 0;

var _reactNative = require("react-native");

var _reactNativeElements = require("react-native-elements");

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _Dimensions = require("./Dimensions");

var _MyColors = require("./MyColors");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var HomeStyle = _reactNative.StyleSheet.create({
  iconContainer: {
    padding: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(1)
  },
  scanButton: _defineProperty(
    {
      alignSelf: "flex-end",
      height: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(7),
      borderRadius: (0, _reactNativeElements.normalize)(10),
      marginHorizontal: (0, _reactNativeElements.normalize)(10),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    "marginHorizontal",
    (0, _reactNativeElements.normalize)(20)
  ),
  scanButtonText: {
    fontWeight: "bold",
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2)
  },
  headerText: {
    // fontSize: responsiveFontSize(2),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2),
    color: "#e1e0e1"
  },
  latestListHeader: {
    flex: 2,
    top: (0, _reactNativeElements.normalize)(-20),
    height: "35%",
    backgroundColor: "white",
    borderTopLeftRadius: (0, _reactNativeElements.normalize)(20),
    borderTopRightRadius: (0, _reactNativeElements.normalize)(20)
  },
  listHeadingStyle: {
    flexDirection: "column",
    margin: (0, _reactNativeElements.normalize)(6),
    padding: (0, _reactNativeElements.normalize)(6),
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  listHeadingText: {
    fontSize: 20,
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: _MyColors.MyColors.primary
  },
  latestBookingHeader: {
    flex: 1.7,
    top: -20,
    height: "30%",
    backgroundColor: "white",
    borderTopLeftRadius: (0, _reactNativeElements.normalize)(20),
    borderTopRightRadius: (0, _reactNativeElements.normalize)(20)
  }
});

exports.HomeStyle = HomeStyle;
