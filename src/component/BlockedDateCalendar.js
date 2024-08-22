import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { MyColors } from "../style/MyColors";
import { hp, wp } from "../style/Dimensions";
import Icon from "react-native-vector-icons/Entypo";

const windowHeight = Dimensions.get("window").height;

const BlockedDateCalendar = ({
  onSelected_Start_Dates,
  onSelected_End_Dates,
  blocks,
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

    blocks?.forEach((item) => {
      const formattedDate = item.date.split("-").reverse().join("-");
      disabledDates[formattedDate] = {
        disabled: true,
        disableTouchEvent: true,
        marked: true,
        selected: true
      };
    });

    console.log("disabled dates is ...........", disabledDates);
    setSelectedDates((prevSelectedDates) => ({
      ...prevSelectedDates,
      ...disabledDates
    }));
  }, [blocks]);

  // const onDayPress = day => {
  //   console.log("day data is ........",day)
  //   const selectedDate = day.dateString;
  //   const endDateObject = new Date(selectedDate);

  //   if (!selectedStartDate || selectedEndDate) {
  //     setSelectedStartDate(selectedDate);
  //     setSelectedEndDate(null);
  //   } else if (selectedStartDate && !selectedEndDate) {
  //     if (selectedDate < selectedStartDate) {
  //       alert('test12')
  //       setSelectedStartDate(selectedDate);
  //       setSelectedEndDate(null);
  //     } else {
  //       alert('test')

  //       setSelectedEndDate(selectedDate);
  //     }
  //   }

  //   const selectedDates = { [selectedDate]: { selected: true } };
  //   const newSelectedDates = {
  //     [format(endDateObject, 'dd-MM-yyyy')]: {selected: true},
  //   };
  //   console.log("end date is ......newSelectedDates",selectedStartDate,selectedEndDate)

  //   onSelectedDatesChange(!selectedStartDate? selectedDates:null,selectedStartDate ? selectedDates:null);
  //   setSelectedDatesText(`${selectedStartDate} to ${selectedEndDate || selectedDate}`);
  // };
  const onDayPress = (day) => {
    const selectedDate = day.dateString;

    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(selectedDate);
      setSelectedEndDate(null);
      const startDate = new Date(selectedDate);
      // const newSelectedDates = {
      //   [format(startDate, 'dd-MM-yyyy')]: {selected: true},
      // };
      const startDates = format(startDate, "dd-MM-yyyy");

      onSelected_Start_Dates(startDates);
    } else if (selectedStartDate && !selectedEndDate) {
      if (selectedDate < selectedStartDate) {
        setSelectedStartDate(selectedDate);
        setSelectedEndDate(null);
        const endDate = new Date(selectedDate);
        // const newSelectedDates = {
        //   [format(endDate, 'dd-MM-yyyy')]: {selected: true},
        // };

        const endDates = format(endDate, "dd-MM-yyyy");
        onSelected_End_Dates(endDates);
      } else {
        setSelectedEndDate(selectedDate);
        const endDate = new Date(selectedDate);
        // const newSelectedDates = {
        //   [format(endDate, 'dd-MM-yyyy')]: {selected: true},
        // };
        const endDates = format(endDate, "dd-MM-yyyy");

        onSelected_End_Dates(endDates);
      }
    }

    // Update the text to show the selected date range
    setSelectedDatesText(
      `${selectedStartDate || selectedDate} to ${
        selectedEndDate || selectedDate
      }`
    );
  };
  const getDatesBetween = (startDate, endDate) => {
    const dates = {};
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      if (formattedDate !== startDate && formattedDate !== endDate) {
        dates[formattedDate] = {
          color: MyColors.primary,
          textColor: "white",
          marked: true
        };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    while (currentDate <= endDate) {
      dates.push(format(currentDate, "yyyy-MM-dd"));
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <TextInput
          placeholder="Date"
          placeholderTextColor={"grey"}
          value={selectedDatesText}
          editable={false}
          style={styles.input}
        />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
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
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Icon name="cross" size={30} color="grey" />
                </TouchableOpacity>
              </View>
              <Calendar
                onDayPress={onDayPress}
                markingType={"period"}
                markedDates={{
                  ...selectedDates,

                  [selectedStartDate]: {
                    startingDay: true,
                    color: MyColors.primary,
                    textColor: "white"
                  },
                  [selectedEndDate]: {
                    endingDay: true,
                    color: MyColors.primary,
                    textColor: "white"
                  },
                  [`${selectedStartDate}/${selectedEndDate}`]: {
                    color: MyColors.primary,
                    startingDay: true,
                    endingDay: true,
                    textColor: "white"
                  },
                  ...getDatesBetween(selectedStartDate, selectedEndDate)
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
                      height: hp(7),
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

                      // alignSelf: 'center',
                      backgroundColor: selectedDatesText
                        ? MyColors.primary
                        : "grey",
                      borderRadius: 5,
                      margin: 4
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {"Continue"}
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

const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: hp(7),
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
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
  },
  closeButtonContainer: {
    height: 30,
    display: "flex",
    alignItems: "flex-end",
    width: wp(86)
  }
});

export default BlockedDateCalendar;
