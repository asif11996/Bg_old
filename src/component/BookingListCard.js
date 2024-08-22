import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React from "react";
import useOrientation from "./useOrientation";
import { normalize } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { MyColors } from "../style/MyColors";

const windowHeight = Dimensions.get("window").height;
import {
  fetchBooking_Dashboard,
  sendEmail,
  update_fetchBooking_Dashboard
} from "./../store/action/booking";
import { useDispatch } from "react-redux";
// alert(itemId);

const BookingListCard = ({ item, navigation, event_id, sendEmails }) => {
  const { height, width } = useOrientation();
  const dispatch = useDispatch();

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
          ...BookingStyle.flatListItem,
          width: wp(96),
          height: width > 600 ? normalize(270) : normalize(225)
        }}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("Booking_Waivers", {
            itemId: item.id,
            screen: "Bookinglist",
            total_participants: item.total_participants,
            event_id: event_id
          });
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: wp(96)
          }}
        >
          <View style={BookingStyle.itemNameView}>
            <Text style={BookingStyle.h2} numberOfLines={1}>
              {item.first_name + " " + item.last_name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <Text style={BookingStyle.code}>{item.email}</Text>
          </View>
          <View
            style={{
              ...BookingStyle.itemPriceRow,
              justifyContent: "space-between",
              width: wp(72)
            }}
          >
            <View style={{ ...BookingStyle.priceView, width: wp(35) }}>
              <Text style={{ ...BookingStyle.title }}>{"Price:"}</Text>
              <Text
                style={{
                  ...BookingStyle.code,
                  flexDirection: "row",
                  paddingLeft: 5
                }}
              >
                {item.total_price}
              </Text>
              <Icon
                name="euro"
                size={windowHeight > 1000 ? normalize(18) : normalize(12)}
                color={MyColors.tertiary}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: normalize(3)
                }}
              />
            </View>

            <View
              style={{
                ...BookingStyle.waiverView,
                width: wp(35),
                justifyContent: "flex-end"
              }}
            >
              <Text style={BookingStyle.title}>{"Waiver:"}</Text>
              <Text
                style={{
                  ...BookingStyle.code,
                  paddingLeft: normalize(5)
                }}
              >
                {item.completed_waiver_count}
              </Text>
            </View>
          </View>

          <View
            style={{
              ...BookingStyle.itemPriceRow,
              width: wp(72),
              justifyContent: "space-between"

              // backgroundColor: "blue"
              // justifyContent: "center"
            }}
          >
            <View style={BookingStyle.priceView}>
              <Text style={{ ...BookingStyle.title }}>{"Date:"}</Text>
              <Text
                style={{
                  ...BookingStyle.code,
                  flexDirection: "row"
                  // paddingLeft: normalize(5)
                }}
              >
                {item.booking_date}
              </Text>
            </View>

            <View
              style={{
                ...BookingStyle.waiverView,
                width: wp(35),
                justifyContent: "flex-end"
                // backgroundColor: "red"
              }}
            >
              <Text style={BookingStyle.title}>{"Time:"}</Text>
              <Text style={{ ...BookingStyle.code, paddingLeft: 5 }}>
                {item.time_slot}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              // backgroundColor: "orange",

              // backgroundColor: 'orange',
              width: wp(92)
            }}
          >
            {item.completed_waiver_count == 0 ||
            item.completed_waiver_count < 1 ? (
              <TouchableOpacity
                onPress={() => sendEmails(item.id)}
                style={{
                  ...BookingStyle.DataViewValue,
                  backgroundColor: MyColors.primary,
                  width: width > 600 ? normalize(110) : normalize(90)
                }}
              >
                <Text
                  style={{
                    ...BookingStyle.code,
                    color: "white",
                    fontWeight: "900"
                  }}
                >
                  {"Send Email"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{ height: normalize(35), width: normalize(90) }}
              ></View>
            )}

            {item.event_name == "Bogathon" ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditBooking", {
                    item: item,
                    update: true,
                    event_id: event_id
                  })
                }
                style={{
                  ...BookingStyle.DataViewValue,
                  width: width > 600 ? normalize(110) : normalize(90),

                  backgroundColor: MyColors.primary
                }}
              >
                <Text
                  style={{
                    ...BookingStyle.code,
                    fontWeight: "900",
                    color: "white"
                  }}
                >
                  {"Edit"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{ height: normalize(35), width: normalize(90) }}
              ></View>
            )}
          </View>

          <View style={{ width: wp(91) }}>
            <View
              style={{
                ...BookingStyle.itemTotalPartitions,
                width: wp(80)
              }}
            >
              <Text style={BookingStyle.h2}>{"Total Participants"}</Text>
              <Text style={BookingStyle.h2}>{item.total_participants}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookingListCard;

const styles = StyleSheet.create({});
