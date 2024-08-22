import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../style/Dimensions';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logOutUser} from '../store/action/authAction';

import {useSelector, useDispatch} from 'react-redux';
import {clearState} from '../store/action/scannerResponse';
import {MyColors} from '../style/MyColors';

import myIcon from 'react-native-vector-icons/FontAwesome';
import ActivityIndicatorComponent from '../component/ActivityIndicatorComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.auth?.user);
  const {loading, user, error, message, token} = useSelector(
    state => state.auth,
  );
  const [errors, setError] = useState();
  const [isLoading, setIsLoading] = useState(loading);

  console.log('is Auth is ===========>', userId?.id);

  const logoutHandler = async () => {
    console.log('lout is pressed', '');
    Keyboard.dismiss();
    let userData = new FormData();
    userData.append('user_id', userId?.id);

    try {
      dispatch(clearState());
      await dispatch(logOutUser(userData));
      dispatch(clearState());

      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      dispatch(clearState);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const cacheClear = async () => {
    try {
      await dispatch(userData);
    } catch (err) {
      // setError(err.message);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    cacheClear();
    clearStateCache();
  }, []);

  const clearStateCache = async () => {
    await dispatch(clearState());
  };
  if (loading) {
    return <ActivityIndicatorComponent />;
  }
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 15}}>
      <View
        style={{
          // backgroundColor: 'red',
          ...styles.headerContainer,
        }}>
        <TouchableOpacity
          onPress={() => logoutHandler()}
          style={styles.iconContainer}>
          <Ionicons name="logout" size={30} color="red" />
        </TouchableOpacity>
        {/* <Text style={styles.headerText}>{title}</Text> */}
      </View>

      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          // backgroundColor: 'yellow',
        }}>
        <View
          style={{
            backgroundColor: MyColors.primary,
            height: hp(15),
            borderRadius: 20,
            alignItems: 'center',
            // backgroundColor: 'green',
          }}>
          <Text
            style={{
              color: '#ffffff',
              paddingTop: hp(2),
              fontSize: 18,
              fontWeight: '700',
              paddingBottom: 5,
            }}>
            Scan QR Code
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#ffffff',
              paddingHorizontal: wp(4),
            }}>
            Kindly Scan the QR Code and Authenticate the User for relevant Event
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1.4,
          // alignItems: 'center',
          // backgroundColor: 'blue',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: wp(10),
            paddingTop: hp(2),

            // backgroundColor: 'red',
          }}>
          <Image
            style={{height: 25, width: 25}}
            source={require('./../style/assets/corner.png')}
          />
          <Image
            style={{height: 25, width: 25, transform: [{rotate: '90deg'}]}}
            source={require('./../style/assets/corner.png')}
          />
        </View>
        <View
          style={{
            height: 250,
            width: 350,
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            style={{height: 180, width: 180}}
            source={require('./../style/assets/qr-code.png')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: wp(10),

            // backgroundColor: 'red',
          }}>
          <Image
            style={{height: 25, width: 25, transform: [{rotate: '270deg'}]}}
            source={require('./../style/assets/corner.png')}
          />
          <Image
            style={{height: 25, width: 25, transform: [{rotate: '180deg'}]}}
            source={require('./../style/assets/corner.png')}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'green',
        }}>
        {/* <View
            style={{
              height: hp(7),
              width: wp(38),
  
              backgroundColor: '#5683f6',
              shadowColor: '#5683f6',
              borderRadius: hp(3.5),
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
  
              elevation: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ScanScreen')}
          // onPress={() => console.log('sdfsdfsdfds')}
          style={{
            height: hp(7),
            width: wp(38),

            backgroundColor: MyColors.primary,
            shadowColor: MyColors.primary,
            borderRadius: hp(3.5),
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center', // shadowColor: '#5683f6',
            // borderRadius: hp(3.5),
            // shadowOffset: {
            //   width: 0,
            //   height: 4,
            // },
            // shadowOpacity: 0.3,
            // shadowRadius: 4.65,

            // elevation: 8,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text style={{color: '#ffff', fontSize: 22, fontWeight: '500'}}>
            scan
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  rotatedIcon: {
    // transform: [{rotateX: '500deg'}],
    right: -40,
    bottom: -10, // Adjust the rotation angle as needed
  },
  tinyLogo: {
    width: 50,
    height: 50,
    color: 'red',
  },
  logo: {
    width: 66,
    height: 58,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    // backgroundColor: '#5683f6',
    // elevation: 4, // Android shadow
    // shadowColor: '#000000', // iOS shadow
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  iconContainer: {
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});
