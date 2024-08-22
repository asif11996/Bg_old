import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextHeading from '../../component/TextHeading';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {hp, wp} from '../../style/Dimensions';
import DropDownItem from '../../component/DropDownItem';
import Buttons from '../../component/Buttons';
import {MyColors} from '../../style/MyColors';
import HeaderComponent from '../../component/HeaderComponent';
import {
  create_BlockDate,
  fetchTimelist,
  fetchUnavailableDate_time,
} from '../../store/action/blockDate';
import {useDispatch, useSelector} from 'react-redux';
import ActivityIndicatorComponent from '../../component/ActivityIndicatorComponent';
import SnackMessage from '../../component/SnackMessage';
import BlockedDateCalendar from '../../component/BlockedDateCalendar';
import SnackbarComponent from '../../component/SnackbarComponent';

const BlockDateForm = ({navigation, route}) => {
  const {timeSlot, blockDate_time, error, loading, success} = useSelector(
    state => state.blockDate,
  );
  const {item, update, timeSlot_list} = route.params || {};

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(update ? [item.start_date] : '');
  const [endDate, setEndDate] = useState(update ? [item.end_date] : '');
  const [participant, setParticipant] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [visible, setVisible] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(null);

  const [items, setItems] = useState([]);

  const [payment, setPayment] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  let clears;

  console.log(
    'time slot lits success msg is ########################## 1122',
    success,
  );
  console.log(
    'block date_time list is ##########################',
    blockDate_time,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await fetchTimeslot_Handler();
        await fetchTBlockDate_Handler();
      } catch (err) {
        console.error(err);
      } finally {
        // Update the loading state after fetching data
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    return () => {
      setVisible(null);
    };
  }, []);
  useEffect(() => {
    const updateArray =
      timeSlot_list?.map(arr => ({
        label: arr,
        value: arr,
      })) || [];

    setItems(updateArray);
  }, [timeSlot || timeSlot_list]);
  useEffect(() => {
    if (success) {
      clears = setTimeout(() => {
        navigation.navigate('BlockDateList');
      }, 6000);
    }
    return () => {
      setVisible('');

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [snackbarMessage, success, error]);

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

  const handleStartDateSelect = selectedDate => {
    setStartDate(selectedDate);
  };

  const handleEndDateSelect = selectedDate => {
    setEndDate(selectedDate);
  };

  console.log("start date and end date is ..........",startDate,endDate)

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
      formData.append('end_date', endDate? endDate:startDate);
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
      await dispatch(fetchUnavailableDate_time());
    } catch (err) {
      console.log('fetch block data and  time ###########', err);
    }
  };

  const checkFormFieldsStatus = () => {
    // setVisible(!visible);

    console.log(timeSlots,startDate,endDate)
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
    } 
  
     else {
      setVisible('');
      blockDate_Handler();
    }
  };

  useEffect(() => {
    if (success) {
      setSnackbarMessage(success);
      setSnackbarVisible(true);
      clears = setTimeout(() => {
        navigation.navigate('BlockDateList');
      }, 700);
    } else if (error !== '') {
      setSnackbarError('Error  in Creating block date');
      // setSnackbarMessage('Error deleting');
      setSnackbarVisible(true);
    }
    return () => {
      setVisible('');

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [success, error]);
  return initialLoading || loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: hp(1),
        paddingHorizontal: wp(2),
        // backgroundColor: 'red',
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
      {/* {(!!success || !!error || !!visible) && (
        <View style={{marginTop: hp(0)}}>
          <SnackMessage
            success={success}
            visible={visible}
            error={error}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )} */}

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
              <View style={{marginTop: 20}}>
                {/* <DateandTime
                  datepickerhandler={datepickerhandler}
                  defaultTime={time}
                  update={update}
                /> */}
                <View style={{marginTop: hp(1.5)}}>
                  <TextHeading title={'Time Slot:'} />

                  <DropDownItem
                    dropdownhandler={dropdownhandler}
                    item={items}
                    setitem={setItems}
                    // site_Id={site_id}
                    update={update}
                    title={'Select Time Slot'}
                    siteSearch={true}
                    multiples={true}
                    selected_timeslots={update ? item : []}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Block Dates:'} />

                  {/* <DatePickers onDateSelect={handleStartDateSelect} /> */}
                  {/* <BlockedDateCalendar
                    heading={'Start Date:'}
                    onSelectedDatesChange={handleStartDateSelect}
                    blocks={result}
                    date={update ? item.start_date : ''}
                    update={update}
                    startDates={(startDate  ?startDate[0]:0) }
                    endDates={endDate ?endDate[0]:0 }
                    start={true}
                    end={false}

                  /> */}
     <BlockedDateCalendar
  heading={'Dates'}
  onSelected_Start_Dates={(selectedDates) => {
   console.log("start date is>>>>>>>>>>>>",selectedDates)
   handleStartDateSelect(selectedDates)
  }}
  onSelected_End_Dates={(selectedDates) => {
    console.log("end data is >>>>>>>>>>>>>",selectedDates)
    handleEndDateSelect(selectedDates)

  }}
  blocks={result} // Assuming result contains the blocked dates
  date={update ? item.start_date : ''} // Assuming item.start_date is the initial date
  update={update}
/>
                </View>

                <View style={{marginTop: hp(1)}}>
                  {/* <TextHeading title={'End Date:'} /> */}
                  <View>
                    {/* <BlockedDateCalendar
                      heading={'End Date:'}
                      onSelectedDatesChange={handleEndDateSelect}
                      blocks={result}
                      date={update ? item.end_date : ''}
                      update={update}
                      startDates={startDate ?startDate[0]:0 }
                      endDates={endDate ?endDate[0]:0 }
                      start={false}
                      end={true}
                    /> */}
                        {/* <BlockedDateCalendar
    heading={'Select Dates'}
    onSelectedDatesChange={(selectedDates) => {
    console.log("selected dates is..............323234",selectedDates)
      // Assuming selectedDates is an array of selected dates
      if (selectedDates.length === 1) {
        // Only one date is selected, set it as the start date
        handleStartDateSelect(selectedDates[0]);
      } else if (selectedDates.length === 2) {
        // Two dates are selected, set them as start and end dates
        handleStartDateSelect(selectedDates[0]);
        handleEndDateSelect(selectedDates[1]);
      }
    }}
    blocks={result} // Assuming result contains the blocked dates
    date={update ? item.start_date : ''} // Assuming item.start_date is the initial date
    update={update}
  /> */}
                  </View>

                  {/* <DatePickers onDateSelect={handleEndDateSelect} /> */}
                </View>

                <View
                  style={{
                    marginBottom: hp(1),
                    marginTop: 20,
                  }}>
                  <Buttons
                    bg={MyColors.primary}
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
      {(snackbarMessage || snackbarError) && (
        <View style={{}}>
          <SnackMessage
            success={snackbarMessage}
            visible={true}
            error={snackbarError}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default BlockDateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    // marginVertical: hp(7),
    marginTop: hp(6.2),
    // backgroundColor: 'red',

    // paddingHorizontal: 10,
  },
});
