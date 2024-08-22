import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React from "react";
import { hp, wp } from "../style/Dimensions";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { MyColors } from "../style/MyColors";
import { normalize } from "react-native-elements";
import useOrientation from "./useOrientation";

import Feather from "react-native-vector-icons/Feather";

import { Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
const windowHeight = Dimensions.get("window").height; // alert(itemId);

const ParticipantList_Card = ({ item, bookingId }) => {
  const { width, height, orientation } = useOrientation();
  const navigation = useNavigation();
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  return (
    <View>
      <TouchableOpacity
        style={{
          marginBottom: normalize(8),
          padding: normalize(5),
          height: orientation == "landscape" ? hp(31) : normalize(130),
          width: wp(97),
          backgroundColor: "white",
          // alignItems: 'center',
          borderRadius: normalize(8),
          shadowColor: "grey",
          // shadowColor: "black",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          elevation: 4,
          zIndex: 5
        }}
        activeOpacity={0.7}
        onPress={() => {
          item.wavier_status == "pending"
            ? ""
            : navigation.navigate("BookingDetail", {
                itemData: item,
                itemId: bookingId ? bookingId : bookingId
              });
        }}
      >
        {/* <Image
        style={{width: 75, height: 75, borderRadius: 8}}
        source={{uri: item.supplierLogo}}
      /> */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: normalize(10),
            paddingTop: normalize(10)
          }}
        >
          {item?.name && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
                // justifyContent: "center"
              }}
            >
              {item?.name && (
                <FontAwesome
                  // style={BookingStyle.keftIcon}
                  style={{
                    color: MyColors.primary,
                    paddingRight: normalize(10)
                  }}
                  name="user-alt"
                  size={normalize(20)}
                />
              )}
              <Text style={styles.title}>
                {`${item.name} ${item.sur_name}`}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
              // justifyContent: "center"
            }}
          >
            <MaterialCommunityIcons
              // style={BookingStyle.keftIcon}
              style={{
                color: MyColors.primary,
                paddingRight: normalize(10)
              }}
              name="email"
              size={normalize(20)}
            />
            <Text style={styles.title}>{item.email}</Text>
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: "red",
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>Photo consent:</Text>
                <Text style={{ ...styles.code, paddingLeft: 5 }}>
                  {item.concent}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: normalize(5)
                }}
              >
                <Text style={styles.title}>Check In :</Text>
                <Text style={{ ...styles.code, paddingLeft: normalize(5) }}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1.4,
                alignItems: "flex-end"
                // backgroundColor: "red"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>Waiver Status:</Text>
                <Text style={{ ...styles.code, paddingLeft: normalize(5) }}>
                  {item.wavier_status}
                </Text>
              </View>
              <View>
                <Chip
                  type={"flat"}
                  icon={() => (
                    <Feather
                      style={{ paddingHorizontal: normalize(5) }}
                      name="edit"
                      // onPress={() =>
                      //   navigation.navigate('BlockDate_Form', {
                      //     item: item,
                      //     update: true,
                      //   })
                      // }
                      color={"#ffffff"}
                      // size={normalize(16)}
                      size={windowHeight > 800 ? normalize(18) : normalize(16)}

                      // size={16}
                    />
                  )}
                  onPress={() =>
                    navigation.navigate("EditParticipant", {
                      item: item,
                      update: true,
                      itemId: bookingId ? bookingId : Booking_id
                    })
                  }
                  textStyle={{
                    color: "#ffffff",

                    lineHeight:
                      orientation == "landscape"
                        ? hp(4)
                        : windowHeight > 800
                        ? hp(3)
                        : hp(2),

                    fontSize:
                      windowHeight > 800 ? normalize(17) : normalize(12),
                    fontFamily: "Avenir-Heavy",
                    fontWeight: "bold"
                  }}
                  style={{
                    shadowColor: "red",
                    // elevation: 4,
                    // height: 30,
                    height:
                      orientation == "landscape"
                        ? hp(8)
                        : windowHeight > 800
                        ? hp(4)
                        : hp(5),

                    width:
                      orientation == "landscape"
                        ? wp(15)
                        : windowHeight > 800
                        ? wp(23)
                        : wp(25),
                    paddingTop: 0,
                    paddingBottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    backgroundColor: MyColors.primary,
                    borderRadius: 5,
                    margin: 4
                  }}
                >
                  {"Edit"}
                </Chip>
              </View>
            </View>
          </View>
        </View>

        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // backgroundColor: 'red',
                            width: wp(85),
                            height:90
                          }}>
                          <Chip
                            type={'flat'}
                            // icon="clock"
                            onPress={() => console.log('Pressed')}
                            textStyle={{
                              color: 'black',
                              textShadowColor: 'black',
                              alignSelf:'center',

                              lineHeight:windowHeight > 800 ? normalize(17) :normalize(14),

                              fontSize:windowHeight > 800 ? normalize(13.5) :normalize(12),

                            }}
                            style={{
                              shadowColor: 'red',
                              padding:0,
                              // elevation: 4,
                              // height: 25,
                              // height: hp(4.2),
                              height:windowHeight > 800 ? hp(6.5) :hp(6.2),


                              width: wp(28),

                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#F1EFEF',
                              // borderRadius: 50,
                              margin: 4,
                            }}>
                            {'Start'}
                          </Chip>

                          <Chip
                            type={'flat'}
                            // icon="clock"
                            onPress={() => console.log('Pressed')}
                            textStyle={{
                              color: 'black',
                              // textAlign: 'center',
                              // justifyContent: 'center',
                              // alignSelf: 'center',
                              // alignItems: 'center',

                              lineHeight:windowHeight > 800 ? normalize(17) :normalize(14),

                              fontSize:windowHeight > 800 ? normalize(13.5) :normalize(12),
                            }}
                            style={{
                              shadowColor: 'red',
                              // elevation: 4,
                              height:windowHeight > 800 ? hp(3.5) :hp(4.2),
                              width: 65,
                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#F1EFEF',
                              borderRadius: 50,
                              margin: 4,
                            }}>
                            {'End'}
                          </Chip>
                        </View> */}
        {/* {item.booking_id > 0 ? (
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{item.booking_id}</Text>
                  </View>
                ) : null} */}
      </TouchableOpacity>
    </View>
  );
};

export default ParticipantList_Card;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80
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
    // flexDirection: 'row',
    marginBottom: normalize(8),
    padding: normalize(5),
    height: normalize(110),
    backgroundColor: "white",
    // alignItems: 'center',
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
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: "#042C5C"
  },

  title: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    fontFamily: "Avenir-Heavy",
    color: "#042C5C"
  },
  code: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Avenir-Heavy",
    color: "#77869E"
  },
  price: {
    position: "absolute",
    end: 0,
    bottom: 0,
    padding: 10,
    margin: 8,
    fontSize: 16,
    fontFamily: "Avenir-Heavy",
    color: MyColors.primary
  },
  circle: {
    position: "absolute",
    right: 0,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    elevation: 3,
    backgroundColor: MyColors.secondary,
    alignItems: "center",
    justifyContent: "center"
  },
  circleText: {
    color: "white"
  }
});
