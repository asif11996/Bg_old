import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MyColors } from "../style/MyColors";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import { wp } from "../style/Dimensions";
import { normalize } from "react-native-elements";
import useOrientation from "./useOrientation";

const TransactionCard = ({ item }) => {
  const { width, height } = useOrientation();

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
        style={{ ...BookingWaiverStyle.transactionItem, width: wp(97) }}
        activeOpacity={0.7}
        // onPress={() => this.detail(item.id)}
      >
        <Image
          style={BookingWaiverStyle.transactionImgStyle}
          source={require("./../style/assets/visa.jpg")}
        />

        <View
          style={{
            flexDirection: "column",
            margin: normalize(8),
            padding: normalize(8),
            justifyContent: "space-evenly",
            alignItems: "flex-start"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FontAwesome
              // style={BookingStyle.keftIcon}
              style={{ color: MyColors.primary, paddingRight: 10 }}
              name="credit-card"
              size={normalize(20)}
            />
            <Text style={{ ...BookingStyle.title, paddingLeft: 5 }}>
              {`XXXXXXXXXXXX${item.last4}`}{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: normalize(15)
            }}
          >
            <MaterialIcons
              // style={BookingStyle.keftIcon}
              style={{
                color: MyColors.primary,
                paddingRight: normalize(10)
              }}
              name="payments"
              size={normalize(20)}
            />
            <Text
              style={{
                ...BookingStyle.code,
                paddingLeft: 5,
                paddingBottom: 5
              }}
            >
              {item.transaction_id}
            </Text>
          </View>
          {/* <Text style={styles.code}>Pi# {item.name}</Text> */}
          <View style={{ flexDirection: "row" }}>
            {/* <MaterialCommunityIcons
                      // style={BookingStyle.keftIcon}
                      style={{color: MyColors.secondary, paddingRight: 10}}
                      name="card-account-details"
                      size={20}
                    /> */}
            {/* <Text
                      style={styles.code}>{`XXXXXXXXXXXX${item.last4}`}</Text> */}
          </View>
        </View>
        <Text style={BookingWaiverStyle.price}>€{item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
