// actions.js
// import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppConfig from '../config';
const apiUrl = AppConfig.apiUrl;

export const USER_REQUEST = 'USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const FETCH_USERLIST_REQUEST = 'FETCH_USERLIST_REQUEST';
export const FETCH_USERLIST_SUCCESS = 'FETCH_USERLIST_SUCCESS';
export const FETCH_USERLIST_FAILURE = 'FETCH_USERLIST_FAILURE';

export const UPDATE_USERSTATUS_SUCCESS = 'UPDATE_USERSTATUS_SUCCESS';
export const UPDATE_USERSTATUS_FAILED = 'UPDATE_USERSTATUS_FAILED';

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';
export const INITIALIZE_STATE = 'INITIALIZE_STATE';

// export const UPDATE_USERSTATUS_FAILED = 'UPDATE_USERSTATUS_FAILED';

export const RESET_FORM = 'RESET_FORM';

// export const create_User_Request = () => ({
//   type: USER_REQUEST
// });

export const resetForm = () => {
  return {
    type: RESET_FORM,
  };
};
export const clearState = () => {
  return {type: INITIALIZE_STATE};
};

export const fetchUser_List = () => {
  return async dispatch => {
    dispatch({type: USER_REQUEST});

    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.get(`${apiUrl}allUsers`, {headers});
      console.log('user response is .tt.............mbn', response.data.data);
      dispatch({
        type: FETCH_USERLIST_SUCCESS,
        userlistData: response.data.data.users,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERLIST_FAILURE,
        error: error.response.data.error[0] || 'An error occurred',
      });
    }
  };
};

export const updateUser_Status = formData => {
  console.log('update status is.....', formData);
  return async dispatch => {
    dispatch({type: USER_REQUEST});

    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(`${apiUrl}updateUserStatus`, formData, {
        headers,
      });
      console.log('update status response is......... ', response.data.data);
      console.log(
        'update status response is11......... ',
        response.data.message,
      );

      // dispatch(fetchUser_List());
      dispatch({
        type: UPDATE_USERSTATUS_SUCCESS,
        data: response.data.data.user,
        success: response.data.message,
      });
      dispatch(fetchUser_List());
    } catch (error) {
      dispatch({
        type: UPDATE_USERSTATUS_FAILED,
        error: error.response.data.error[0] || 'An error occurred',
      });
    }
  };
};

export const delete_User = id => async dispatch => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    const {token} = JSON.parse(userData);

    dispatch({type: USER_REQUEST});

    const response = await fetch(`${apiUrl}deleteUser?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded', // Assuming you are sending JSON data
      },
    });

    const responseData = await response.json();
    console.log('delete response is >>>>>>>>', responseData);

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData['errors'][0];
      throw new Error(errorMessage);
    }

    // await dispatch(fetchUser_List()); // Assuming fetchUser_List is the correct action to fetch data

    console.log('delet user success', responseData.success[0]);
    dispatch({type: DELETE_USER_SUCCESS, success: responseData.success[0]});
    await dispatch(fetchUser_List()); // Assuming fetchUser_List is the correct action to fetch data
  } catch (error) {
    console.log('error is ........', error);
    await dispatch(fetchUser_List()); // Assuming fetchUser_List is the correct action to fetch data

    dispatch({type: DELETE_USER_FAILED, error: error.message});
  }
};

export const create_New_User = (formData, update) => {
  console.log('form data is ............', formData, update);
  return async dispatch => {
    try {
      dispatch({
        type: USER_REQUEST,
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
      dispatch(fetchUser_List());

      dispatch({
        type: CREATE_USER_SUCCESS,
        success: response?.data?.message,
      });
    } catch (error) {
      if (error.response) {
        // console.error('Error status:', error.response.status);
        // console.error('Error data:', error.response.data.error[0]);
        // dispatch(fetchUser_List());
        dispatch({
          type: CREATE_USER_FAILURE,
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

export const create_User = (formData, update) => {
  console.log('form data is ............', formData, update);
  return async dispatch => {
    try {
      dispatch({type: USER_REQUEST});

      // dispatch(create_User_Request());
      const userData = await AsyncStorage.getItem('userData');

      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      // axios;
      // .post(`${apiUrl}createUser`, formData, {headers})
      const url = update ? `${apiUrl}UpdateUser` : `${apiUrl}createUser`;

      console.log(
        update ? `121122${apiUrl}UpdateUser` : `12121${apiUrl}createUser`,
      );

      const response = await axios({
        url,
        method: update ? 'PUT' : 'POST',
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
      // alert(response.data.message);
      // alert(response.data.message);
      // await dispatch(fetchUser_List()); // Assuming fetchUser_List is the correct action to fetch data

      dispatch({
        type: CREATE_USER_SUCCESS,
        success: response?.data?.message,
        // message: response.data.message,
      });
      dispatch(fetchUser_List());

      // await dispatch(fetchUser_List()); // Assuming fetchUser_List is the correct action to fetch data
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data.error[0]);

        // let errors = error?.response?.data['error'];
        dispatch(fetchUser_List);
        dispatch({
          type: CREATE_USER_FAILURE,
          error: error.response.data.error[0],
        });
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
};

export const update_User11 = (formData, update) => {
  console.log('form data is ............', formData, update);
  return async dispatch => {
    try {
      dispatch({type: USER_REQUEST});

      // dispatch(create_User_Request());
      const userData = await AsyncStorage.getItem('userData');

      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      // axios;
      // .post(`${apiUrl}createUser`, formData, {headers})
      const url = update ? `${apiUrl}UpdateUser` : `${apiUrl}createUser`;

      console.log(
        update ? `121122${apiUrl}UpdateUser` : `12121${apiUrl}UpdateUser`,
      );
      // alert('sdfsdfs update..............');
      const response = await axios({
        url,
        method: update ? 'PUT' : 'PUT',
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
      // alert(response.data.message);
      // alert(response.data.message);
      dispatch({
        type: CREATE_USER_SUCCESS,
        success: response?.data?.message,
        // message: response.data.message,
      });
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data.error[0]);

        // let errors = error?.response?.data['error'];
        dispatch(fetchUser_List);
        dispatch({
          type: CREATE_USER_FAILURE,
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
