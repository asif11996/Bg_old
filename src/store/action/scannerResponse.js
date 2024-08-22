export const CURRENT_LEADS_ADMIN_ATTENDENCE = "CURRENT_LEADS_ADMIN_ATTENDENCE";
export const CHECK_STATUS = "CHECK_STATUS";
export const ADMIN_ATTENDENCE = "ADMIN_ATTENDENCE";
export const ERROR = "ERROR";
export const RESPONSE = "RESPONSE";
export const LOADING = "LOADING";
export const RESPONSE_MOVE_TO_RATING = "RESPONSE_MOVE_TO_RATING";
export const MODAL_TOGGLE = "MODAL_TOGGLE";
export const WAIT_FOR_SCANNING = "WAIT_FOR_SCANNING";
export const ERROR_CONFIRM = "ERROR_CONFIRM";
export const INITIALIZE_STATE = "INITIALIZE_STATE";
export const CLEAR_SCAN_STATE = "CLEAR_SCAN_STATE";
export const CLEAR_SCAN_MESSAGE = "CLEAR_SCAN_MESSAGE";

export const SCAN_RESPONSE_FAILED = "SCAN_RESPONSE_FAILED";
export const SCAN_RESPONSE_SUCCESS = "SCAN_RESPONSE_SUCCESS";
export const REQUEST_SCAN_RESPONSE = "REQUEST_SCAN_RESPONSE";

export const RESPONSE_MESSAGE = "RESPONSE_MESSAGE";

export const AUTHENTICATE_REQUEST = "AUTHENTICATE_REQUEST";
export const AUTHENTICATE_BOOKING_SUCCESS = "AUTHENTICATE_BOOKING_SUCCESS";
export const AUTHENTICATE_BOOKING_FAILURE = "AUTHENTICATE_BOOKING_FAILURE";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import AppConfig from "../config";
const apiUrl = AppConfig.apiUrl;

export const clearScanMessage = () => {
  // alert('sdfsd');
  return { type: CLEAR_SCAN_MESSAGE };
};
export const clearScanState = () => ({
  type: CLEAR_SCAN_STATE
});

// export const clearScanMessage = () => ({
//   type: CLEAR_SCAN_MESSAGE,
// });

export const scanSuccess = (message, data) => ({
  type: SCAN_RESPONSE_SUCCESS,
  message: message,
  data: data,
  modal: data ? true : false
});
// export const resError = () => {
//   return {type: ERROR};
// };

// export const responseModal = () => {
//   return {type: RESPONSE};
// };

// export const resLoading = () => {
//   return {type: LOADING};
// };

// export const resMoveToRating = () => {
//   return {type: RESPONSE_MOVE_TO_RATING};
// };

// export const resModalToggle = () => {
//   return {type: MODAL_TOGGLE};
// };

// export const waitForScanning = () => {
//   return {type: WAIT_FOR_SCANNING};
// };
// export const errorConfirm = () => {
//   return {type: ERROR_CONFIRM};
// };

// export const initialState = () => {
//   return {type: INITIAL_STATE};
// };
// export const resMessageModal = () => {
//   return {type: RESPONSE_MESSAGE};
// };
export const scanResponse = (scanData) => {
  console.log("QR code is wwwwwwwwwww ........", scanData);

  const requestData = {
    public_code: scanData
  };

  return async (dispatch) => {
    dispatch({ type: REQUEST_SCAN_RESPONSE });
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const headers = {
      Authorization: `Bearer ${token}`
    }; // auth header with bearer token

    axios
      .post(`${apiUrl}scanCode`, requestData, { headers })
      .then((response) => {
        // Handle the successful response here
        console.log("scan res data is========>", response.data.data);
        console.log("scan res msg is========>", response.data.message);

        dispatch({
          type: SCAN_RESPONSE_SUCCESS,
          data: response.data.data,
          message: response.data.message,
          modal: response.data ? true : false
        });
      })
      .catch((error) => {
        // Handle any errors here
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data["error"]);

          let errors = error?.response?.data["error"];

          dispatch({
            type: SCAN_RESPONSE_FAILED,
            error: errors
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      });
  };
};

export const scanResponse2 = (scanData) => {
  const requestData = {
    public_code: "20231122133650710114710ryityOFEfx2PpFi"
  };
  return async (dispatch) => {
    dispatch({ type: REQUEST_SCAN_RESPONSE });

    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const response = await fetch(`${apiUrl}scanCode`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: requestData // important
    });
    console.error("Error..:", response.data);

    if (!response.ok) {
      const data = await response.json();

      console.error("Error..:", data.error);

      // dispatch({
      //   type: SCAN_RESPONSE_FAILED,
      //   payload: 'Public Code is not Correct',
      // });

      // throw new Error(message);
      dispatch({
        type: SCAN_RESPONSE_SUCCESS,
        data: response.data.data,
        message: response.data.message,

        modal: response.data ? true : false
      });
    }
  };
};

// export const bookingStatus = scanData => {
//   //   console.log('QR code is wwwwwwwwwww ........', scanData);

//   const requestData = {
//     status: 'attended',
//     member_id: scanData,
//   };

//   return async dispatch => {
//     dispatch(postBookingRequest());

//     axios
//       .post('https://bogathon.websitesupport.ie/api/bookingStatus', requestData)
//       .then(response => {
//         console.log('Response..................>>>>>>>>>>>>>:', response.data);
//         // dispatch(clearState());
//         dispatch(postBookingSuccess(response.data.message));
//         // dispatch({
//         //   type: INITIAL_STATE,
//         // });
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         dispatch(postBookingFailure(error));
//       });
//   };
// };

export const bookingStatus = (scanData) => {
  console.log("QR code is wwwwwwwwwww ........", scanData);

  return async (dispatch) => {
    // dispatch(postBookingRequest());
    dispatch({
      type: AUTHENTICATE_REQUEST
      // success: response.data.message,
    });

    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${apiUrl}eventStatus`, scanData, { headers })
      .then((response) => {
        console.log(
          "Response..................>>>>>>>>>>>>>:",
          response.data.message
        );
        // alert('sdf');
        // dispatch(clearState());
        // dispatch(postBookingSuccess(response.data.message));
        dispatch({
          type: AUTHENTICATE_BOOKING_SUCCESS,
          success: response.data.message
        });
        // dispatch({
        //   type: INITIAL_STATE,
        // });
      })
      .catch((error) => {
        // alert('err');
        console.log("error is ......", error.response.data.errors[0]);
        dispatch({
          type: AUTHENTICATE_BOOKING_FAILURE,
          error: error.response.data.errors[0]
        });
        // console.error('Error:', error.response.data.errors[0]);
        // dispatch(postBookingFailure(error.response.data.errors[0]));
      });
  };
};

// export const userInfo = () => {
//   return async dispatch => {
//     dispatch(fetchDataRequest());

//     console.log('user api call is ......', '');         sss

//     try {
//       const response = await fetch('https://bogathon.websitesupport.ie/api/events');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();

//       console.log('user data is ...........', data?.data.events);
//       dispatch(fetchDataSuccess(data.data.events));
//     } catch (error) {
//       dispatch(fetchDataFailure(error.message));
//       throw error;
//     }
//   };
// };
// export const loginUser = () => {
//   console.log('user info api call is:=======>');
//   return async dispatch => {
//     dispatch(loginRequest());

//     try {
//       const response = await fetch(`https://bogathon.websitesupport.ie/api/events`, {
//         method: 'POST',

//         body: userData,
//       });
//       console.log('res data is', response);

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const responseData = await response.json();

//       console.log('red data is ========>', responseData);
//       dispatch(loginSuccess(responseData?.data));

//       //   console.log('res data is', r;
//     } catch (error) {
//       dispatch(loginFailure(error?.message));
//     }
//   };
// };
