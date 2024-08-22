import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Dimensions, StatusBar, Alert } from "react-native";

import BookingStyle from "../../style/BookingStyle";
// import { wp, hp } from "../../style/Dimensions";
import HeaderComponent from "../../component/HeaderComponent";
import { MyColors } from "../../style/MyColors";
import { useNavigation } from "@react-navigation/core";

import {
  fetchBooking_Dashboard,
  sendEmail,
  update_fetchBooking_Dashboard
} from "../../store/action/booking";

import { useSelector, useDispatch } from "react-redux";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import { SafeAreaView } from "react-native-safe-area-context";

import SnackMessage from "../../component/SnackMessage";
import { useFocusEffect } from "@react-navigation/native";
import useOrientation from "../../component/useOrientation";
import HeaderCircle from "../../component/HeaderCircle";
import Searchbar from "../../component/SearchBar";
import FlatlistComponent from "../../component/FlatlistComponent";
import BookingListCard from "../../component/BookingListCard";
import ListEmptyComponent from "../../component/ListEmptyComponent";
import {
  clearEventId_Action,
  setEventId_Action
} from "../../store/action/event";

const windowHeight = Dimensions.get("window").height; // alert(itemId);

const BookingList = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { event_id } = route.params;

  const [statdat, setStatDat] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State to indicate whether refreshing is in progress

  const [visible, setVisible] = useState("");
  const [eventId, setEventId] = useState(event_id);

  const { loading, booking, error, success } = useSelector(
    (state) => state.bookinglist
  );
  const { user } = useSelector((state) => state.auth);
  const { event_ids } = useSelector((state) => state.event);
  // alert(event_id);

  const dispatch = useDispatch();
  const { height, width, orientation } = useOrientation();
  console.log("event is ...........mmmbbbrrt", event_ids);
  // alert(event_id);
  // let event_id = 1;
  // console.log("booking in list is ...........", event_id, eventId);
  // console.log("screen dimensions is .....", height, width);
  useEffect(() => {
    // const { event_id } = route.params;

    EventHandler();
    return () => {
      dispatch(clearEventId_Action());
    };
  }, [route.params, dispatch, event_id]);
  const EventHandler = async () => {
    try {
      await dispatch(setEventId_Action(event_id));
      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      console.error("Error pass event id:", err);
    }
  };

  const BookingHandler = async () => {
    try {
      user.type == "admin"
        ? await dispatch(
            fetchBooking_Dashboard(event_id ? event_id : event_ids)
          )
        : await dispatch(fetch_Booker_Booking(user.id));
      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      console.error("Error fetching booking data:", err);
    }
  };
  const update_BookingHandler = async () => {
    await dispatch(
      update_fetchBooking_Dashboard(event_id ? event_id : event_ids)
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      // Call BookingHandler here
      update_BookingHandler();
      // BookingHandler();
    }, [event_id])
  );
  const sendEmails = async (id) => {
    try {
      await dispatch(sendEmail(id));
      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      // setError(err.message);
    }
  };

  // useEffect(() => {
  //   update_BookingHandler();
  //   return setEventId(null);
  // }, [eventId]);

  useEffect(() => {
    setStatDat(false);
    BookingHandler();
    // cacheClear();
    // clearStateCache();
  }, [event_id]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        await BookingHandler();
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, [dispatch, navigation]);
  useEffect(() => {
    setSuccessMsg(success ? success : "");
    setErrorMsg(error ? error : "");

    return () => {
      setSuccessMsg("");
      setErrorMsg("");
    };
  }, [success, error]);

  const navigation = useNavigation();

  const searchFilter = (item) => {
    const query = searchQuery.trim().toLowerCase();

    return (
      item.first_name?.toLowerCase()?.includes(query) ||
      item.last_name?.toLowerCase()?.includes(query) ||
      item.email?.toLowerCase()?.includes(query) ||
      item.booking_date?.toLowerCase()?.includes(query)
    );
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true while refreshing
    update_BookingHandler();

    setRefreshing(false);
  };

  // alert(event_id);

  console.log("loading.....................", loading);
  // alert(event_id);

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1EFEF" }}>
      {/* <StatusBar animated={true} backgroundColor={MyColors.primary} /> */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={MyColors.primary}
        // translucent={true}
      />
      <HeaderCircle />

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() => navigation.goBack() && dispatch(clearState())}
        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />
      {/* <View style={{}}> */}
      <View
        style={{
          flexDirection: "column",
          marginBottom: 6,
          padding: 6,
          justifyContent: "space-evenly"
          // alignItems: 'center',
          // backgroundColor: "red"
        }}
      >
        <Text style={BookingStyle.headertitle}>{"Booking"}</Text>
      </View>
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FlatlistComponent
        data={booking?.bookings?.filter(
          (item) => item.event_name !== "Easter Train" && searchFilter(item)
        )}
        renderItem={({ item }) => (
          <BookingListCard
            item={item}
            navigation={navigation}
            event_id={event_id}
            sendEmails={sendEmails}
          />
        )}
        ListEmptyComponent={() => <ListEmptyComponent />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {(successMsg || errorMsg) && (
        <View style={{}}>
          <SnackMessage
            success={successMsg}
            visible={true}
            error={errorMsg}
            setVisibleFunction={() => setVisible("")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookingList;
