import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert
} from "react-native";
import React from "react";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import HeaderComponent from "./HeaderComponent";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import useOrientation from "./useOrientation";
import { normalize } from "react-native-elements";
import { MyColors } from "../style/MyColors";
import Clipboard from "@react-native-clipboard/clipboard";
import WaiverRow from "./WaiverRow";
import WaiverCard_Item from "./WaiverCard_Item";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { hp } from "../style/Dimensions";
import BookingStyle from "../style/BookingStyle";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const BookingWaiver_Header = ({
  bookingdetails,
  event_id,
  navigation,
  bookingdetail
}) => {
  const { width, height, orientation } = useOrientation();
  const copyToClipboard = () => {
    Clipboard.setString(bookingdetail.liveLink);
    // alert("Copied to Clipboard!");
  };
  // alert(event_id);
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

  console.log(
    "booking data in booking details ...............",
    bookingdetail?.bookings?.event_name
  );
  return (
    <ImageBackground
      resizeMode="cover"
      activeOpacity={0.2}
      source={require("./../style/assets/img2.jpg")}
      style={{
        ...BookingWaiverStyle.imgbackground,
        height: windowHeight > 800 ? hp(44) : hp(47)
      }}
    >
      <ScrollView>
        <View
          style={{
            ...BookingWaiverStyle.headerStyle,
            height: orientation == "landscape" ? hp(87) : hp(49)
            // alignSelf: "center",
            // justifyContent: "center",
            // alignItems: "center",
            // backgroundColor: "red"

            // height: windowHeight > 800 ? hp(45) : hp(45)
          }}
        >
          {/*   <HeaderComponent
            title={"Booking Detail"}
            // color={MyColors.primary}
            onBackPress={() =>
              navigation.navigate("Bookinglist", { event_id: event_id }) &&
              dispatch(clearState())
            }
            link={true}
            onMenuPress={() => copyToClipboard()}
            backButtonColor={"#ffff"}
          />
          <View>
            <View style={{ ...BookingWaiverStyle.cardStyle }}>
              <View
                style={{
                  ...BookingWaiverStyle.card,
                  width: wp(92),
                  height: orientation == "landscape" ? hp(55) : hp(33),
                  overflow: "hidden"
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // backgroundColor: "red",
                    flex: 1,
                    paddingBottom: normalize(10)
                  }}
                >
                  <WaiverCard_Item
                    bookingdetails={
                      bookingdetails?.first_name +
                      " " +
                      bookingdetails?.last_name
                    }
                    name={"person-sharp"}
                    type={"Ionicons"}
                    maxWidth={orientation == "landscape" ? wp(70) : wp(50)}
                    second={true}
                    second_bookingdetails={
                      bookingdetails?.completed_waiver_count
                    }
                    second_name={"file-signature"}
                    second_type={"FontAwesome5"}
                  />

                  <WaiverCard_Item
                    bookingdetails={bookingdetails?.email}
                    name={"email"}
                    type={"MaterialCommunityIcons"}
                    // maxWidth={orsientation == "landscape" ? wp(55) : wp(30)}
                    second={false}
                  />
                  <WaiverCard_Item
                    bookingdetails={bookingdetails?.phone}
                    name={"phone"}
                    type={"FontAwesome"}
                    maxWidth={orientation == "landscape" ? wp(55) : wp(38)}
                    second={true}
                    second_bookingdetails={bookingdetails?.group_name}
                    second_name={"event"}
                    second_type={"MaterialIcons"}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around"
                      //   backgroundColor: "red"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: "bold",
                        fontFamily: "Avenir-Heavy",
                        color: MyColors.tertiary
                      }}
                    >
                      {"Date"}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: "bold",
                        fontFamily: "Avenir-Heavy",
                        color: MyColors.tertiary
                      }}
                    >
                      {"Time"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around"
                      //   marginBottom: hp(2)
                      // backgroundColor: 'orange',
                      // width: wp(92),
                    }}
                  >
                    <WaiverRow
                      bookingdetails={bookingdetails?.booking_date}
                      //   name={second_name}
                      //   type={second_type}
                      //   maxWidth={maxWidth}
                    />
                    <WaiverRow
                      bookingdetails={bookingdetails?.time_slot}
                      //   name={second_name}
                      //   type={second_type}
                      //   maxWidth={maxWidth}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingTop: 5
            }}
          ></View> */}
          <HeaderComponent
            title={"Booking Detail"}
            // color={MyColors.primary}
            onBackPress={() =>
              navigation.navigate("Bookinglist", { event_id: event_id })
            }
            link={true}
            // onMenuPress={() => copyToClipboard()}
            backButtonColor={"#ffff"}
            waiverLink={
              bookingdetail?.bookings?.event_name == "Lisduff Parties"
                ? false
                : true
            }
          />
          <View style={styles.container}>
            <View
              style={{
                ...styles.firstCard,
                height: orientation == "landscape" ? hp(55) : hp(28)
              }}
            >
              <View
                style={{
                  ...styles.secondCard,
                  height: orientation == "landscape" ? hp(25) : hp(15)
                }}
              >
                <View style={styles.namecontainer}>
                  <FontAwesome5
                    name="user-alt"
                    size={17}
                    color={MyColors.primary}
                    style={styles.nameicon}
                  />
                  <Text style={styles.cardText}>
                    {bookingdetails?.first_name +
                      " " +
                      bookingdetails?.last_name}
                  </Text>
                </View>
                <View style={styles.namecontainer}>
                  <MaterialCommunityIcons
                    name="email"
                    size={19}
                    color={MyColors.primary}
                    style={styles.nameicon}
                  />
                  <Text style={styles.cardText}>{bookingdetails?.email}</Text>
                </View>
                <View style={styles.namecontainer}>
                  <FontAwesome5
                    name="phone-alt"
                    size={19}
                    color={MyColors.primary}
                    style={styles.nameicon}
                  />
                  <Text style={styles.cardText}>{bookingdetails?.phone}</Text>
                </View>
              </View>
              <View style={styles.firstCardcontainer}>
                <View style={styles.invoicecontainer}>
                  <FontAwesome5
                    name="file-invoice"
                    size={22}
                    color={MyColors.primary}
                    style={styles.nameicon}
                  />
                  <Text style={styles.invoicetext}>
                    {bookingdetails?.completed_waiver_count}
                  </Text>
                </View>
                <View style={styles.phonecontainer}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={MyColors.primary}
                    style={styles.nameicon}
                  />
                  <ScrollView
                    horizontal={true}
                    style={styles.textContainer}
                    showsHorizontalScrollIndicator={false}
                  >
                    <Text style={styles.cardText}>
                      {bookingdetails?.group_name}
                    </Text>
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  ...BookingStyle.DateView,
                  width: wp(95),
                  // backgroundColor: "red",
                  alignSelf: "center",
                  paddingTop: hp(1)
                }}
              >
                <Text style={BookingStyle.h2}>{"Date"}</Text>
                <Text style={BookingStyle.h2}>{"Time"}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around"
                  // backgroundColor: 'orange',
                  // width: wp(92),
                }}
              >
                <View
                  style={{
                    ...BookingStyle.DataViewValue,
                    backgroundColor: MyColors.primary
                  }}
                >
                  <Text
                    style={{
                      ...BookingStyle.code,
                      width: wp(20),
                      color: MyColors.onPrimary,
                      textAlign: "center",
                      fontWeight: "700"
                    }}
                  >
                    {bookingdetails?.booking_date}
                  </Text>
                </View>

                <View
                  style={{
                    ...BookingStyle.DataViewValue,
                    backgroundColor: MyColors.primary
                  }}
                >
                  <Text
                    style={{
                      ...BookingStyle.code,
                      color: MyColors.onPrimary,
                      width: wp(20),
                      textAlign: "center",
                      fontWeight: "700"
                    }}
                  >
                    {bookingdetails?.time_slot}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.DateTimConatiner}>
                <View style={styles.Dateconatiner}>
                  <Text style={styles.Datetext}>Date</Text>
                  <Text style={styles.DateText_value}>
                    {bookingdetails?.booking_date}
                  </Text>
                </View>
                <View style={styles.Dateconatiner}>
                  <Text style={styles.Datetext}>Time</Text>
                  <Text style={styles.DateText_value}>
                    {bookingdetails?.time_slot}
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(3)
  },
  firstCard: {
    width: "95%",
    backgroundColor: MyColors.onPrimary,
    justifyContent: "center",
    // alignItems: 'center',
    position: "relative",
    borderRadius: 10
  },
  secondCard: {
    width: "85%",
    // height: 90,
    backgroundColor: MyColors.onPrimary,
    position: "absolute",
    top: "-25%",
    left: "7.5%",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10
  },
  cardText: {
    fontSize: responsiveFontSize(2),
    color: MyColors.primary
  },
  Dateconatiner: {
    flexDirection: "column"
  },
  textContainer: {
    flex: 1
  },
  namecontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5
  },
  firstCardcontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50
  },
  phonecontainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: MyColors.onPrimary,
    elevation: 10,
    borderRadius: 10,
    minWidth: "30%",
    textAlign: "center",
    justifyContent: "center"
  },
  invoicecontainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: MyColors.onPrimary,
    elevation: 10,
    borderRadius: 10,
    minWidth: "30%",
    textAlign: "center",
    justifyContent: "space-evenly"
  },
  DateTimConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "space-evenly",
    backgroundColor: MyColors.primary,
    width: "80%",
    alignSelf: "center",

    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
    marginTop: 20
    // padding:10
  },
  invoicetext: {
    width: "20%",
    backgroundColor: MyColors.onPrimary,
    textAlign: "center",
    borderRadius: 5,
    elevation: 10,
    color: MyColors.primary
  },
  nameicon: {
    paddingHorizontal: 5
  },
  Datetext: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: MyColors.onPrimary
  },
  DateText_value: {
    fontSize: 13,
    color: MyColors.onPrimary
  }
});
export default BookingWaiver_Header;
