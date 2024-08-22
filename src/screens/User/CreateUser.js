import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  create_User,
  clearState,
  resetForm,
  fetchUser_List,
  create_New_User,
} from '../../store/action/userAction';
import {hp, wp} from '../../style/Dimensions';
import {MyColors} from '../../style/MyColors';
import HeaderComponent from '../../component/HeaderComponent';
import Buttons from '../../component/Buttons';
import InputTexts from '../../component/InputTexts';
import SnackMessage from '../../component/SnackMessage';
import ActivityIndicatorComponent from '../../component/ActivityIndicatorComponent';
import TextHeading from '../../component/TextHeading';
import validator from 'validator';

const CreateUser = ({navigation, route}) => {
  const {user, loading, success, error} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {item, update} = route.params;

  const [isUpdate, setIsUpdate] = useState();

  const [visible, setVisible] = useState('');
  const [userName, setUserName] = useState(update ? item.name : '');
  const [email, setEmail] = useState(update ? item.email : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(null);

  let clears;

  console.log('message ismm .........', success);
  console.log('item data  is .........', success);

  const reportHandler = async () => {
    let dataToSend;

    if (update) {
      // If update is truthy, use JSON object
      dataToSend = {
        id: item?.id,
        name: userName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        // Initialize time_slots as an empty array
      };
    } else {
      // If update is falsy, use FormData
      let formData = new FormData();

      formData.append('name', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);

      dataToSend = formData;
    }

    await dispatch(create_New_User(dataToSend, update || false));
  };

  const isValidEmail = email => {
    // Regular expression for a basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkFormFieldsStatus = () => {
    // reportHandler();

    const fields = [
      {value: userName, message: 'UserName is required'},
      {value: email, message: 'Email is required'},
      {value: password, message: 'Password is required'},
      {value: confirmPassword, message: 'Confirm password is required'},
    ];

    const emptyField = fields.find(field => !field.value);

    if (emptyField) {
      return setVisible(emptyField.message);
    } else if (!isValidEmail(email) || !isValidEmail(email)) {
      return setVisible('Invalid email format');
    } else if (password.length < 8 || confirmPassword.length < 8) {
      return setVisible('Password length must be greater than 7');
    } else if (password !== confirmPassword) {
      return setVisible('Passwords do not match');
    }

    reportHandler();

    // setVisible('');
  };
  console.log('error is............', visible, success);
  // success?.message && alert(success?.message);

  // useEffect(() => {
  //   if (success) {
  //     setSnackbarMessage(success);
  //     // setSnackbarVisible(true);
  //     // navigation.navigate('UserList');

  //     clears = setTimeout(() => {
  //       navigation.navigate('UserList');
  //     }, 700);
  //   } else if (error !== '') {
  //     setSnackbarError(error);
  //   }
  //   return () => {
  //     setVisible('');

  //     clearInterval();
  //     clearTimeout(clears);
  //     // dispatch(resetForm());
  //   };
  // }, [success, error]);

  useEffect(() => {
    if (success) {
      setSnackbarMessage(success);

      // navigation.navigate('UserList');

      clears = setTimeout(() => {
        navigation.navigate('UserList');
      }, 500);
    } else if (error !== '') {
      setSnackbarError(error);
    }

    return () => {
      setVisible('');

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [success, error, snackbarMessage]);

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={{flex: 1, marginBottom: hp(2)}}>
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
        }}
      />

      <HeaderComponent onBackPress={() => navigation.navigate('UserList')} />

      <ScrollView>
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: hp(8),
            }}>
            <Text
              style={{
                color: MyColors.primary,
                fontSize: 20,
                fontWeight: '800',
                paddingBottom: hp(1),
              }}>
              {update ? 'Update User' : 'Create User'}
            </Text>
          </View>

          <View style={{marginTop: hp(1)}}>
            <TextHeading title={'User Name:'} />
            <InputTexts
              placeHolders={'User Name'}
              keyboardTypes={'default'}
              values={userName}
              onChangeTexts={action => setUserName(action)}
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
              placeHolders={'Email'}
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
            <TextHeading title={'password:'} />
            <InputTexts
              placeHolders={'Password'}
              keyboardTypes={'default'}
              values={password}
              onChangeTexts={action => setPassword(action)}
              secureTextEntries={false}
              editables={true}
              IconName={'create-outline'}
              IconType={'Ionicons'}
              size={hp(3)}
            />
          </View>

          <View style={{marginTop: hp(1)}}>
            <TextHeading title={'Confirm Password:'} />
            <InputTexts
              placeHolders={'Confirm Password'}
              keyboardTypes={'default'}
              values={confirmPassword}
              onChangeTexts={action => setConfirmPassword(action)}
              secureTextEntries={false}
              editables={true}
              IconName={'create-outline'}
              IconType={'Ionicons'}
              size={hp(3)}
            />
          </View>

          <View style={{marginBottom: hp(1), marginTop: 20}}>
            <Buttons
              bg={MyColors.primary}
              heights={hp(6)}
              widths={wp(25)}
              border={wp(1.5)}
              onPresses={checkFormFieldsStatus}
              title={update ? 'Update User' : 'Create User'}
            />
          </View>
        </View>
      </ScrollView>
      {(snackbarMessage || snackbarError || visible) && (
        <View style={{marginTop: hp(3)}}>
          <SnackMessage
            success={snackbarMessage}
            visible={snackbarError}
            error={error}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateUser;
