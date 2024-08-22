import React, { useRef, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  Agenda,
  calendarTheme
} from "react-native-calendars";
import testIDs from "./../../component/agenda/testIDs";
import { useSelector, useDispatch } from "react-redux";

import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { fetchCalendar_Event } from "../../store/action/booking";
import { da } from "date-fns/locale";
import { format, parse, parseISO } from "date-fns";

import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import HeaderComponent from "../../component/HeaderComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteModel from "../../component/DeleteModel";
import CustomModal from "../../component/CustomModel";
import CalendarModal from "../../component/CalendarModal";
import { MyColors } from "../../style/MyColors";
import { normalize } from "react-native-elements";
import { wp } from "../../style/Dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/Feather";
import AgendaListCard from "../../component/AgendaListCard";
import { useIsFocused } from "@react-navigation/native";

const BookingCalendar = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, calendarEvent, error, message } = useSelector(
    (state) => state.bookinglist
  );
  const [items, setItems] = useState({});
  const [selectedItem, setSelectedItem] = useState({});

  console.log("itemis ....vs", items);

  useEffect(() => {
    const convertedData = {};
    const marked = {};

    calendarEvent.forEach((item) => {
      const parsedDate = parse(item.booking_date, "dd-MM-yyyy", new Date());

      const dateString = format(parsedDate, "yyyy-MM-dd");
      console.log("date is....", dateString);

      marked[dateString] = {
        // disabled: true,
        // disableTouchEvent: true,
        marked: true,
        selected: true
      };
      if (!convertedData[dateString]) {
        convertedData[dateString] = [];
      }
      const newItem = {
        booking_date: item.booking_date,
        total_price: item.total_price,
        unit_price: item.event_name,
        total_participants: item.total_participants,
        event_name: item.event_name,
        completed_waiver_count: item.completed_waiver_count,
        first_name: item.first_name,
        last_name: item.last_name
      };
      convertedData[dateString].push(item);
    });
    setItems(convertedData);
    setMarkedDates((prevSelectedDates) => ({
      // ...prevSelectedDates,
      ...marked
    }));
    console.log("convertedData is....", convertedData);
  }, [calendarEvent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCalendar_Event());
      } catch (err) {
        console.error(err);
        // Handle error
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCalendar_Event());
      } catch (err) {
        console.error(err);
        // Handle error
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused, dispatch]);

  console.log("calendar event is *******1122", items);

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";
    console.log("reservation event is *******", reservation);

    return (
      <AgendaListCard reservation={reservation} />
      // <TouchableOpacity
      //   style={styles.item}
      //   // onPress={() => alert("dfs")}

      //   onPress={() => openModal(reservation)}
      // >
      //   <View style={{ paddingTop: 20 }}>
      //     <MaterialCommunityIcons
      //       name="check-circle"
      //       size={normalize(40)}
      //       color={MyColors.primary}
      //       style={{ alignSelf: "center", fontWeight: "bold" }}
      //     />
      //   </View>
      //   <Text
      //     style={{
      //       fontSize: normalize(16),
      //       // marginBottom: 20,
      //       textAlign: "center",
      //       marginTop: normalize(10),
      //       color: MyColors.primary,
      //       fontWeight: "bold"
      //     }}
      //   >
      //     {reservation.event_name}
      //   </Text>
      //   <Text
      //     style={{
      //       fontSize: normalize(12),
      //       // marginBottom: 20,
      //       textAlign: "center",
      //       //   marginTop: 20,
      //       color: "#316c88",
      //       fontWeight: "bold"
      //     }}
      //   >
      //     {`${reservation.booker_name} Booked ${reservation.event_name} on ${reservation.booking_date} at`}
      //     <Text style={{ color: "#00000" }}> {reservation.booking_time}</Text>
      //   </Text>
      //   <View
      //     style={{
      //       flexDirection: "row",
      //       justifyContent: "space-between",
      //       width: wp(70),
      //       // backgroundColor: "red",
      //       alignSelf: "center"
      //     }}
      //   >
      //     <Text
      //       style={{
      //         fontSize: 14,
      //         // marginBottom: 20,
      //         textAlign: "center",
      //         // marginTop: 20,
      //         color: "#316c88",
      //         fontWeight: "400"
      //       }}
      //     >
      //       {"Total Participants:"}
      //     </Text>
      //     <Text
      //       style={{
      //         fontSize: 14,
      //         // marginBottom: 20,
      //         textAlign: "center",
      //         // marginTop: 20,
      //         color: "#316c88",
      //         fontWeight: "400"
      //       }}
      //     >
      //       {reservation.total_participants}
      //     </Text>
      //   </View>
      //   <View
      //     style={{
      //       flexDirection: "row",
      //       justifyContent: "space-between",
      //       width: wp(70),
      //       // backgroundColor: "red",
      //       alignSelf: "center"
      //     }}
      //   >
      //     <Text
      //       style={{
      //         fontSize: normalize(14),
      //         // marginBottom: 20,
      //         textAlign: "center",
      //         // marginTop: 20,
      //         color: "#316c88",
      //         fontWeight: "400"
      //       }}
      //     >
      //       {"Total Price:"}
      //     </Text>
      //     <Text
      //       style={{
      //         fontSize: normalize(14),
      //         // marginBottom: 20,
      //         textAlign: "center",
      //         // marginTop: 20,
      //         color: "#316c88",
      //         fontWeight: "400"
      //       }}
      //     >
      //       {reservation.total_price}
      //     </Text>
      //   </View>
      //   <View
      //     style={{
      //       flexDirection: "row",
      //       justifyContent: "space-between",
      //       width: wp(70),
      //       // backgroundColor: "red",
      //       alignSelf: "center"
      //     }}
      //   >
      //     <Text
      //       style={{
      //         fontSize: normalize(14),
      //         // marginBottom: 20,
      //         textAlign: "center",
      //         // marginTop: 20,
      //         color: "#316c88",
      //         fontWeight: "400"
      //       }}
      //     >
      //       {"Waivers signed:"}
      //     </Text>
      //     <Text
      //       style={{
      //         fontSize: normalize(14),
      //         // marginBottom: 20,
      //         textAlign: "center",
      //         // marginTop: 20,
      //         color: "#316c88",
      //         fontWeight: "400"
      //       }}
      //     >
      //       {reservation.total_waiver_signed}
      //     </Text>
      //   </View>
      //   {/* <Text style={{ fontSize: 16, color: "#43515c" }}>
      //     {reservation.event_name}
      //   </Text>
      //   <Text style={{ fontSize: 16, color: "#43515c" }}>
      //     {reservation.booking_time}
      //   </Text> */}
      // </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No events scheduled for this date</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOkPress = async (id) => {
    closeModal();
  };
  const renderDay = (day) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem} />;
  };
  // const renderEmptyDate = () => {
  //   return (
  //     <View style={styles.emptyDate}>
  //       <Text>No events for this date</Text>
  //     </View>
  //   );
  // };

  const isDateEmpty = (date) => {
    return (
      !items[date] || (Array.isArray(items[date]) && items[date].length === 0)
    );
  };

  const renderEmptyOrEvents = (date) => {
    return isDateEmpty(date) ? renderEmptyDate() : null;
  };

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "FBF8F8" }}>
      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() => navigation.goBack() && dispatch(clearState())}
        color={"white"}

        // onBackPress={() => props.navigation.goBack() && dispatch(clearState())}
        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={() => renderEmptyOrEvents(selectedDateString)}
        renderEmptyData={() => renderEmptyOrEvents()}
        rowHasChanged={rowHasChanged}
        onDayPress={(day) => {
          console.log("day pressed", day);
        }}
        showClosingKnob={true}
        markedDates={markedDates}
        theme={{
          ...calendarTheme,
          agendaDayTextColor: MyColors.primary,
          agendaDayNumColor: MyColors.primary,
          agendaTodayColor: MyColors.primary,
          agendaKnobColor: MyColors.secondary
        }}
        showOnlySelectedDayItems
        style={{ marginBottom: normalize(8) }}
      />
      {/* <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        onDayPress={(day) => {
          console.log("day pressed", day);
        }}
        showClosingKnob={true}
        markedDates={markedDates}
        theme={{
          ...calendarTheme,

          agendaDayTextColor: MyColors.primary,
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "blue"
        }}
        // markingType={"period"}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        theme={{ agendaKnobColor: MyColors.primary }}
        // renderDay={renderDay}
        // hideExtraDays={false}
        showOnlySelectedDayItems
        style={{ marginBottom: normalize(8) }}
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      /> */}
      <View style={{ backgroundColor: "red" }}>
        <CalendarModal
          visible={modalVisible}
          closeModal={closeModal}
          onOkPress={handleOkPress}
          // onCancelPress={handleCancelPress}
          message={selectedItem}
          // error={"msg_error"}
          cancel={null}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: normalize(5),
    padding: normalize(10),
    marginRight: normalize(10),
    marginTop: normalize(17)
    // marginBottom: normalize(5)
  },
  emptyDate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green"
  }
});

export default BookingCalendar;
