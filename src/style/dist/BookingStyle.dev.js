"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _MyColors = require("./MyColors");

var _reactNativeElements = require("react-native-elements");

var _reactNative = require("react-native");

var _Dimensions = require("./Dimensions");

var _card, _bookingcard, _StyleSheet$create;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var windowHeight = _reactNative.Dimensions.get("window").height;

var _default = BookingStyle = _reactNative.StyleSheet.create((_StyleSheet$create = {
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: (0, _reactNativeElements.normalize)(80)
  },
  searchBar: {
    backgroundColor: "white",
    // borderWidth: 1,
    borderRadius: 5,
    // borderColor:'#074365',
    // marginBottom: 10,
    padding: (0, _reactNativeElements.normalize)(10),
    height: windowHeight > 800 ? (0, _Dimensions.hp)(5) : (0, _Dimensions.hp)(7),
    // marginHorizontal: 5,
    // width: wp(95),
    alignSelf: "center",
    color: "#074365"
  },
  emptyContainer: {
    flexDirection: "column",
    margin: (0, _reactNativeElements.normalize)(6),
    padding: (0, _reactNativeElements.normalize)(6),
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  emptyContainerText: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2.5),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: _MyColors.MyColors.primary
  },
  flatListContainer: {
    alignItems: "center",
    padding: (0, _reactNativeElements.normalize)(20),
    paddingBottom: (0, _reactNativeElements.normalize)(30),
    paddingHorizontal: (0, _Dimensions.wp)(20) // backgroundColor: "green"

  },
  flatListItem: {
    flexDirection: "row",
    marginBottom: (0, _reactNativeElements.normalize)(8),
    // marginHorizontal: normalize(20),
    // padding: normalize(8),
    paddingVertical: (0, _reactNativeElements.normalize)(8),
    backgroundColor: "white",
    // alignItem s: 'center',
    borderRadius: 8,
    shadowColor: "grey",
    // shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5
  },
  itemNameView: {
    // paddingTop: 10,
    paddingLeft: (0, _reactNativeElements.normalize)(10) // flexDirection: 'row',
    // justifyContent: 'space-between',

  },
  itemPriceRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 0 // backgroundColor: "red",
    // height: normalize(40),
    // top: -10,

  },
  priceView: {
    padding: 0,
    width: (0, _Dimensions.wp)(35),
    // paddingHorizontal: normalize(15),
    // justifyContent: 'space-between',
    alignItems: "center",
    // alignSelf: 'center',
    // backgroundColor: "#F1EFEF",
    // borderRadius: normalize(10),
    flexDirection: "row" // margin: normalize(4)

  },
  waiverView: {
    shadowColor: "yellow",
    padding: 0,
    // backgroundColor: "green",
    // elevation: 4,
    // height: 25,
    // height: hp(4.2),
    // height: windowHeight > 800 ? hp(3.5) : hp(6.2),
    // width: wp(35),
    paddingHorizontal: (0, _reactNativeElements.normalize)(10),
    // justifyContent: 'space-between',
    alignItems: "center",
    // backgroundColor: "green",
    // alignSelf: 'center',
    // backgroundColor: "#F1EFEF",
    borderRadius: (0, _reactNativeElements.normalize)(10),
    flexDirection: "row",
    margin: (0, _reactNativeElements.normalize)(4)
  },
  DateView: {
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "space-around",
    // width: wp(86),s
    alignSelf: "centers",
    // backgroundColor:'red',
    // width: wp(95),
    paddingBottom: (0, _reactNativeElements.normalize)(3) // paddingHorizontal: 20,
    // backgroundColor: 'blue',

  },
  DataViewValue: {
    flexDirection: "row",
    // borderWidth: 0.3,
    height: (0, _reactNativeElements.normalize)(35),
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
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
  itemTotalPartitions: {
    flexDirection: "row",
    height: (0, _reactNativeElements.normalize)(48),
    // width: wp(80),
    paddingTop: (0, _reactNativeElements.normalize)(2),
    alignSelf: "center",
    marginTop: (0, _reactNativeElements.normalize)(10),
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    // alignItems: 'stretch',
    // alignSelf: 'center',
    backgroundColor: "#eaeaed",
    // borderRadius: 50,
    // margin: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  h2: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2),
    fontWeight: "bold",
    fontFamily: "Avenir-Heavy",
    color: _MyColors.MyColors.tertiary
  },
  h3: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2.5),
    fontWeight: "bold",
    fontFamily: "Avenir-Heavy",
    color: _MyColors.MyColors.tertiary
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2
  },
  name: {
    fontFamily: "Verdana",
    fontSize: 18
  },
  floatingButton: {
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3F4EA5",
    //#3F4EA5, #ee6e73
    position: "absolute",
    bottom: 10,
    right: 10
  },
  plus: {
    alignSelf: "center",
    color: "white",
    fontSize: 22
  },
  card: (_card = {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: "row",
    marginBottom: 8,
    padding: 5,
    height: 93,
    width: (0, _Dimensions.wp)(96),
    backgroundColor: "white",
    // alignItem s: 'center',
    borderRadius: 8,
    shadowColor: "#000"
  }, _defineProperty(_card, "shadowColor", "black"), _defineProperty(_card, "shadowOffset", {
    width: 0,
    height: 4
  }), _defineProperty(_card, "shadowOpacity", 0.5), _defineProperty(_card, "shadowRadius", 8), _defineProperty(_card, "elevation", 4), _defineProperty(_card, "zIndex", 5), _card),
  bookingcard: (_bookingcard = {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: "row",
    marginBottom: 8,
    padding: 5,
    // height: 93,
    width: (0, _Dimensions.wp)(96),
    backgroundColor: "white",
    height: (0, _Dimensions.hp)(20),
    // alignItem s: 'center',
    borderRadius: 8,
    shadowColor: "#000"
  }, _defineProperty(_bookingcard, "shadowColor", "black"), _defineProperty(_bookingcard, "shadowOffset", {
    width: 0,
    height: 4
  }), _defineProperty(_bookingcard, "shadowOpacity", 0.5), _defineProperty(_bookingcard, "shadowRadius", 8), _defineProperty(_bookingcard, "elevation", 4), _defineProperty(_bookingcard, "zIndex", 5), _bookingcard),
  headertitle: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2.5),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: Platform.OS === "ios" ? _MyColors.MyColors.primary : "#ffffff",
    paddingHorizontal: 5
  },
  title_bold: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2),
    fontFamily: "Avenir-Heavy",
    color: _MyColors.MyColors.tertiary,
    fontWeight: "bold"
  },
  title: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(2),
    fontFamily: "Avenir-Heavy",
    color: _MyColors.MyColors.tertiary
  },
  code: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(1.5),
    fontFamily: "Avenir-Heavy",
    color: _MyColors.MyColors.tertiary
  },
  iconStyle: {
    code: {
      fontSize: 13,
      fontFamily: "Avenir-Heavy",
      color: _MyColors.MyColors.tertiary
    }
  },
  price: {
    position: "absolute",
    end: 0,
    bottom: 0,
    padding: 10,
    margin: 8,
    fontSize: 16,
    fontFamily: "Avenir-Heavy",
    color: "#EE5A55"
  },
  keftIcon: {
    position: "absolute",
    end: 0,
    bottom: 0,
    padding: 10,
    margin: 8,
    fontSize: 25,
    fontFamily: "Avenir-Heavy",
    color: _MyColors.MyColors.secondary
  },
  circle: {
    position: "absolute",
    right: 0,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    elevation: 3,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  circleText: {
    color: "white"
  },
  addicon: {
    color: _MyColors.MyColors.secondary,
    alignSelf: "flex-end" // paddingHorizontal:10,
    // paddingVertical:550,

  }
}, _defineProperty(_StyleSheet$create, "addicon", {
  color: _MyColors.MyColors.primary,
  alignSelf: "flex-start" // paddingHorizontal:10,
  // paddingVertical:550,

}), _defineProperty(_StyleSheet$create, "add", {
  marginBottom: 0,
  position: "absolute",
  alignSelf: "flex-end",
  right: (0, _Dimensions.wp)(5),
  bottom: (0, _Dimensions.hp)(8)
}), _StyleSheet$create));

exports["default"] = _default;