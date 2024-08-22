import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';

import TextHeading from './TextHeading';
import {hp, wp} from '../style/Dimensions';
import DropDownItem from './DropDownItem';
import Buttons from './Buttons';
import {MyColors} from '../style/MyColors';
import HeaderComponent from './HeaderComponent';
import {
  create_BlockDate,
  fetchTimelist,
  fetchUnavailableDate_time,
} from '../store/action/blockDate';
import ActivityIndicatorComponent from './ActivityIndicatorComponent';
import BlockedDateCalendar from './BlockedDateCalendar';

const BlockDateFormComponent = ({navigation, route}) => {
  const {timeSlot, blockDate_time, error, loading, success} = useSelector(
    state => state.blockDate,
  );
  const {item, update} = route.params || {};

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(update ? [item.start_date] : '');
  const [endDate, setEndDate] = useState(update ? [item.end_date] : '');
  const [participant, setParticipant] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [visible, setVisible] = useState('');
  const [items, setItems] = useState([]);

  const [payment, setPayment] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  let clears;

  console.log('dsfsd', blockDate_time);

  const result = Object.entries(blockDate_time)
    .map(([date, times]) => {
      // If times is an array, use it as is, otherwise filter non-falsy values from the object values
      const formattedTimes = Array.isArray(times)
        ? times
        : Object.values(times).filter(Boolean);

      // Check if the array length is 3 before proceeding
      if (formattedTimes.length === 3) {
        // Map each time to an object with properties id, date, and time
        return formattedTimes.map(time => ({
          id: `${date}_${time.replace(/\s/g, '')}`,
          date,
          time,
        }));
      } else {
        // Skip this iteration if the array length is not 3
        return [];
      }
    })
    .flat();

  const dropdownhandler = (data, value) => {
    setTimeSlots(data);
  };

  console.log('selected time slots is....m', timeSlots);
  const handleStartDateSelect = selectedDate => {
    setStartDate(selectedDate);
  };

  const handleEndDateSelect = selectedDate => {
    setEndDate(selectedDate);
  };

  const blockDate_Handler = async () => {
    let dataToSend;

    if (update) {
      console.log(
        'start date and end date is .......',
        startDate[0],
        endDate[0],
      );
      // If update is truthy, use JSON object
      dataToSend = {
        id: item.id,
        start_date: startDate[0],
        end_date: endDate[0],
        time_slots: [], // Initialize time_slots as an empty array
      };

      timeSlots.forEach(slot => {
        dataToSend.time_slots.push(slot);
      });
    } else {
      // If update is falsy, use FormData

      console.log(startDate, endDate);
      let formData = new FormData();

      formData.append('start_date', startDate);
      formData.append('end_date', endDate);
      formData.append('time_slots[]', timeSlots);

      dataToSend = formData;
    }
    await dispatch(create_BlockDate(dataToSend, update));
  };

  const fetchTimeslot_Handler = async () => {
    try {
      await dispatch(fetchTimelist());
    } catch (err) {
      // alert(err);

      console.error('error is', err);
      // DevSettings.reload();
      // setError(err.message);
    }
  };
  const fetchTBlockDate_Handler = async () => {
    try {
      //   await dispatch(fetchTimelist());

      await dispatch(fetchUnavailableDate_time());

      // DevSettings.reload();
    } catch (err) {
      //   alert(err);

      console.log(err);
      // DevSettings.reload();
      // setError(err.message);
    }
  };

  success && navigation.navigate('BlockDateList');

  useEffect(() => {
    if (success) {
      clears = setTimeout(() => {
        navigation.navigate('BlockDateList');
      }, 700);
    }
    return () => {
      setVisible('');

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [success]);
  useEffect(() => {
    fetchTimeslot_Handler();
    fetchTBlockDate_Handler();
    return () => {
      setVisible(null);
    };
  }, []);
  useEffect(() => {
    return () => {
      setVisible(null);
    };
  }, []);
  useEffect(() => {
    const updateArray =
      timeSlot?.map(arr => ({
        label: arr,
        value: arr,
      })) || [];

    setItems(updateArray);
  }, [timeSlot]);

  const checkFormFieldsStatus = () => {
    // setVisible(!visible);
    if (!timeSlots) {
      setVisible('Time Slots Field is required');
      // setTimeout(() => {
      //   setVisible("");
      // }, 3000);
    } else if (!startDate) {
      setVisible('Start Date Field is required!');
      // setTimeout(() => {
      //   setVisible("");
      // }, 3000);
    } else if (!endDate) {
      setVisible('End Date Field is required');
      // setTimeout(() => {
      //   setVisible("");
      // }, 3000);
    } else {
      setVisible('');
      blockDate_Handler();
    }
  };
  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: hp(1),
        paddingHorizontal: wp(2),
      }}>
      <View
        style={{
          height: 210,
          width: 210,
          backgroundColor: MyColors.primary,
          borderRadius: 105,
          position: 'absolute',
          top: 0,
          left: -80,
          top: -80,
        }}></View>

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() =>
          navigation.navigate('BlockDateList') && dispatch(clearState())
        }
      />
      {(!!success || !!error || !!visible) && (
        <View style={{marginTop: hp(0)}}>
          <SnackMessage
            success={success}
            visible={visible}
            error={error}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )}

      {/* <View style={{}}> */}
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 8,
          // padding: 6,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Avenir-Heavy',
            fontWeight: 'bold',
            color: MyColors.onPrimary,
          }}>
          {'Block Date'}
        </Text>
      </View>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            // keyboardShouldPersistTaps="always"
            // scrollEnabled={focusPoint.current}
          >
            <View
              style={{
                flex: 4,
                // backgroundColor: '#f2f2f2',
              }}>
              <View style={{backgroundColor: '#f2f2f2'}}>
                {/* <DateandTime
                    datepickerhandler={datepickerhandler}
                    defaultTime={time}
                    update={update}
                  /> */}
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Time Slot:'} />

                  <DropDownItem
                    dropdownhandler={dropdownhandler}
                    item={[
                      {label: '9:00 AM', value: '9:00 AM'},
                      {label: '11:30 AM', value: '11:30 AM'},
                      {label: '2:30 PM', value: '2:30 PM'},
                    ]}
                    setitem={setItems}
                    // site_Id={site_id}
                    // update={update}
                    title={'Select Time Slot'}
                    siteSearch={true}
                    multiples={true}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Start Date:'} />

                  {/* <DatePickers onDateSelect={handleStartDateSelect} /> */}
                  <BlockedDateCalendar
                    onSelectedDatesChange={handleStartDateSelect}
                    blocks={result}
                    date={update ? item.start_date : ''}
                    update={update}
                  />
                </View>

                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'End Date:'} />
                  <View>
                    <BlockedDateCalendar
                      onSelectedDatesChange={handleEndDateSelect}
                      blocks={result}
                      date={update ? item.end_date : ''}
                      update={update}
                    />
                  </View>

                  {/* <DatePickers onDateSelect={handleEndDateSelect} /> */}
                </View>

                <View
                  style={{
                    marginBottom: hp(1),
                    marginTop: 20,
                  }}>
                  <Buttons
                    bg={MyColors.secondary}
                    heights={hp(6)}
                    widths={wp(25)}
                    border={wp(1.5)}
                    onPresses={checkFormFieldsStatus}
                    title={update ? 'Update' : 'Submit'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BlockDateFormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // marginVertical: hp(7),
    marginTop: hp(6),
    // backgroundColor: 'red',

    // paddingHorizontal: 10,
  },
});
