import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import TextHeading from '../../component/TextHeading';
import InputTexts from '../../component/InputTexts';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {hp, wp} from '../../style/Dimensions';
import DropDownItem from '../../component/DropDownItem';
import DatePickers from '../../component/DatePicker';
import Buttons from '../../component/Buttons';
import {MyColors} from '../../style/MyColors';
import HeaderComponent from '../../component/HeaderComponent';
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';
import { CheckBox, Icon } from 'react-native-elements';


import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';
import {
  fetchTimelist,
  fetchUnavailableDate_time,
} from '../../store/action/blockDate';
import BlockedDateCalendar from '../../component/BlockedDateCalendar';

import {
  clear_booking_state,
  create_Booking,
  create_token_failure,
  create_token_success,
  fetch_booking_Request,
} from '../../store/action/booking';
import {eachMinuteOfInterval} from 'date-fns';
import SnackMessage from '../../component/SnackMessage';
import ActivityIndicatorComponent from '../../component/ActivityIndicatorComponent';
import {useNavigation} from '@react-navigation/core';
import { TextInput } from 'react-native-paper';
import BlockedDate from '../../component/BlockedDate';

const BookingForm = props => {
  const dispatch = useDispatch();

  const {timeSlot, blockDate_time} = useSelector(state => state.blockDate);
  const {success, error, loading, booking, bookingdetail} = useSelector(
    state => state.bookinglist,
  );


  const [location, setLocation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState('');
  const [times, setTime] = useState('');
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('');
  const [totalPrice, setTotalPrice] = useState(400);
  const [participant, setParticipant] = useState(20);
  const [payment, setPayment] = useState('');
  const {createToken, theme} = useStripe();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [count, setCount] = useState(20);
  const [items, setItems] = useState([]);
  const [cardInfo, setCardInfo] = useState(null);
  const [stripeToken, setStripeToken] = useState(null);
  const [visible, setVisible] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [toggleYesCheckBox, setToggleYesCheckBox] = useState(false);
  const [toggleNoCheckBox, setToggleNoCheckBox] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(null);
  const [paycheck, setpayCheck] = useState(true);
const [payNotcheck, setPayNotcheck] = useState(false);


  const navigation = useNavigation();

  let clears;

  console.log('success msg is .......', success);

  useEffect(() => {
    return () => {
      setVisible('');
      // result = '';
    };
  }, []);
  useEffect(() => {
    fetchTimeslot_Handler();
    fetchTBlockDate_Handler();
    return () => {
      setVisible('');
    };
  }, []);
  useEffect(()=>{
handleParticipantChange()
  },[participant])
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

  function handlDateSelect(selectedDate) {
    // Check if selected date exists in blockDates
    // const selectedDate = '29-12-2023';

    const defaultTimeArray = [['9:00 AM', '11:30 AM', '2:30 PM']];

    let blockDates = blockDate_time;

    setDate(selectedDate);

    if (blockDates[selectedDate]) {
      const blockDateSlots = blockDates[selectedDate];

      // Find unique time slots in defaultTimeArray
      const uniqueDefaultTimeSlots = timeSlot.filter(
        defaultSlot => !blockDateSlots.includes(defaultSlot),
      );
      console.log(
        'unique time slot is ..................',
        uniqueDefaultTimeSlots,
      );
      const convertedArray = uniqueDefaultTimeSlots.map((time, index) => ({
        label: time,
        value: time, // You can customize the 'value' property if needed
      }));
      setItems(convertedArray);
      // setItems(uniqueDefaultTimeSlots);

      // return uniqueDefaultTimeSlots;
    } else {
      // If selected date is not in blockDates, return defaultTimeArray
      console.log('unique time slot is ..................', timeSlot);
      const convertedArray = timeSlot.map((time, index) => ({
        label: time,
        value: time, // You can customize the 'value' property if needed
      }));
      setItems(convertedArray);
      // return defaultTimeArray[0];
    }
  }

  useEffect(() => {
    console.log('success msg is ####################################', success);
    setSnackbarMessage(success);

    if (success) {
      // setSnackbarVisible(true);
      clears = setTimeout(() => {
        navigation.navigate('Bookinglist');
      }, 700);
    } else if (error !== '') {
      setSnackbarError(error);
      // setSnackbarMessage('Error deleting');
      setSnackbarVisible(true);
    }
    return () => {
      setVisible('');
      // dispatch(fetch_booking_Request());

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [snackbarError, snackbarMessage, success, error]);

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

  const dropdownhandler = value => {
    console.log('selected date is ......mnm', value);
    setTime(value);
    // setscrollEnabled(data);
  };
  const validateEmail = email => {
    return validator.isEmail(email);
  };

  const checkFormFieldsStatus = stripeToken => {
    // reportHandler();

    console.log('times in checkFormFieldsStatus ....', times);

    if (!firstName) {
      setVisible('First Name is required');
    } else if (!lastName) {
      setVisible('Last Name is required');
    } else if (!email || !validateEmail(email)) {
      setVisible('Correct email is required');
    } else if (!phone) {
      setVisible('Phone Number is required');
    } else if (!date) {
      setVisible('Date is required');
    } else if (times.length == 0) {
      setVisible('At least one TimeSlot is required');
    } else if (!group) {
      return setVisible('Group/School/Club Name is required');
    } 
    // else if (!cardInfo || Object.keys(cardInfo).length === 0) {
    //   return setVisible('Payment Information is required');
    // }
     else {
     paycheck ? createTokens() : bookingHandler()
    }

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

  const createTokens = async () => {
    await dispatch(fetch_booking_Request());

    try {
      const {token, error} = await createToken({...cardInfo, type: 'Card'});

      if (error) {
        console.error('Error creating token:', error);
        await dispatch(create_token_failure());
        setVisible('Error creating token');
      } else {
        console.log('Token created successfully:', token.id);
        console.log('Token created successfully:', token);

        // Call bookingHandler and pass the token
        setStripeToken(token.id);
        // bookingHandler(token.id);
        // bookingHandler(token.id);
      }
    } catch (e) {
      console.error('An unexpected error occurred:', e);
      setVisible('Error creating token');
    }
  };
  const bookingHandler = async stripeToken => {
    // await createTokens();
    let formData = new FormData();

    formData.append('event_id', 1);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('booking_date', date);
    formData.append('time_slot', times);
    formData.append('group_name', group);
    formData.append('unit_price', 20);
    formData.append('min_participant', 20);
    formData.append('total_participants', participant);
    formData.append('total_price', totalPrice);
    formData.append('stripeToken', paycheck ?stripeToken :'');
    console.log('formdata is ......',  formData);
    await dispatch(create_Booking(formData));
  };
  // const calculateTotalPrice = participants => {
  //   const unitPrice = 20;
  //   return unitPrice * participants;
  // };
  function calculateTotalPrice( group_participant) {
    const unit_price = 20;

    var discountGroups = Math.floor(group_participant / 100);
    var remainingParticipants = group_participant % 100;
    var discount = 0.10;

    console.log("1122********************",discountGroups,remainingParticipants,discount)
    var total_event_price;

    if (discountGroups > 0) {
        total_event_price = (unit_price * 100 - unit_price * 100 * discount) * discountGroups;
    } else {
        total_event_price = 0;
    }

    total_event_price += unit_price * remainingParticipants;
    return total_event_price;
}
  const handleParticipantChange = value => {

    console.log("selected value is .....",value)
    // const parsedValue = parseInt(value);

    // setParticipant(parseInt(value));
    setTotalPrice(calculateTotalPrice(parseInt(participant)));
  };

  const handleIncrement = () => {
    handleParticipantChange(participant + 1);
    setParticipant(participant + 1);
  };

  const handleDecrement = () => {
    if (participant > 20) {
      handleParticipantChange(participant - 1);

      setParticipant(participant - 1);
    }
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

  handleYesCheckBox = () => {
    setToggleYesCheckBox(true);
  };
  handleNoCheckBox = () => {
    setToggleNoCheckBox(true);
    setToggleYesCheckBox(false);
  };

  const paynow=()=>{
    setpayCheck(!paycheck)
    setPayNotcheck(!payNotcheck)
  }
  const paynot=()=>{
    setpayCheck(!paycheck)
    setPayNotcheck(!payNotcheck)

    
  }

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
          height: 200,
          width: 200,
          backgroundColor: MyColors.primary,
          borderRadius: 100,
          position: 'absolute',
          top: 0,
          left: -80,
          top: -80,
        }}></View>

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() =>
          props.navigation.navigate('Bookinglist') && dispatch(clearState())
        }
        // onBackPress={() => props.navigation.goBack() && dispatch(clearState())}
        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />

      {/* <View style={{}}> */}
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 6,
          padding: 6,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Text style={BookingStyle.headertitle}>{'Booking'}</Text>
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
                <View style={{marginTop: hp(1), backgroundColor: '#f2f2f2'}}>
                  <TextHeading title={'First Name'} />

                  <InputTexts
                    placeHolders={'First Name:'}
                    keyboardTypes={'default'}
                    values={firstName}
                    onChangeTexts={text => setFirstName(text)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'location'}
                    IconType={'EvilIcons'}
                    size={hp(3.5)}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Last Name:'} />

                  <InputTexts
                    placeHolders={'Enter Last Name'}
                    keyboardTypes={'default'}
                    values={lastName}
                    onChangeTexts={action => setLastName(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'create-outline'}
                    IconType={'Ionicons'}
                    size={hp(3)}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Email:'} />

                  <InputTexts
                    placeHolders={'Enter Email'}
                    keyboardTypes={'email-address'}
                    values={email}
                    onChangeTexts={action => setEmail(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'create-outline'}
                    IconType={'Ionicons'}
                    size={hp(3)}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Phone:'} />

                  <InputTexts
                    placeHolders={'Enter Phone'}
                    keyboardTypes={'phone-pad'}
                    values={phone}
                    onChangeTexts={action => setPhone(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'create-outline'}
                    IconType={'Ionicons'}
                    size={hp(3)}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Date:'} />

                  <BlockedDate
                    onSelectedDatesChange={handlDateSelect}
                    blocks={result}
                    booking_time={true}
                    heading={'Date:'}
                  />
                </View>
                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Time Slot:'} />

                  <DropDownItem
                    dropdownhandler={dropdownhandler}
                    item={items}
                    setitem={setItems}
                    // site_Id={site_id}
                    // update={update}
                    title={'Select Time Slot'}
                    siteSearch={true}
                    multiples={false}
                  />
                </View>

                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Group/School/Club Name:'} />

                  <InputTexts
                    placeHolders={'Group/School/Club Name'}
                    keyboardTypes={'default'}
                    values={group}
                    onChangeTexts={action => setGroup(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'create-outline'}
                    IconType={'Ionicons'}
                    size={hp(3)}
                  />
                </View>

                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Participants:'} />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={handleDecrement}
                      style={styles.button}>
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput  style={styles.inputText}
                    // placeHolders={'Group/School/Club Name'}
                    key={participant.toString()} // Add a unique key

                    keyboardType={'numeric'}
                    value={participant > 0? participant.toString():0}
                    onChangeText={(val)=>  setParticipant(parseInt(val))}
                    // secureTextEntries={false}
                    // editables={true}
                    // placeholderTextColor={'grey'}
                    // spellCheck={true}

                    // IconName={'create-outline'}
                    // IconType={'Ionicons'}
                    // size={hp(3)}

                    
                  />
                    
                    <TouchableOpacity
                      onPress={handleIncrement}
                      style={styles.button}>
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Participants:'} />
                  <InputTexts
                    placeHolders={'Enter Participants'}
                    keyboardTypes={'numeric'}
                    values={participant.toString()}
                    onChangeTexts={action => handleParticipantChange(action)}
                  />
                
                </View> */}

                <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Payment information:'} />

                  {/* <InputTexts
                    placeHolders={'Card Number'}
                    keyboardTypes={'default'}
                    values={phone}
                    onChangeTexts={action => setPhone(action)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'create-outline'}
                    IconType={'Ionicons'}
                    size={hp(3)}
                  /> */}

                  {/* <TouchableOpacity
                    onPress={handlePayment}
                    style={styles.payButton}>
                    <Text style={styles.payButtonText}>Create Token</Text>
                  </TouchableOpacity> */}
                </View>
                <View>
                  <Text
                    style={{fontSize: 16, color: 'grey', fontWeight: '600'}}>
                    {'Group Booking ( 20 Participants Minimum)'}
                  </Text>
                  <Text
                    style={{fontSize: 14, color: 'grey', fontWeight: '400'}}>
                    {'€ 20.00' + ' ' + 'Per Person'}
                  </Text>
                  <Text style={styles.priceText}>
                    {'Cart Total: €' + totalPrice.toFixed(2)}
                  </Text>
                  <Text
                    style={{fontSize: 16, color: 'grey', fontWeight: '600'}}>
                    {'Payment Information'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontSize: 14, color: 'grey', fontWeight: '600'}}>
                    {'Pay Now'}
                  </Text>
                  {/* 
                  <CheckBox
                    disabled={false}
                    value={toggleYesCheckBox}
                    onValueChange={() => handleYesCheckBox()}
                  />
                  <CheckBox
                    disabled={false}
                    value={toggleNoCheckBox}
                    onValueChange={() => handleNoCheckBox()}
                  /> */}
                  {/* <BouncyCheckbox
                    size={20}
                    fillColor="red"
                    // unfillColor="#FFFFFF"
                    isChecked={toggleYesCheckBox}
                    text="Yes"
                    // iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 2}}
                    // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => handleYesCheckBox()}
                  />
                  <BouncyCheckbox
                    size={20}
                    fillColor="red"
                    // unfillColor="#FFFFFF"
                    text="No"
                    isChecked={toggleNoCheckBox}
                    // iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 2}}
                    // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => handleNoCheckBox()}

                    // onPress={(isChecked: boolean) => {}}
                  /> */}
                </View>

                {/* <View>
                  <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                    }}
                    style={styles.input}
                    onCardChange={cardDetails => {
                      setCardInfo(cardDetails);
                      console.log('cardDetails', cardDetails);
                    }}
                    onFocus={focusedField => {
                      console.log('focusField', focusedField);
                    }}
                  />
                </View> */}
                {/* {selectedItem?.value === 'yes' && ( */}

                  <View style={{flexDirection:'row',borderRadius:10,justifyContent:'space-evenly'}}>
    <CheckBox
      center
      title="Pay Now"
      checked={paycheck}
      onPress={() => paynow()  }
    />
      <CheckBox
      center
      title="Pay Later"
      checked={payNotcheck}
      onPress={() => paynot()}
    />


   
  

  
  </View>
  { paycheck&&
   <View style={{marginTop: 3}}>
   <CardField
     postalCodeEnabled={false}
     placeholders={{
       number: '4242 4242 4242 4242',
     }}
     cardStyle={{
       backgroundColor: '#E2E1E1',
       borderRadius: wp(1.5),
     }}
     style={styles.cardField}
     onCardChange={cardDetails => {
       setCardInfo(cardDetails);

       // Handle card details change
       console.log('cardDetails', cardDetails);
     }}
     // onFocus={focusedField => {
     //   console.log('focusField', focusedField);
     // }}
   />
 </View>
  }
             
                {/* )} */}

                {/* <View style={{marginTop: hp(1)}}>
                  <TextHeading title={'Result:'} />

                  <InputTexts
                    placeHolders={'Enter Result'}
                    keyboardTypes={'default'}
                    values={results}
                    onChangeTexts={results => setResult(results)}
                    secureTextEntries={false}
                    editables={true}
                    IconName={'results'}
                    IconType={'Foundation'}
                    size={hp(3)}
                  />
                </View> */}

                {/* <View style={{paddingTop: hp(1)}}>
                  <TextHeading title={'Description:'} />

                  <MultilineText
                    //     title={"Submit"}
                    additional_info={strippedHtmlInfo}
                    MultilineTexHandler={MultilineTexHandler}
                    heading={''}
                    placeholders="Enter Description"
                  />
                </View> */}
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
                    onPresses={() => checkFormFieldsStatus()}
                    title={'Create'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {(snackbarMessage || snackbarError || visible) && (
        <View style={{}}>
          <SnackMessage
            success={snackbarMessage}
            visible={visible}
            error={snackbarError || visible}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // marginVertical: hp(7),
    marginTop: hp(6),
    // backgroundColor: 'red',

    // paddingHorizontal: 10,
  },
  cardField: {
    width: '100%',
    height: 50,
    color: 'red',
    marginVertical: 10,
  },
  cardFieldContainer: {
    alignSelf: 'center',
    width: '80%',
    height: hp(5.5),
    alignSelf: 'center',
    width: wp(96), // Adjust the width as needed
  },
  payButton: {
    backgroundColor: MyColors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  payButtonText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '600',
  },
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
    backgroundColor: '#f2f2f2',
  },
  button: {
    backgroundColor: MyColors.primary,
    height: hp(6.5),
    width: wp(10),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  input: {
    height: hp(6.5),
    alignSelf: 'center',
    width: wp(96),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: '#FFF',
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
  },
  inputText: {
    height: hp(6.5),
    alignSelf: 'center',
    width: wp(72),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: wp(2),

    backgroundColor: '#FFF',
    paddingHorizontal: wp(2),
    // shadowColor: '#000',
    borderRadius: wp(1.5),
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
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
