import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { hp, wp } from "../style/Dimensions";
import { format } from "date-fns";
import TextHeading from "./TextHeading";
import Icon from "react-native-vector-icons/Entypo";
import { MyColors } from "../style/MyColors";
import Feather from "react-native-vector-icons/Feather";

import { Chip } from "react-native-paper";
import { normalize } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const windowHeight = Dimensions.get("window").height; // alert(itemId);

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc."
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui"
};

const BlockedDate = ({
  onSelectedDatesChange,
  blocks,
  booking_time,
  date,
  update,
  heading
}) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedDatesText, setSelectedDatesText] = useState(
    update ? date : ""
  );
  const [minDate, setMinDate] = useState("");

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentDateString = currentDate.toISOString().split("T")[0];
  //   setMinDate(currentDateString);

  //   const next9Days = Array.from({ length: 0 }, (_, index) => {
  //     const nextDate = new Date(currentDate);
  //     nextDate.setDate(currentDate.getDate() + index + 1);
  //     return format(nextDate, "yyyy-MM-dd");
  //   });

  //   const disabledDates = next9Days.reduce((acc, formattedDate) => {
  //     acc[formattedDate] = {
  //       disabled: true,
  //       disableTouchEvent: true,
  //       // marked: true,
  //       selected: true
  //     };
  //     return acc;
  //   }, {});

  //   setSelectedDates((prevSelectedDates) => ({
  //     ...prevSelectedDates,
  //     ...disabledDates
  //   }));
  // }, []);

  useEffect(() => {
    const disabledDates = {};

    blocks.forEach((item) => {
      const formattedDate = item.date.split("-").reverse().join("-");
      disabledDates[formattedDate] = {
        disabled: true,
        disableTouchEvent: true,
        // marked: true,
        selected: true
      };
    });

    console.log("disabled dates is ...........", disabledDates);
    setSelectedDates((prevSelectedDates) => ({
      ...prevSelectedDates,
      ...disabledDates
    }));
  }, [blocks]);

  const onDayPress = (day) => {
    console.log("on day press is ............", day);

    const selectedDate = day.dateString;
    const endDateObject = new Date(selectedDate);

    const newSelectedDates = {
      [format(endDateObject, "dd-MM-yyyy")]: { selected: true }
    };

    setSelectedDates((prevSelectedDates) => ({
      ...prevSelectedDates,
      ...newSelectedDates
    }));

    const selectedDateText = format(endDateObject, "dd-MM-yyyy");
    // onSelectedDatesChange(Object.keys(newSelectedDates));
    onSelectedDatesChange(selectedDateText);

    // console.log(
    //   "newSelectedDates++++++++____________",
    //   [format(endDateObject, "dd-MM-yyyy")],
    //   selectedDateText
    // );
    setSelectedDatesText(selectedDateText);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // console.log('selected dates is ....', selectedDates);

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <TextInput
          placeholder="Selected Date"
          placeholderTextColor={"grey"}
          value={selectedDatesText}
          editable={false}
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            // height: normalize(15),
            height: normalize(40),

            borderRadius: hp(1),
            color: "black",
            backgroundColor: "#fff",
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
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          backgroundColor: "red"
        }}
      >
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          animationIn="bounceInUp"
          animationInTiming={100}
          backdropTransitionInTiming={100}
          animationType="slide"
        >
          <View>
            <View style={styles.modalContent}>
              <View
                style={{
                  height: 30,
                  display: "flex",
                  // justifyContent: 'flex-end',
                  alignItems: "flex-end",
                  // backgroundColor: 'red',
                  width: wp(86)
                }}
              >
                <TouchableOpacity onPress={toggleModal}>
                  <Icon name="cross" size={30} color="grey" />
                </TouchableOpacity>
              </View>
              <Calendar
                onDayPress={(day) => {
                  onDayPress(day);
                }}
                // markingType={'period'}
                pagingEnabled={true}
                horizontal={true}
                calendarWidth={normalize(320)}
                markedDates={{
                  ...selectedDates,
                  // Add a custom style for the selected dates
                  [selectedDatesText]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: "#FFD700", // Change this color to your desired shadow color
                    selectedTextColor: "black" // Change this color to your desired text color
                  }
                }}
                minDate={minDate}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: "#F5B7B1",
                  selectedDayTextColor: MyColors.primary,
                  todayTextColor: "#00adf5",
                  dayTextColor: "#2d4150"
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#EDEFF0",
                height: 120,
                paddingHorizontal: 10,
                // alignItems: 'center',
                justifyContent: "center",
                marginVertical: 10,
                borderRadius: 10
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    borderRadius: 10
                    // paddingBottom: 10,
                  }}
                >
                  {heading}
                </Text>
                <View style={{ flexDirection: "row", width: wp(90) }}>
                  <TextInput
                    placeholder="Date"
                    placeholderTextColor={"grey"}
                    value={selectedDatesText}
                    editable={false}
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      height: normalize(38),
                      width: wp(60),
                      borderRadius: hp(1),
                      color: "black",
                      backgroundColor: "#ffffff",
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
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      selectedDatesText ? toggleModal() : console.log("pressed")
                    }
                    style={{
                      // shadowColor: 'red',
                      // elevation: 4,
                      // height: 30,

                      height: windowHeight > 800 ? hp(4) : hp(7),

                      width: windowHeight > 800 ? wp(23) : wp(25),
                      paddingTop: 0,
                      paddingBottom: 0,
                      justifyContent: "center",
                      alignItems: "center",

                      alignSelf: "center",
                      backgroundColor: selectedDatesText
                        ? MyColors.primary
                        : "grey",
                      borderRadius: 5,
                      margin: 4
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {"Save"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default BlockedDate;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    paddingTop: 10,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
