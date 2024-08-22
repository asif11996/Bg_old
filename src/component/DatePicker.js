// import React, {useState} from 'react';
// import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {hp, wp} from '../style/Dimensions';
// import TextHeading from './TextHeading';
// import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

// const DatePickers = ({onDateSelect}) => {
//   const [date, setDate] = useState(new Date('12-12-2023'));
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [dates, setDates] = useState('');

//   const handleDateChange1 = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate !== undefined) {
//       setDate(selectedDate);
//       onDateSelect(selectedDate); // Call the callback function with the selected date
//     }
//   };

//   const handleDateChange = async (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     // setShow(Platform.OS === 'ios');
//     setShowDatePicker(false);

//     setDate(currentDate);
//     let tempDate = new Date(currentDate);
//     let hour = tempDate.getMonth();

//     console.log('temp date is ..............', tempDate);

//     let fDate =
//       currentDate.getDate() +
//       '-' +
//       currentDate.getMonth() +
//       '-' +
//       currentDate.getFullYear();
//     // 1 +

//     // currentDate.getMonth() +
//     // 1 +
//     // '-' +
//     // currentDate.getDate() +
//     // '-' +
//     // currentDate.getFullYear();

//     // let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
//     // +
//     // " " +
//     // (tempDate.getHours() <= 12 ? "AM" : "PM");

//     // await setTime(fTime);
//     // await setDates(fDate);

//     await setDates(fDate);
//     onDateSelect(fDate); // Call the callback function with the selected date

//     // await datepickerhandler(fTime, fDate, mode);
//   };

//   return (
//     // <View>
//     //   <TouchableOpacity
//     //     style={styles.input}
//     //     onPress={() => setShowDatePicker(true)}>
//     //     <Text>{'sfsdf'}</Text>
//     //   </TouchableOpacity>

//     //   {showDatePicker && (
//     //     <DateTimePicker
//     //       value={date}
//     //       mode="date"
//     //       display="default"
//     //       onChange={handleDateChange}
//     //     />
//     //   )}
//     // </View>

//     <View style={{marginTop: hp(1)}}>
//       <TouchableOpacity
//         onPress={() => setShowDatePicker(true)}
//         // placeholderTextColor={"#E5E8E8"}
//         style={{
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           flexDirection: 'row',
//           height: hp(7),

//           borderRadius: hp(1),
//           backgroundColor: '#fff',
//           // borderWidth: 0.3,
//           // borderColor: "#3155A5",
//           paddingHorizontal: wp(2),
//           shadowColor: '#000',
//           borderRadius: wp(1.5),
//           shadowOpacity: 0.15,
//           shadowRadius: 3,
//           shadowOffset: {
//             height: 0,
//             width: 0,
//           },
//           elevation: 2,
//         }}>
//         {/* <Icon
//           color={'#3155a5'}
//           name={'date'}
//           type={'Fontisto'}
//           size={hp(2.5)}
//           onPress={() => {}}
//         /> */}

//         <Text style={{paddingLeft: wp(2), color: 'grey'}}>{dates}</Text>
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode="date"
//           display="spinner"
//           onChange={handleDateChange}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: hp(6.5),
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     paddingHorizontal: wp(2),
//     shadowColor: '#000',
//     borderRadius: wp(1.5),
//     shadowOpacity: 0.15,
//     shadowRadius: 3,
//     shadowOffset: {
//       height: 0,
//       width: 0,
//     },
//     elevation: 2,
//   },
// });

// export default DatePickers;
// import React, {useState, useEffect} from 'react';
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {hp, wp} from '../style/Dimensions';

const DatePickers = ({onDateSelect}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    onDateSelect(format(currentDate, 'dd-MM-yyyy'));
  };

  return (
    <View style={{marginTop: hp(1)}}>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          height: hp(7),
          borderRadius: hp(1),
          backgroundColor: '#fff',
          paddingHorizontal: wp(2),
          shadowColor: '#000',
          borderRadius: wp(1.5),
          shadowOpacity: 0.15,
          shadowRadius: 3,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 2,
        }}>
        <Text style={{paddingLeft: wp(2), color: 'grey'}}>
          {format(date, 'dd-MM-yyyy')}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          disabled={true}
        />
      )}
    </View>
  );
};

export default DatePickers;
