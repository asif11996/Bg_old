import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppConfig from '../config';
import {fetchUser_List} from './userAction';

export const CREATE_USERS_REQUEST = 'CREATE_USERS_REQUEST';
export const CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS';
export const CREATE_USERS_FAILURE = 'CREATE_USERS_FAILURE';

const apiUrl = AppConfig.apiUrl;

export const update_User_Data = (formData, update) => {
  console.log('form data is ............', formData, update);
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_USERS_REQUEST,
      });

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      const url = update ? `${apiUrl}UpdateUser` : `${apiUrl}createUser`;

      console.log(
        update ? `121122${apiUrl}UpdateUser` : `12121${apiUrl}UpdateUser`,
      );
      // alert('sdfsdfs update..............');
      const response = await axios({
        url,
        method: update ? 'PUT' : 'POST', // Adjust the method based on whether it's an update or creation
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': update
            ? 'application/x-www-form-urlencoded'
            : 'multipart/form-data',
        },
        data: formData,
      });

      console.log('create user data is*****************>', response.data);
      console.log(
        'create user res msg is**************>',
        response.data.message,
      );
      //   dispatch(fetchUser_List());

      dispatch({
        type: CREATE_USERS_SUCCESS,
        success: response?.data?.message,
      });
      dispatch(fetchUser_List());
    } catch (error) {
      if (error.response) {
        // console.error('Error status:', error.response.status);
        // console.error('Error data:', error.response.data.error[0]);
        // dispatch(fetchUser_List());
        dispatch({
          type: CREATE_USERS_FAILURE,
          error: error.response.data.error[0],
        });
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error);
      }
    }
  };
};

export const create_Bookingwewe = formData => {
  console.log('form data is ............', formData);
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_BOOKING_REQUEST,
      });
      const userData = await AsyncStorage.getItem('userData');

      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      // axios;
      // .post(`${apiUrl}createUser`, formData, {headers})
      const url = `${apiUrl}createBooking`;

      const response = await axios({
        url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      console.log('create Booking data is*****************>', response.data);
      console.log(
        'create user res msg is**************>',
        response.data.message,
      );

      await dispatch(fetchBooking_Dashboard());
      // await dispatch(fetchUnavailableDate_time());

      dispatch({
        type: CREATE_BOOKING_SUCCESS,
        success: response?.data?.message,
        // message: response.data.message,
      });
      // await dispatch(fetchUnavailableDate_time());

      // Assuming fetchUser_List is the correct action to fetch data
      // Assuming fetchUser_List is the correct action to fetch data
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.data.errors);
        console.error('Error data:', error.response.data.errors[0]);

        // let errors = error?.response?.data['error'];
        // dispatch(fetchUser_List);
        dispatch({
          type: CREATE_BOOKING_FAILURE,
          error: error.response.data.errors[0] || 'server error',
        });
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
};
