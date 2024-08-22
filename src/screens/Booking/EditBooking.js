import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform
} from "react-native";

import React, { useState, useEffect } from "react";
import TextHeading from "../../component/TextHeading";
import InputTexts from "../../component/InputTexts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../style/Dimensions";
import DropDownItem from "../../component/DropDownItem";
import Buttons from "../../component/Buttons";
import { MyColors } from "../../style/MyColors";
import HeaderComponent from "../../component/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { CheckBox, Icon, normalize } from "react-native-elements";

import {
  CardField,
  CardFieldInput,
  useStripe
} from "@stripe/stripe-react-native";
import {
  fetchTimelist,
  fetchUnavailableDate_time
} from "../../store/action/blockDate";
import BlockedDateCalendar from "../../component/BlockedDateCalendar";

import {
  clear_booking_state,
  create_Booking,
  create_token_failure,
  create_token_success,
  fetch_booking_Request
} from "../../store/action/booking";

import { eachMinuteOfInterval } from "date-fns";
import SnackMessage from "../../component/SnackMessage";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import { useNavigation } from "@react-navigation/core";
import { TextInput } from "react-native-paper";
import BlockedDate from "../../component/BlockedDate";
import { format, parseISO, parse } from "date-fns";
import TextView from "../../component/TextView";
import {
  responsiveFontSize,
  responsiveScreenHeight
} from "react-native-responsive-dimensions";
import useOrientation from "../../component/useOrientation";
import HeaderCircle from "../../component/HeaderCircle";

const EditBooking = (props) => {
  const { item, update, event_id } = props.route.params;

  const dispatch = useDispatch();

  const { timeSlot, blockDate_time } = useSelector((state) => state.blockDate);
  const { success, error, loading, booking, bookingdetail } = useSelector(
    (state) => state.bookinglist
  );
  // alert(event_id);
  const [location, setLocation] = useState("");
  const [name, seName] = useState(item.first_name + " " + item.first_name);
  const [email, setEmail] = useState(item.email);
  const [phone, setPhone] = useState(item.phone);
  const [times, setTime] = useState(item.time_slot);
  const [date, setDate] = useState(item.booking_date);
  const [group, setGroup] = useState(item.group_name);
  const [indicator, setIndicator] = useState(false);

  const [eventName, setEventName] = useState();
  const [sourceName, setSourceName] = useState(item.source);
  //   const [visible, setVisible] = useState("");

  const [totalPrice, setTotalPrice] = useState(400);
  const [participant, setParticipant] = useState(20);
  const [payment, setPayment] = useState("");
  const { createToken, theme } = useStripe();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [count, setCount] = useState(20);
  const [items, setItems] = useState([]);
  const [cardInfo, setCardInfo] = useState(null);
  const [stripeToken, setStripeToken] = useState(null);
  const [visible, setVisible] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [toggleYesCheckBox, setToggleYesCheckBox] = useState(false);
  const [toggleNoCheckBox, setToggleNoCheckBox] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(null);
  const [paycheck, setpayCheck] = useState(true);
  const [payNotcheck, setPayNotcheck] = useState(false);
  const { height, width } = useOrientation();

  const navigation = useNavigation();

  let clears;

  //   useEffect(() => {
  //     const bookingDateArrayString = item?.booking_date; // Assuming item.booking_date is '["02-03-2024"]'

  //     // Parse the stringified array into an actual array
  //     const bookingDateArray = JSON.parse(bookingDateArrayString);

  //     // Access the date string from the array
  //     const dateString = bookingDateArray[0];
  //     setDate(dateString);
  //   }, [item]);

  //   useEffect(() => {
  //     return () => {
  //       setVisible("");
  //       // result = '';
  //     };
  //   }, []);
  useEffect(() => {
    fetchTimeslot_Handler();
    fetchTBlockDate_Handler();
    handlDateSelect(item.booking_date);

    return () => {
      setVisible("");
    };
  }, []);
  useEffect(() => {
    handlDateSelect(item.booking_date);

    const clear = setTimeout(() => {
      handlDateSelect(item.booking_date);
    }, 700);

    return () => {
      clearTimeout(clear);
    };
  }, [item.booking_date]);
  console.log(
    "success msg23 is ####################################1122",
    success
  );

  useEffect(() => {
    // setSnackbarMessage(success);
    setIndicator(false);
    if (success) {
      // setSnackbarVisible(true);
      clears = setTimeout(() => {
        navigation.navigate("Bookinglist", { event_id: event_id });
      }, 2000);
    } else if (error !== "") {
      setSnackbarError(error);
      // setSnackbarMessage('Error deleting');
      //   setSnackbarVisible(true);
    }
    return () => {
      setVisible("");
      // dispatch(fetch_booking_Request());

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [snackbarError, snackbarMessage, success, error]);
  //   useEffect(() => {
  //     handleParticipantChange();
  //   }, [participant]);
  const fetchTimeslot_Handler = async () => {
    try {
      await dispatch(fetchTimelist());

      //   await dispatch(fetchUnavailableDate_time());

      // DevSettings.reload();
    } catch (err) {
      // alert(err);

      console.log(err);
      // DevSettings.reload();
      // setError(err.message);
    }
  };

  // const handlDateSelect = () => {};

  const dateString = item.booking_date.substring(
    2,
    item.booking_date.length - 2
  ); // Remove leading '[' and trailing ']'

  console.log("booking date is ......+++++++++", item.booking_date, date);

  //   function convertDateFormat(dateString) {
  //     // const bookingDate = item.booking_date[0]; // Accessing the first element assuming item.booking_date is an array
  //     // console.log("bookingDate is....", bookingDate);
  //     // Parse the date string with the current format
  //     const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());

  //     console.log(
  //       "paresed date++++++++++++++++",
  //       parsedDate,
  //       dateString,
  //       item.booking_date
  //     );
  //     // Format the parsed date into the desired format
  //     // const formattedDate = format(parsedDate, "yyyy-MM-dd");
  //     // return formattedDate;
  //   }
  //   const convertedDate = convertDateFormat(JSON.stringify(item.booking_date));
  //   console.log(convertedDate);

  function handlDateSelect(selectedDates) {
    // Check if selected date exists in blockDates
    // const selectedDate = '29-12-2023';

    const defaultTimeArray = [["9:00 AM", "11:30 AM", "2:30 PM"]];

    let blockDates = blockDate_time;
    const selectedDate = selectedDates;

    console.log("selectedDate>>>>>>>>>>>>>>>>>>......", selectedDate);

    setDate(selectedDate);

    if (blockDates[selectedDate]) {
      const blockDateSlots = blockDates[selectedDate];

      // Find unique time slots in defaultTimeArray
      const uniqueDefaultTimeSlots = timeSlot.filter(
        (defaultSlot) => !blockDateSlots.includes(defaultSlot)
      );
      console.log(
        "unique time slot is ..................",
        uniqueDefaultTimeSlots
      );
      const convertedArray = uniqueDefaultTimeSlots.map((time, index) => ({
        label: time,
        value: time // You can customize the 'value' property if needed
      }));
      setItems(convertedArray);
      // setItems(uniqueDefaultTimeSlots);

      // return uniqueDefaultTimeSlots;
    } else {
      // If selected date is not in blockDates, return defaultTimeArray
      console.log("unique time slot is ..................", timeSlot);
      const convertedArray = timeSlot.map((time, index) => ({
        label: time,
        value: time // You can customize the 'value' property if needed
      }));
      setItems(convertedArray);
      // return defaultTimeArray[0];
    }
  }

  const result = Object.entries(blockDate_time)
    .map(([date, times]) => {
      // If times is an array, use it as is, otherwise filter non-falsy values from the object values
      const formattedTimes = Array.isArray(times)
        ? times
        : Object.values(times).filter(Boolean);

      // Check if the array length is 3 before proceeding
      if (formattedTimes.length === 3) {
        // Map each time to an object with properties id, date, and time]
        console.log("formateed", formattedTimes);
        return formattedTimes.map((time) => ({
          id: `${date}_${time.replace(/\s/g, "")}`,
          date,
          time
        }));
      } else {
        // Skip this iteration if the array length is not 3
        return [];
      }
    })
    .flat();

  const dropdownhandler = (value) => {
    console.log("selected date is ......mnm", item.time_slot);
    setTime(value);
    // setscrollEnabled(data);
  };
  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  const checkFormFieldsStatus = (stripeToken) => {
    // reportHandler();

    console.log("times in checkFormFieldsStatus ....", times);

    if (!date) {
      setVisible("Date is required");
    } else if (times.length == 0) {
      setVisible("At least one TimeSlot is required");
    }
    bookingHandler();

    // const fields = [
    //   {value: firstName, message: 'First Name is required'},
    //   {value: lastName, message: 'Last Name is required'},
    //   {value: email, message: 'Email is required'},
    //   {value: phone, message: 'Phone is required'},
    //   {value: date, message: 'Date is required'},
    //   // {
    //   //   value: Array.isArray(times) && times.length > 0,
    //   //   message: 'At least one TimeSlot is required',
    //   // },
    //   {value: group, message: 'Group/School/Club Name is required'},
    //   {
    //     value: cardInfo && Object.keys(cardInfo).length > 0,
    //     message: 'Payment Information is required',
    //   },
    // ];

    // const emptyField = fields.find(field => !field.value);

    // if (emptyField) {
    //   return setVisible(emptyField.message);
    // }

    // setVisible('');
  };

  //   const createTokens = async () => {
  //     await dispatch(fetch_booking_Request());

  //     try {
  //       const { token, error } = await createToken({ ...cardInfo, type: "Card" });

  //       if (error) {
  //         console.error("Error creating token:", error);
  //         await dispatch(create_token_failure());
  //         setVisible("Error creating token");
  //       } else {
  //         console.log("Token created successfully:", token.id);
  //         console.log("Token created successfully:", token);

  //         // Call bookingHandler and pass the token
  //         setStripeToken(token.id);
  //         // bookingHandler(token.id);
  //         // bookingHandler(token.id);
  //       }
  //     } catch (e) {
  //       console.error("An unexpected error occurred:", e);
  //       setVisible("Error creating token");
  //     }
  //   };
  const bookingHandler = async () => {
    // await createTokens();

    dataToSend = {
      id: item.id,
      booking_date: date,
      time_slot: times // Initialize time_slots as an empty array
    };
    console.log("dataToSend is ++++++++======>>>>>>>>.......", dataToSend);

    //     let formData = new FormData();

    //     formData.append("event_id", 1);
    //     formData.append("first_name", firstName);
    //     formData.append("last_name", lastName);
    //     formData.append("email", email);
    //     formData.append("phone", phone);
    //     formData.append("booking_date", date);
    //     formData.append("time_slot", times);
    //     formData.append("group_name", group);
    //     formData.append("unit_price", 20);
    //     formData.append("min_participant", 20);
    //     formData.append("total_participants", participant);
    //     formData.append("total_price", totalPrice);
    //     formData.append("stripeToken", paycheck ? stripeToken : "");
    //     console.log("formdata is ......", formData);
    setIndicator(true);
    await dispatch(create_Booking(dataToSend, update));
    //   };
    // const calculateTotalPrice = participants => {
    //   const unitPrice = 20;
    //   return unitPrice * participants;
    // };
  };

  const fetchTBlockDate_Handler = async () => {
    try {
      await dispatch(fetchUnavailableDate_time());
    } catch (err) {
      console.log(err);
      // DevSettings.reload();
      // setError(err.message);
    }
  };
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

  return loading || indicator ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider
        style={{
          flex: 1,
          backgroundColor: "#f2f2f2",
          paddingTop: hp(1)
          // paddingHorizontal: wp(2)
        }}
      >
        <HeaderCircle />
        {/* <View
          style={{
            height: normalize(height > 1000 ? 260 : 190),
            width: normalize(height > 1000 ? 260 : 190),
            backgroundColor: MyColors.primary,
            borderRadius: normalize(height > 1000 ? 130 : 95),

            position: "absolute",
            top: 0,
            left: -normalize(height > 1000 ? 105 : 80),
            top: -normalize(height > 1000 ? 105 : 80)
          }}
        ></View> */}
        {/* <View
        style={{
          height: normalize(200),
          width: normalize(200),
          backgroundColor: MyColors.primary,
          borderRadius: normalize(100),
          position: "absolute",
          top: 0,
          left: -80,
          top: -80
        }}
      ></View> */}

        <HeaderComponent
          // title={'Scan QR Code'}
          onBackPress={() =>
            props.navigation.navigate("Bookinglist", { event_id: event_id }) &&
            dispatch(clearState())
          }
          // onBackPress={() => props.navigation.goBack() && dispatch(clearState())}
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
            // backgroundColor: 'red',
          }}
        >
          <Text style={BookingStyle.headertitle}>{"Booking"}</Text>
        </View>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              // keyboardShouldPersistTaps="always"
              // scrollEnabled={focusPoint.current}
            >
              <View
                style={{
                  flex: 3
                  // backgroundColor: '#f2f2f2',
                }}
              >
                {/* <Text
                style={{
                  marginHorizontal: 5,
                  // backgroundColor: "#121212",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: 15,

                  paddingBottom: 5
                }}
              >
                {"Personal Details"}
              </Text> */}

                <View
                  style={{
                    marginBottom: normalize(8),
                    backgroundColorL: "green",
                    paddingVertical: normalize(10),
                    paddingHorizontal: normalize(10),

                    // marginHorizontal: 8,
                    height: normalize(300),
                    width: wp(96),
                    alignSelf: "center",
                    backgroundColor: "white",
                    // alignItem s: 'center',
                    borderRadius: 8,
                    shadowColor: "grey",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    elevation: 4,
                    zIndex: 5
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{ width: wp(40) }}>
                      <TextView text={name} heading={"Name:"} />
                    </View>
                    <View style={{ width: wp(40) }}>
                      <TextView text={phone} heading={"Phone:"} />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{ width: wp(55) }}>
                      <TextView
                        text={item.event_name}
                        heading={"Event Name:"}
                      />
                    </View>
                    <View style={{ width: wp(30) }}>
                      <TextView text={item?.source} heading={"Source:"} />
                    </View>
                  </View>

                  {/* <TextView text={itemData?.name} heading={'Name:'} /> */}
                  <TextView text={item?.email} heading={"Email:"} />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{ width: wp(55) }}>
                      <TextView text={item.booking_date} heading={"Date:"} />
                    </View>
                    <View style={{ width: wp(30) }}>
                      <TextView text={item?.time_slot} heading={"Time:"} />
                    </View>
                  </View>
                </View>
                {/* <View
                style={{
                  backgroundColor: "#f2f2"
                  //   justifyConstent: "space-between"
                }}
              > */}
                {/* <DateandTime
                    datepickerhandler={datepickerhandler}
                    defaultTime={time}
                    update={update}
                  /> */}
                {/* <View style={{ marginTop: hp(1), backgroundColor: "#f2f2f2" }}>
                  <TextHeading title={"Name"} />

                  <InputTexts
                    placeHolders={"Name:"}
                    keyboardTypes={"default"}
                    values={name}
                    onChangeTexts={(text) => setFirstName(text)}
                    secureTextEntries={false}
                    editables={false}
                    IconName={"location"}
                    IconType={"EvilIcons"}
                    size={hp(3.5)}
                  />
                </View>
                <View style={{ marginTop: hp(1), backgroundColor: "#f2f2f2" }}>
                  <TextHeading title={"Name"} />

                  <InputTexts
                    placeHolders={"Name:"}
                    keyboardTypes={"default"}
                    values={name}
                    onChangeTexts={(text) => setEventName(text)}
                    secureTextEntries={false}
                    editables={false}
                    IconName={"location"}
                    IconType={"EvilIcons"}
                    size={hp(3.5)}
                  />
                </View> */}
                {/* <View style={{ marginTop: hp(1) }}>
                  <TextHeading title={"Last Name:"} />

                  <InputTexts
                    placeHolders={"Enter Last Name"}
                    keyboardTypes={"default"}
                    values={lastName}
                    onChangeTexts={(action) => setLastName(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={"create-outline"}
                    IconType={"Ionicons"}
                    size={hp(3)}
                  />
                </View> */}
                {/* <View style={{ marginTop: hp(1) }}>
                  <TextHeading title={"Email:"} />

                  <InputTexts
                    placeHolders={"Enter Email"}
                    keyboardTypes={"email-address"}
                    values={email}
                    onChangeTexts={(action) => setEmail(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={"create-outline"}
                    IconType={"Ionicons"}
                    size={hp(3)}
                  />
                </View> */}
                {/* <View style={{ marginTop: hp(1) }}>
                  <TextHeading title={"Phone:"} />

                  <InputTexts
                    placeHolders={"Enter Phone"}
                    keyboardTypes={"phone-pad"}
                    values={phone}
                    onChangeTexts={(action) => setPhone(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={"create-outline"}
                    IconType={"Ionicons"}
                    size={hp(3)}
                  />
                </View>
                <View style={{ marginTop: hp(1) }}>
                  <TextHeading title={"Source:"} />

                  <InputTexts
                    placeHolders={"Source"}
                    keyboardTypes={"default"}
                    values={group}
                    onChangeTexts={(action) => setGroup(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={"create-outline"}
                    IconType={"Ionicons"}
                    size={hp(3)}
                  />
                </View>
                <View style={{ marginTop: hp(1) }}>
                  <TextHeading title={"Group/School/Club Name:"} />

                  <InputTexts
                    placeHolders={"Group/School/Club Name"}
                    keyboardTypes={"default"}
                    values={group}
                    onChangeTexts={(action) => setGroup(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={"create-outline"}
                    IconType={"Ionicons"}
                    size={hp(3)}
                  />
                </View> */}
                <View style={{ paddingHorizontal: wp(2) }}>
                  <Text
                    style={{
                      marginHorizontal: normalize(5),
                      // backgroundColor: "#121212",
                      color: MyColors.primary,
                      fontWeight: "bold",
                      fontSize: normalize(15),

                      paddingBottom: normalize(5)
                    }}
                  >
                    {"Update booking date and time slot:"}
                  </Text>
                  <View
                    style={{
                      marginTop: normalize(1)
                    }}
                  >
                    <TextHeading title={"Date:"} />

                    <BlockedDate
                      onSelectedDatesChange={handlDateSelect}
                      blocks={result}
                      booking_time={true}
                      date={item.booking_date}
                      update={true}
                      heading={"Date:"}
                    />
                  </View>
                  <View style={{ marginTop: normalize(1) }}>
                    <TextHeading title={"Time Slot:"} />

                    <DropDownItem
                      dropdownhandler={dropdownhandler}
                      item={items}
                      setitem={setItems}
                      // site_Id={site_id}
                      update={update}
                      title={"Select Time Slot"}
                      siteSearch={true}
                      multiples={false}
                      // selected_timeslots={item}
                      slots={item.time_slot}
                    />
                  </View>
                  <View
                    style={{
                      marginBottom: hp(1),
                      marginTop: normalize(20)
                    }}
                  >
                    <Buttons
                      bg={MyColors.primary}
                      heights={width > height ? hp(10) : hp(6)}
                      widths={wp(25)}
                      border={wp(1.5)}
                      onPresses={() => bookingHandler()}
                      title={"Update"}
                    />
                  </View>
                </View>
              </View>
              {/* </View> */}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
        {(success || snackbarError || visible) && (
          <View style={{}}>
            <SnackMessage
              success={snackbarMessage || success}
              visible={visible}
              error={snackbarError || visible}
              setVisibleFunction={() => setVisible("")}
            />
          </View>
        )}
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default EditBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    // marginVertical: hp(7),
    marginTop: Platform.OS == "android" ? hp(6) : 0
    // backgroundColor: 'red',

    // paddingHorizontal: 10,
  },
  cardField: {
    width: "100%",
    height: normalize(50),
    color: "red",
    marginVertical: normalize(10)
  },
  cardFieldContainer: {
    alignSelf: "center",
    width: "80%",
    height: hp(5.5),
    alignSelf: "center",
    width: wp(96) // Adjust the width as needed
  },
  payButton: {
    backgroundColor: MyColors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  payButtonText: {
    color: "red",
    fontSize: 16,
    textAlign: "center"
  },
  priceText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "600"
  },
  containers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
    backgroundColor: "#f2f2f2"
  },
  button: {
    backgroundColor: MyColors.primary,
    height: hp(6.5),
    width: wp(10),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey"
  },
  input: {
    height: hp(6.5),
    alignSelf: "center",
    width: wp(96),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "#FFF",
    paddingHorizontal: wp(2),
    shadowColor: "#000",
    borderRadius: wp(1.5),
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2
  },
  inputText: {
    height: hp(6.5),
    alignSelf: "center",
    width: wp(72),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: wp(2),

    backgroundColor: "#FFF",
    paddingHorizontal: wp(2),
    // shadowColor: '#000',
    borderRadius: wp(1.5),
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2
  }
});
// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import TextHeading from '../../component/TextHeading';
// import InputTexts from '../../component/InputTexts';
// import DropDownItem from '../../component/DropDownItem';
// import DatePickers from '../../component/DatePicker';
// import Buttons from '../../component/Buttons';
// import {MyColors} from '../../style/MyColors';
// import HeaderComponent from '../../component/HeaderComponent';
// import {CardField, useStripe} from '@stripe/stripe-react-native';
// import {hp, wp} from '../../style/Dimensions';

// const BookingForm = props => {
//   const {createToken} = useStripe();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [time, setTime] = useState('');
//   const [participant, setParticipant] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(20 * participant);
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   const items = [
//     {label: '9:00 AM', value: 'apple'},
//     {label: '11:30 AM', value: 'banana'},
//     {label: '02:30 AM', value: 'bananas'},
//   ];

//   const dropdownhandler = (data, value) => {
//     setTime(value);
//   };

//   const handlePayment = async () => {
//     try {
//       const {tokenId, error} = await createToken({
//         type: 'Card',
//         card: {
//           number: '4242424242424242',
//           expMonth: 4,
//           expYear: 24,
//           cvc: '254',
//         },
//       });

//       if (error) {
//         console.error(error);
//       } else {
//         console.log('Token ID:', tokenId);
//         setPaymentMethod(tokenId);
//         // Handle the token ID as needed (e.g., send it to your server)
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const calculateTotalPrice = participants => {
//     const unitPrice = 20;
//     return unitPrice * participants;
//   };

//   const handleParticipantChange = value => {
//     setParticipant(value);
//     setTotalPrice(calculateTotalPrice(value));
//   };

//   return (
//     <SafeAreaProvider style={styles.container}>
//       <View style={styles.backgroundCircle}></View>
//       <HeaderComponent
//         onBackPress={() => props.navigation.navigate('Bookinglist')}
//       />
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Booking</Text>
//       </View>
//       <SafeAreaView style={styles.formContainer}>
//         <KeyboardAvoidingView behavior="padding">
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={styles.inputContainer}>
//               <TextHeading title={'First Name'} />
//               <InputTexts
//                 placeHolders={'First Name'}
//                 keyboardTypes={'default'}
//                 values={firstName}
//                 onChangeTexts={text => setFirstName(text)}
//               />
//             </View>
//             {/* ... (Repeat similar structure for other input fields) */}
//             <View style={styles.inputContainer}>
//               <TextHeading title={'Participants:'} />
//               <InputTexts
//                 placeHolders={'Enter Participants'}
//                 keyboardTypes={'numeric'}
//                 values={participant.toString()}
//                 onChangeTexts={action => handleParticipantChange(action)}
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <TextHeading title={'Payment information:'} />
//               <TouchableOpacity
//                 onPress={handlePayment}
//                 style={styles.payButton}>
//                 <Text style={styles.payButtonText}>Create Token</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.priceContainer}>
//               <Text style={styles.priceText}>
//                 {'Cart Total: $' + totalPrice.toFixed(2)}
//               </Text>
//               <Text style={styles.priceText}>
//                 {'Payment Information: ' +
//                   (paymentMethod ? 'Token created' : 'No token')}
//               </Text>
//             </View>
//             <View style={styles.buttonContainer}>
//               <Buttons
//                 bg={MyColors.secondary}
//                 heights={hp(6)}
//                 widths={wp(25)}
//                 border={wp(1.5)}
//                 onPresses={() => alert('Working...............')}
//                 title={'Create'}
//               />
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     marginTop: hp(6),
//   },
//   backgroundCircle: {
//     height: 200,
//     width: 200,
//     backgroundColor: MyColors.primary,
//     borderRadius: 100,
//     position: 'absolute',
//     top: -80,
//     left: -80,
//   },
//   headerContainer: {
//     flexDirection: 'column',
//     marginBottom: 6,
//     padding: 6,
//     justifyContent: 'space-evenly',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//   },
//   inputContainer: {
//     marginTop: hp(1),
//     backgroundColor: '#f2f2f2',
//   },
//   priceContainer: {
//     marginTop: hp(1),
//     padding: 10,
//   },
//   priceText: {
//     fontSize: 16,
//     color: 'grey',
//     fontWeight: '600',
//   },
//   buttonContainer: {
//     marginBottom: hp(1),
//     marginTop: 20,
//   },
//   payButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   payButtonText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default BookingForm;
