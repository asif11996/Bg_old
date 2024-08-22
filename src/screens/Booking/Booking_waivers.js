import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { hp, wp } from "../../style/Dimensions";
import BookingDetailButton from "../../component/BookingDetailButton";
import TransactionList from "../../component/TransactionList";
import NewParticipantlist from "../../component/NewParticipantlist";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import { fetchBooking_Detail } from "../../store/action/booking";

import BookingWaiverStyle from "../../style/BookingWaiverStyle";
import { normalize } from "react-native-elements";
import Clipboard from "@react-native-clipboard/clipboard";
import useOrientation from "../../component/useOrientation";
import BookingWaiver_Header from "../../component/BookingWaiver_Header";
import { MyColors } from "../../style/MyColors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height; // alert(itemId);

const Booking_waivers = ({ navigation, route }) => {
  const { itemId, event_id } = route.params;
  const { bookingdetail, loading } = useSelector((state) => state.bookinglist);
  let bookingdetails = bookingdetail.bookings;
  const [showParticipant, setShowParticipant] = useState(true);
  const [showTransaction, setShowTransaction] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const { width, height, orientation } = useOrientation();

  const dispatch = useDispatch();

  const detail_Handler = async () => {
    let formData = new FormData();

    formData.append("booking_id", itemId);

    await dispatch(fetchBooking_Detail(itemId));
  };
  console.log("height and width is++++++++++++++++", windowHeight, windowWidth);

  useEffect(() => {
    detail_Handler();
  }, []);

  const toggleArray1 = () => {
    console.log("mm");
    setShowParticipant(true);
    setShowTransaction(false);
  };

  const toggleArray2 = () => {
    console.log("md");
    setShowParticipant(false);
    setShowTransaction(true);
  };

  const copyToClipboard = () => {
    Clipboard.setString(bookingdetail.liveLink);
    // alert("Copied to Clipboard!");
  };

  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

  // Function to truncate the text if it exceeds maxLength
  const showFlashMessage = () => {
    showMessage({
      message: "This is a flash message",
      description: "This is a description",
      type: "info", // 'success', 'info', 'warning', or 'danger'
      icon: "auto", // 'none', 'auto', or icon component (ReactNode)
      duration: 3000, // milliseconds
      hideOnPress: true // hide message when user presses it
    });
  };
  // alert(event_id);

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView
      style={{ ...BookingWaiverStyle.container, backgroundColor: "#ffff" }}
    >
      <StatusBar barStyle="light-content" />
      <BookingWaiver_Header
        bookingdetails={bookingdetails}
        event_id={event_id}
        navigation={navigation}
        bookingdetail={bookingdetail}
      />

      <View
        style={{
          // position: 'absolu te',
          // top: -hp(30),
          flex: 1,
          top: normalize(-15),
          height: hp(20),

          backgroundColor: MyColors.onTertiary,

          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
      >
        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "center",
            marginTop: orientation == "landscape" ? hp(5) : 0
          }}
        >
          <BookingDetailButton
            navigation={navigation}
            showTransaction={showTransaction}
            showParticipant={showParticipant}
            onClickTransaction={toggleArray1}
            onClickParticipants={toggleArray2}
          />
        </View>
        <View
          style={{
            flex: 1

            // top: windowHeight > 800 ? hp(1) : hp(7),
          }}
        >
          {showParticipant && (
            <TransactionList transactions={bookingdetails?.transactions} />
          )}
          {showTransaction && (
            <NewParticipantlist
              waiver={bookingdetails}
              Booking_id={itemId}
              navigation={navigation}
              total_participant={bookingdetails?.total_participants}
              event_id={event_id}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Booking_waivers;

const styles = StyleSheet.create({
  rotatedIcon: {
    // transform: [{rotateX: '500deg'}],
    right: -40,
    bottom: -10 // Adjust the rotation angle as needed
  },
  tinyLogo: {
    width: 50,
    height: 50,
    color: "red"
  },
  logo: {
    width: 66,
    height: 58
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60
    // backgroundColor: '#5683f6',
    // elevation: 4, // Android shadow
    // shadowColor: '#000000', // iOS shadow
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  iconContainer: {
    padding: 8
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff"
  },
  card: {
    width: wp(90),
    height: windowHeight > 800 ? hp(27) : hp(30),
    // flexDirection: 'row',
    marginBottom: 8,
    // padding: 5,
    backgroundColor: "#ffffff",

    // alignItems: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333"
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333"
  }
});
