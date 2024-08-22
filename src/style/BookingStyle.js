import { responsiveFontSize } from "react-native-responsive-dimensions";
import { MyColors } from "./MyColors";
import { normalize } from "react-native-elements";
import { StyleSheet, Dimensions } from "react-native"; // alert(itemId);
import { hp, wp } from "./Dimensions";
const windowHeight = Dimensions.get("window").height;

export default BookingStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: normalize(80)
  },
  searchBar: {
    backgroundColor: "#ffffff",
    // borderWidth: 1,
    borderRadius: 5,
    // borderColor:'#074365',
    // marginBottom: 10,
    padding: normalize(10),
    height: windowHeight > 800 ? hp(5) : hp(7),

    // marginHorizontal: 5,
    // width: wp(95),
    alignSelf: "center",

    color: "#074365"
  },
  emptyContainer: {
    flexDirection: "column",
    margin: normalize(6),
    padding: normalize(6),
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  emptyContainerText: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: MyColors.primary
  },
  flatListContainer: {
    alignItems: "center",
    padding: normalize(20),
    paddingBottom: normalize(30),
    paddingHorizontal: wp(20)

    // backgroundColor: "green"
  },

  flatListItem: {
    flexDirection: "row",
    marginBottom: normalize(8),

    // marginHorizontal: normalize(20),
    // padding: normalize(8),
    paddingVertical: normalize(8),

    backgroundColor: "white",
    // alignItem s: 'center',
    borderRadius: 8,
    shadowColor: "grey",
    // shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5
  },
  itemNameView: {
    // paddingTop: 10,
    paddingLeft: normalize(10)
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  itemPriceRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 0
    // backgroundColor: "red",
    // height: normalize(40),
    // top: -10,
  },
  priceView: {
    padding: 0,

    width: wp(35),

    // paddingHorizontal: normalize(15),

    // justifyContent: 'space-between',
    alignItems: "center",
    // alignSelf: 'center',
    // backgroundColor: "#F1EFEF",
    // borderRadius: normalize(10),
    flexDirection: "row"

    // margin: normalize(4)
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

    paddingHorizontal: normalize(10),

    // justifyContent: 'space-between',
    alignItems: "center",
    // backgroundColor: "green",
    // alignSelf: 'center',
    // backgroundColor: "#F1EFEF",
    borderRadius: normalize(10),
    flexDirection: "row",

    margin: normalize(4)
  },
  DateView: {
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "space-around",
    // width: wp(86),s
    alignSelf: "centers",
    // backgroundColor:'red',
    // width: wp(95),

    paddingBottom: normalize(3)

    // paddingHorizontal: 20,
    // backgroundColor: 'blue',
  },
  DataViewValue: {
    flexDirection: "row",
    // borderWidth: 0.3,
    minheight: normalize(35),
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
    height: normalize(48),
    // width: wp(80),
    paddingTop: normalize(2),
    alignSelf: "center",
    marginTop: normalize(10),

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
    fontSize: responsiveFontSize(2),

    fontWeight: "bold",
    fontFamily: "Avenir-Heavy",
    color: MyColors.tertiary
  },
  h3: {
    fontSize: responsiveFontSize(2.5),

    fontWeight: "bold",
    fontFamily: "Avenir-Heavy",
    color: MyColors.tertiary
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
    backgroundColor: "#3F4EA5", //#3F4EA5, #ee6e73
    position: "absolute",
    bottom: 10,
    right: 10
  },
  plus: {
    alignSelf: "center",
    color: "white",
    fontSize: 22
  },
  card: {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: "row",
    marginBottom: 8,
    padding: 5,
    height: 93,
    width: wp(96),
    backgroundColor: "white",
    // alignItem s: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5
  },
  bookingcard: {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: "row",
    marginBottom: 8,
    padding: 5,
    // height: 93,
    width: wp(96),
    backgroundColor: "white",
    height: hp(20),

    // alignItem s: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5
  },
  headertitle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: Platform.OS === "ios" ? MyColors.primary : "#ffffff",
    paddingHorizontal: 5
  },
  title_bold: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Avenir-Heavy",
    color: MyColors.tertiary,
    fontWeight: "bold"
  },

  title: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Avenir-Heavy",
    color: MyColors.tertiary
  },
  code: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Avenir-Heavy",
    color: MyColors.tertiary
  },
  iconStyle: {
    code: {
      fontSize: 13,
      fontFamily: "Avenir-Heavy",
      color: MyColors.tertiary
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
    color: MyColors.secondary
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
    color: MyColors.secondary,
    alignSelf: "flex-end"
    // paddingHorizontal:10,
    // paddingVertical:550,
  },
  addicon: {
    color: MyColors.primary,
    alignSelf: "flex-start"
    // paddingHorizontal:10,
    // paddingVertical:550,
  },
  add: {
    marginBottom: 0,
    position: "absolute",
    alignSelf: "flex-end",
    right: wp(5),
    bottom: hp(8)
  }
});
