// actions.js
// import firebase from 'firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import axios from "axios";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "./scannerResponse";
import AppConfig from "../config";
const apiUrl = AppConfig.apiUrl;

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const LOGOUT = "LOGOUT";

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (token, user, message) => ({
  type: LOGIN_SUCCESS,
  token: token,
  user: user,
  message: message
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = (msg) => ({
  type: LOGOUT
  //   payload: msg,
});
export const logOUTFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error
});

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const loginUser = (userData) => {
  console.log("Lognin userData is:=======>", userData);
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await fetch(`${apiUrl}login`, {
        method: "POST",

        body: userData
      });
      console.log("res data is", response);

      if (!response.ok) {
        const errorResData = await response.json();
        // const message = errorResData.errors[0];
        console.log("Error Mesage is:!...", errorResData.error.message);
        throw new Error(
          errorResData.error.message
            ? errorResData.error.message
            : errorResData.error
        );
      }
      const responseData = await response.json();

      console.log("user token login========>", responseData.data.token);
      console.log("user data in login========>", responseData.data.user);
      console.log("user data in login========>", responseData.message);

      //   await AsyncStorage.setItem('userToken', responseData.data.token);

      dispatch(
        loginSuccess(
          responseData?.data?.token,
          responseData?.data?.user,
          responseData?.message
        )
      );
      saveDataToStorage(
        responseData?.data?.token,
        responseData?.data?.user,
        responseData?.message
      );

      //   console.log('res data is', r;
    } catch (error) {
      console.log("user login error is========>", error);

      dispatch(loginFailure(error?.message));
    }
  };
};
export const logOutUser = () => {
  return async (dispatch, getState) => {
    dispatch(loginRequest());

    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;

    console.log("logout token is ......", token);
    const response = await fetch(`${apiUrl}logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("logout res data is.............", response);
    if (!response.ok) {
      const errorResData = await response.json();
      console.log("error in logout is:!...", errorResData);
      //   const message = errorResData.errors[0];
      //   throw new Error(message);
      throw new Error(errorResData);
    } else {
      const responseData = await response.json();
      console.log(" logout is:!...", responseData.success);
      await dispatch({
        type: LOGOUT
        // payload: error.message,
      });
      await AsyncStorage.removeItem("userData");

      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }]
      });
      getState().navigator.dispatch(resetAction);

      await dispatch(clearState());
      dispatch(logout());
      dispatch({
        type: LOGOUT
        // payload: error.message,
      });
      //   dispatch(clearNewsReelData());
      //   dispatch({type: LOGOUT});
    }
  };
};

export const logOutUser2 = (userData) => {
  console.log("data is ........................", "");

  const requestData = {
    user_id: 1
  };
  console.log("Logout userData is:=======>", requestData);
  return async (dispatch) => {
    console.log("mm", "");
    // dispatch(loginRequest());

    try {
      const response = await fetch(`${apiUrl}logout`, {
        method: "GET", // or 'PUT'

        body: requestData
      });
      console.log("logout res  is.............", response.data);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      console.log("logout res data is ========>", responseData.data);
      //   dispatch(loginSuccess(responseData?.data));

      //   console.log('res data is', r;
    } catch (error) {
      console.log("logout error is ....", error);
      //   dispatch(loginFailure(error?.message));
    }
  };
};

export const logOutUser1 = (scanData) => {
  console.log("QR code is wwwwwwwwwww ........", scanData);

  const requestData = {
    user_id: 1
  };

  return async (dispatch) => {
    // dispatch(postBookingRequest());

    axios
      .get("${apiUrl}logout", requestData)
      .then((response) => {
        console.log("Response.............:", response.data);

        dispatch(logOutUser(response.data.message));
      })
      .catch((error) => {
        console.error("Error:", error);
        // dispatch(logOUTFailure(error.message));
      });
  };
};

// const saveDataToStorage = async uData => {
//   console('asyc dats is..?????????????????????????????????', uData);

//   await AsyncStorage.setItem(
//     'userData',
//     JSON.stringify({
//       uData: uData,
//     }),
//   );
// };

const saveDataToStorage = async (token, user, message) => {
  console.log("async data is ...................");
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        user: user,
        message: message
      })
    );

    // await AsyncStorage.setItem('userData', data);
    // You can store other login-related data as needed
  } catch (error) {
    console.error("Error storing login data:", error);
  }
};
// export const loginUsermm = userData => {
//   console.log('Lognin userData is:=======>', userData);
//   return async dispatch => {
//     dispatch(loginRequest());

//     try {
//       const response = await fetch(`https://bogathon.websitesupport.ie/api/login`, {
//         method: 'POST',

//         body: userData,
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const responseData = await response.json();

//       dispatch(loginSuccess(responseData?.data));

//       console.log('res data is', responseData.data);

//       //   console.log('res data is', r;
//     } catch (error) {
//       //   dispatch(loginFailure(error?.message));
//       console.log('error message is', error.message);
//     }
//   };
// };
