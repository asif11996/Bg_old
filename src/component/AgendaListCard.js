import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MyColors } from "../style/MyColors";
import { normalize } from "react-native-elements";
import { hp, wp } from "../style/Dimensions";

const AgendaListCard = ({ reservation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FontAwesome
          name={"info-circle"}
          size={40}
          color={MyColors.onPrimary}
          style={styles.iconstyle}
        />
        <View style={styles.innerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.bogathontext}>{reservation.event_name}</Text>
          </View>

          <Text
            style={{
              fontSize: normalize(12),
              // marginBottom: 20,
              textAlign: "center",
              //   marginTop: 20,
              color: "#316c88",
              fontWeight: "bold"
            }}
          >
            {`${reservation.booker_name} Booked ${reservation.event_name} on ${reservation.booking_date} at`}
            <Text style={{ color: "#00000" }}> {reservation.booking_time}</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(57),
              // backgroundColor: "red",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                // marginBottom: 20,
                textAlign: "center",
                // marginTop: 20,
                color: "#316c88",
                fontWeight: "400"
              }}
            >
              {"Total Participants:"}
            </Text>
            <Text
              style={{
                fontSize: 14,
                // marginBottom: 20,
                textAlign: "center",
                // marginTop: 20,
                color: "#316c88",
                fontWeight: "400"
              }}
            >
              {reservation.total_participants}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(57),
              // backgroundColor: "red",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                // marginBottom: 20,
                textAlign: "center",
                // marginTop: 20,
                color: "#316c88",
                fontWeight: "400"
              }}
            >
              {"Total Price:"}
            </Text>
            <Text
              style={{
                fontSize: normalize(14),
                // marginBottom: 20,
                textAlign: "center",
                // marginTop: 20,
                color: "#316c88",
                fontWeight: "400"
              }}
            >
              {reservation.total_price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(57),
              // backgroundColor: "red",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                // marginBottom: 20,
                textAlign: "center",
                // marginTop: 20,
                color: "#316c88",
                fontWeight: "400"
              }}
            >
              {"Waivers signed:"}
            </Text>
            <Text
              style={{
                fontSize: normalize(14),
                // marginBottom: 20,
                textAlign: "center",
                // marginTop: 20,
                color: "#316c88",
                fontWeight: "400"
              }}
            >
              {reservation.total_waiver_signed}
            </Text>
          </View>

          {/* <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>{"Total Participants:"}</Text>
            <Text style={styles.participantstotal}>
              {reservation.total_participants}
            </Text>
          </View>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>{"Waivers signed:"}</Text>
            <Text style={styles.participantstotal}>
              {reservation.total_waiver_signed}
            </Text>
          </View>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>{"Total Price:"}</Text>
            <Text style={styles.participantstotal}>
              {reservation.total_price}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "grey",
    padding: 20
  },
  greeting: {
    color: MyColors.secondary,
    fontSize: 24,
    fontWeight: "bold"
  },
  subtitle: {
    color: MyColors.primary,
    fontSize: 18,
    marginBottom: 20
  },
  card: {
    backgroundColor: MyColors.primary,
    borderRadius: 10,
    padding: 10,
    marginTop: hp(2)
  },
  bogathontext: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },
  innerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  iconContainer: {
    backgroundColor: MyColors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  title: {
    color: MyColors.primary,
    fontSize: 15,
    marginBottom: 5
  },
  time: {
    color: MyColors.primary,
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center"
  },
  participantsContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  participantsText: {
    color: MyColors.primary,
    fontSize: 15,
    fontWeight: "bold"
  },
  participantstotal: {
    color: MyColors.primary,
    fontSize: 15
  },
  iconstyle: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: -30
  }
});
export default AgendaListCard;
