import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";

import React from "react";
import ModalResponse from "./ModalResponse";
// import { hp, wp } from "../style/Dimensions";
import { MyColors } from "../style/MyColors";
import BookingWaiverStyle from "../style/BookingWaiverStyle";
import useOrientation from "./useOrientation";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height; // alert(itemId);

const BookingDetailButton = ({
  navigation,

  onClickTransaction,
  onClickParticipants,
  showTransaction,
  showParticipant
}) => {
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
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          backgroundColor: !showTransaction ? MyColors.primary : "#ffffff",
          width: wp(32),
          height: hp(5),

          ...BookingWaiverStyle.switchButtonStyle
        }}
        onPress={onClickTransaction}
      >
        {/* <View style={styles.changeUserButtonStyle}> */}
        <Text
          style={{
            color: showTransaction ? MyColors.primary : "white",

            ...BookingWaiverStyle.switchButtonText
          }}
        >
          Transactions
        </Text>
        {/* </View> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClickParticipants}
        style={{
          backgroundColor:
            !showParticipant == true ? MyColors.primary : "#ffffff",
          width: wp(32),

          ...BookingWaiverStyle.secondswitchButtonStyle
        }}

        // style={{fle}}
      >
        {/* <Icons name="nfc-search-variant" size={wp(5)} color="#fff" /> */}
        <Text
          style={{
            color: showParticipant ? MyColors.primary : "white",

            ...BookingWaiverStyle.switchButtonText
          }}
        >
          Participants
        </Text>
      </TouchableOpacity>
      {/* </Ripple> */}
      {/* {(!!message || !!error) && (
        <ModalResponse
          message={message ? message : error}
          modalToggleState={modalToggleState}
        />
      )} */}
    </View>
  );
};

export default BookingDetailButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    // justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#121212",
  },
  changeUserButtonStyle: {
    // height: hp(6),
    // width: wp(32),
    backgroundColor: "#3155A5",

    backgroundColor: MyColors.primary,
    // borderRadius: hp(4),
    // borderTopLeftRadius: hp(4),
    // borderBottomLeftRadius: hp(4),
    justifyContent: "center"
  },
  changeUserTouchableStyle: {
    // height: hp(5),
    // borderRadius: hp(4),
    // width: hp(16)
  },
  changeUserTextStyle: {
    textAlign: "center",
    // fontSize: hp(1.7),
    color: "#fff",
    fontFamily: "OpenSans-Bold"
  },
  scannerViewStyle: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
