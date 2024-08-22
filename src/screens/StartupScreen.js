import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import SplashscreenComponent from '../component/SplashscreenComponent';
import {loginSuccess, setDidTryAL} from '../store/action/authAction';
import ActivityIndicatorComponent from '../component/ActivityIndicatorComponent';

import {MyColors} from './../style/MyColors';

const StartupScreen = props => {
  const dispatch = useDispatch();
  const isSplash = useSelector(state => state.isSplash.isSplashScreen);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log('login data is startup .................ff', userData);

      if (!userData) {
        dispatch(setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);

      const {token, user, message} = transformedData;
      console.log(
        'login data is startup .................',
        token,
        user,
        message,
      );

      dispatch(loginSuccess(token, user, message));
    };
    tryLogin();

    {
      isSplash
        ? setTimeout(() => {
            tryLogin();
          }, 1000)
        : tryLogin();
    }
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      {isSplash ? <SplashscreenComponent /> : <ActivityIndicatorComponent />}
    </View>
    // <View>
    //   <Text>sdfsdfsd</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#3f5d83",
  },
});

export default StartupScreen;
