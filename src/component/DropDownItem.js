// import React, {useState, useEffect} from 'react';
// import {View, Text, Platform, StyleSheet} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {hp, wp} from '../style/Dimensions';

// const DropDownItem = ({
//   dropdownhandler,
//   item,
//   setitem,
//   site_Id,
//   update,
//   title,
//   siteSearch,
// }) => {
//   const dropDownValue = item.find(itm => itm.value === site_Id);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(update ? dropDownValue.value : null);
//   const [scrollEnabled, setscrollEnabled] = useState(true);

//   useEffect(() => {
//     dropdownhandler(scrollEnabled, value);
//   }, [scrollEnabled]);
//   return (
//     <DropDownPicker
//       listMode="SCROLLVIEW"
//       open={open}
//       value={value}
//       autoScroll={true}
//       items={item}
//       onClose={() => setscrollEnabled(true)}
//       onOpen={() => setscrollEnabled(false)}
//       setOpen={setOpen}
//       multiple={true}
//       setValue={item => {
//         // alert("dsfdsfs");
//         setValue(item);
//         // alert(item);
//       }}
//       //   searchable={siteSearch}
//       max={1}
//       setItems={setitem}
//       placeholder={title}
//       style={{
//         borderColor: '#fff',
//         // width: wp(96),

//         // borderWidth: 0.8,
//         shadowColor: '#000',
//         borderRadius: wp(1.5),
//         shadowOpacity: 0.15,
//         shadowRadius: 3,
//         shadowOffset: {
//           height: 0,
//           width: 0,
//         },
//         elevation: 2,
//       }}
//       placeholderStyle={{
//         color: 'grey',
//       }}
//       dropDownContainerStyle={
//         Platform.OS == 'ios'
//           ? styles.dropdownContainerIOS
//           : styles.dropdownContainerANDROID
//       }
//     />
//   );
// };

// export default DropDownItem;

// const styles = StyleSheet.create({
//   dropdownContainerIOS: {
//     backgroundColor: '#fff',
//     position: 'relative',
//     // marginTop: -50,
//     zIndex: 1000,
//     marginBottom: 50,
//     borderWidth: 0.8,
//     borderColor: 'grey',
//     paddingBottom: 50,
//   },
//   dropdownContainerANDROID: {
//     // borderColor: "#fff",
//     borderWidth: 0.8,
//     borderColor: 'grey',
//   },
// });

import React, { useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { normalize } from "react-native-elements";
import { hp, wp } from "../style/Dimensions";
import { MyColors } from "../style/MyColors";

const DropDownItem = ({
  slots,
  dropdownhandler,
  item,
  setitem,
  site_Id,
  update,
  title,
  siteSearch,
  multiples,
  selected_timeslots
}) => {
  // Find the corresponding item for the initial value (site_Id)
  const dropDownValue = item.find((itm) => itm.value === site_Id);

  // State to manage the dropdown
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);
  // Effect to handle changes in selected values
  useEffect(() => {
    console.log("Selected Values issd :", values); // Log selected values for debugging
    dropdownhandler(values);
  }, [values]);
  // useEffect(() => {
  //   console.log(
  //     "Selected value slot1122:__________________",
  //     JSON.stringify(slots)
  //   ); // Log to verify the value of slots
  //   setValues(JSON.stringify(slots));

  //   // if (slots == "9:00 AM") {
  //   //   alert("9:00 AM");
  //   //   setValues("9:00 AM");
  //   // } else if (slots == "11:30 AM") {
  //   //   alert("11:30 AM");

  //   //   setValues("11:30 AM");
  //   // } else if (slots == "2:30 PM") {
  //   //   setValues("2:30 PM");
  //   // }

  //   // Ensure slots is an array containing a single string value
  // }, [slots]);
  useEffect(() => {
    // Log the selected_timeslots for debugging
    console.log("Selected Timeslots:+++", selected_timeslots);

    // Set the initial values when 'update' is true and selected_timeslots is not empty
    if (update && selected_timeslots && selected_timeslots.time_slots) {
      const timeSlotsArray = JSON.parse(selected_timeslots.time_slots);
      setValues(timeSlotsArray);
    }
  }, [update, selected_timeslots]);
  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={values}
      autoScroll={true}
      items={item}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      setOpen={setOpen}
      multiple={multiples}
      setValue={(selectedItems) => {
        console.log("Set Values:", selectedItems); // Log values set by DropDownPicker
        setValues(selectedItems);
      }}
      setItems={(selectedItems) => {
        console.log("Set Items:", selectedItems); // Log items set by DropDownPicker
        setitem(selectedItems);
      }}
      placeholder={title}
      badgeStyle={{
        padding: 0
      }}
      style={{
        height: normalize(40),

        borderColor: "#fff",
        borderRadius: wp(1.5),
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },
        elevation: 2
      }}
      placeholderStyle={{
        color: "grey"
      }}
      dropDownContainerStyle={
        Platform.OS === "ios"
          ? styles.dropdownContainerIOS
          : styles.dropdownContainerANDROID
      }
      theme="LIGHT"
      mode="BADGE"
      itemSeparator={true}
      badgeDotColors={[
        MyColors.secondary,
        MyColors.secondary,
        MyColors.secondary,
        MyColors.secondary,
        MyColors.secondary,
        MyColors.secondary,
        MyColors.secondary,
        MyColors.secondary
      ]}
    />
  );
};

export default DropDownItem;

const styles = StyleSheet.create({
  dropdownContainerIOS: {
    backgroundColor: "#fff",
    position: "relative",
    zIndex: 1000,
    marginBottom: 50,
    borderWidth: 0.8,
    borderColor: "grey",
    paddingBottom: 50
  },
  dropdownContainerANDROID: {
    borderWidth: 0.8,
    borderColor: "grey"
  }
});
