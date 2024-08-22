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
import { useNavigation } from "@react-navigation/native";
import BookingStyle from "../style/BookingStyle";

const windowHeight = Dimensions.get("window").height;

const HomeCard = ({ item }) => {
  const { width } = useOrientation();
  const navigation = useNavigation();

  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  return (
    <View style={BookingStyle.container}>
      <TouchableOpacity
        style={{
          ...BookingStyle.flatListItem,
          width: wp(96)
        }}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("LatestBookingDetails", {
            BookingItem: item
          });
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: wp(96),
            backgroundColors: "red"
          }}
        >
          <View style={BookingStyle.itemNameView}>
            <Text style={BookingStyle.h2} numberOfLines={1}>
              {item.first_name + " " + item.last_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: normalize(10)
            }}
          >
            <Text style={BookingStyle.code}>{item.email}</Text>
          </View>
          <View
            style={{
              ...BookingStyle.itemPriceRow,
              alignSelf: "center",
              width: wp(72),
              // backgroundColor: "red",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                ...BookingStyle.priceView,
                width: wp(35)
                // backgroundColor: "red"
              }}
            >
              <Text style={{ ...BookingStyle.title }}>{"Price:"}</Text>
              <Text
                style={{
                  ...BookingStyle.code,
                  flexDirection: "row",
                  paddingHorizontal: 4
                  // backgroundColor: "red"
                }}
              >
                {item.total_price}
              </Text>
              <Icon
                // style={{ paddingLeft: 20 }}
                name="euro"
                size={windowHeight > 1000 ? normalize(16) : normalize(12)}
                color={MyColors.tertiary}
                style={{
                  justifyContent: "center",
                  alignItems: "center"
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
              ...BookingStyle.DateView,
              width: wp(95),
              // backgroundColor: "red",
              alignSelf: "center"
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
            <View style={{ ...BookingStyle.DataViewValue }}>
              <Text
                style={{
                  ...BookingStyle.code,
                  width: wp(20),
                  textAlign: "center"
                }}
              >
                {item.booking_date}
              </Text>
            </View>

            <View style={BookingStyle.DataViewValue}>
              <Text
                style={{
                  ...BookingStyle.code,
                  width: wp(20),
                  textAlign: "center"
                }}
              >
                {item.time_slot}
              </Text>
            </View>
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

export default HomeCard;
