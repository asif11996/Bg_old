import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { wp } from "../style/Dimensions";
import BookingStyle from "../style/BookingStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { MyColors } from "../style/MyColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize } from "react-native-elements";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import useOrientation from "./useOrientation";
import TransactionCard from "./TransactionCard";
import FlatlistComponent from "./FlatlistComponent";
import ListEmptyComponent from "./ListEmptyComponent";

const TransactionList = ({ transactions }) => {
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
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "column",
            margin: normalize(6),
            padding: normalize(6),
            justifyContent: "space-evenly",
            alignItems: "flex-start"
          }}
        >
          <Text style={BookingStyle.h2}>Transaction List</Text>
        </View>

        <FlatlistComponent
          data={transactions}
          renderItem={({ item }) => <TransactionCard item={item} />}
          ListEmptyComponent={() => <ListEmptyComponent />}
          // refreshing={refreshing}
          // onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default TransactionList;

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
  },
  headertitle: {
    fontSize: 20,
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: "#042C5C"
  },

  title: { fontSize: 16, fontFamily: "Avenir-Heavy", color: "#042C5C" },
  code: { fontSize: 13, fontFamily: "Avenir-Heavy", color: "#77869E" },
  price: {
    marginTop: 5,
    position: "absolute",
    end: 0,
    bottom: 0,
    padding: 10,
    margin: 8,
    fontSize: 16,
    fontFamily: "Avenir-Heavy",
    color: "#EE5A55"
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
  }
});
