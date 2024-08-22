import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import AppConfig from '../config';
const apiUrl = AppConfig.apiUrl;

export const BLOCKDATE_REQUEST = 'BLOCKDATE_REQUEST';

export const FETCH_BLOCKDATE_SUCCESS = 'FETCH_BLOCKDATE_SUCCESS';
export const FETCH_BLOCKDATE_FAILURE = 'FETCH_BLOCKDATE_FAILURE';
// export const FETCH_UNAVAILABLE_DATE_TIME = 'FETCH_UNAVAILABLE_DATE_TIME';

// export const FETCH_TIMESLOT_SUCCESS = 'FETCH_TIMESLOT_SUCCESS';
// export const FETCH_TIMESLOT_FAILURE = 'FETCH_TIMESLOT_FAILURE';

// export const DELETE_BLOCKDATE_SUCCESS = 'DELETE_BLOCKDATE_SUCCESS';
// export const DELETE_BLOCKDATE_FAILURE = 'DELETE_BLOCKDATE_FAILURE';

// export const CREATE_BLOCKDATE_SUCCESS = 'CREATE_BLOCKDATE_SUCCESS';
// export const CREATE_BLOCKDATE_FAILURE = 'CREATE_BLOCKDATE_FAILURE';

export const fetchBlockDate_Lists = () => {
  return async dispatch => {
    dispatch({type: BLOCKDATE_REQUEST});

    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
      //   Alert();

      const response = await axios.get(`${apiUrl}allBlockDates`, {headers});
      console.log('fetch blockdate response success...', response.data.message);

      dispatch({
        type: FETCH_BLOCKDATE_SUCCESS,
        blockDate: response.data.data.blocKDates,
        timeSlots: response.data.data.timeSlots,
      });
    } catch (error) {
      console.log('fetch blockdate error is...', error);

      dispatch({
        type: FETCH_BLOCKDATE_FAILURE,
        error: error.response.data.error[0] || 'An error occurred',
      });
    }
  };
};
