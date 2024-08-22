import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import React, { useState, useEffect, version } from "react";
// import { hp, wp } from "../style/Dimensions";
import BookingStyle from "../style/BookingStyle";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

import { MyColors } from "../style/MyColors";
import { useNavigation } from "@react-navigation/core";
import { normalize } from "react-native-elements";

import {
  Chip,
  Divider,
  CardActivityIndicatorComponent,
  Button,
  Card
} from "react-native-paper";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import useOrientation from "./useOrientation";
import ParticipantList_Card from "./ParticipantList_Card";
const windowHeight = Dimensions.get("window").height; // alert(itemId);

const NewParticipantlist = ({
  waiver,
  Booking_id,
  total_participant,
  event_id
}) => {
  const [bookingId, setBookingId] = useState(Booking_id ? Booking_id : "");
  const navigation = useNavigation();
  const { width, height, orientation } = useOrientation();

  useEffect(() => {
    setBookingId(Booking_id);
  }, [Booking_id]);
  // alert(Booking_id);

  // alert(Booking_id);
  // alert(waiver.event_name);

  console.log("landscape is ..", orientation);
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

  if (waiver.length == 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text
          style={{
            fontSize: normalize(20),
            fontFamily: "Avenir-Heavy",
            fontWeight: "600",
            color: "grey"
          }}
        >
          Empty
        </Text>
        <View
          style={{
            marginBottom: 30,
            position: "absolute",
            alignSelf: "flex-end",
            right: 20,
            bottom: 30
          }}
        >
          <Text
            style={{ color: MyColors.primary }}
            onPress={() =>
              navigation.navigate("ParticipantForm", {
                itemId: bookingId ? bookingId : booking_id
              })
            }
          >
            <FontAwesome6 name="circle-plus" size={40} />
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "column",
            margin: normalize(6),
            padding: normalize(6),
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "row"
          }}
        >
          <Text style={BookingStyle.h2}>Participants List</Text>
          <Text
            style={{ fontWeight: "700", fontSize: responsiveFontSize(1.5) }}
          >{`Total Participants:${total_participant}`}</Text>

          {/* <Text style={styles.headertitle}>New Participant</Text> */}
        </View>

        <FlatList
          contentContainerStyle={{
            alignItems: "center",
            padding: normalize(10),
            paddingBottom: normalize(80)
          }}
          data={waiver?.waiver}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ParticipantList_Card item={item} bookingId={bookingId} />
          )}
        />
      </View>
      {waiver.event_name == "Bogathon" && (
        <View
          style={{
            marginBottom: 30,
            position: "absolute",
            alignSelf: "flex-end",
            right: 20,
            bottom: 30
          }}
        >
          <Text
            style={{ color: MyColors.primary }}
            onPress={() =>
              navigation.navigate("ParticipantForm", {
                itemId: bookingId ? bookingId : booking_id,
                BookingDetails: waiver,
                event_id: event_id
              })
            }
          >
            <FontAwesome6 name="circle-plus" size={responsiveFontSize(5)} />
          </Text>
        </View>
      )}
    </View>
  );
};

export default NewParticipantlist;

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
