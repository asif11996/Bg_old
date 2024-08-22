// actions.js
// import firebase from 'firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import axios from "axios";

import { clearState } from "./scannerResponse";
import AppConfig from "../config";
import { Alert } from "react-native";
import axiosRetry from "axios-retry";
import { err } from "react-native-svg/lib/typescript/xml";

const apiUrl = AppConfig.apiUrl;

export const BLOCKDATE_REQUEST = "BLOCKDATE_REQUEST";
export const FETCH_BLOCKDATE_SUCCESS = "FETCH_BLOCKDATE_SUCCESS";
export const FETCH_BLOCKDATE_FAILURE = "FETCH_BLOCKDATE_FAILURE";

export const FETCH_UNAVAILABLE_DATE_TIME = "FETCH_UNAVAILABLE_DATE_TIME";

export const FETCH_TIMESLOT_SUCCESS = "FETCH_TIMESLOT_SUCCESS";
export const FETCH_TIMESLOT_FAILURE = "FETCH_TIMESLOT_FAILURE";

export const DELETE_BLOCKDATE_SUCCESS = "DELETE_BLOCKDATE_SUCCESS";
export const DELETE_BLOCKDATE_FAILURE = "DELETE_BLOCKDATE_FAILURE";

export const CREATE_BLOCKDATE_SUCCESS = "CREATE_BLOCKDATE_SUCCESS";
export const CREATE_BLOCKDATE_FAILURE = "CREATE_BLOCKDATE_FAILURE";
// export const INITIALIZE_STATE = 'INITIALIZE_STATE';

// export const RESET_FORM = 'RESET_FORM';

// export const UPDATE_USERSTATUS_FAILED = 'UPDATE_USERSTATUS_FAILED';

// export const cleardateState = () => {
//   return {type: INITIALIZE_STATE};
// };

export const fetchBlockDate_List = () => {
  return async (dispatch) => {
    dispatch({ type: BLOCKDATE_REQUEST });

    try {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };

      const response = await axios.get(`${apiUrl}allBlockDates`, { headers });
      console.log("fetch blockdate response success...", response.data.message);
      dispatch(fetchUnavailableDate_time());

      dispatch({
        type: FETCH_BLOCKDATE_SUCCESS,
        blockDate: response.data.data.blocKDates,
        timeSlots: response.data.data.timeSlots
      });
    } catch (error) {
      dispatch({
        type: FETCH_BLOCKDATE_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
      dispatch(fetchUnavailableDate_time());
    }
  };
};

export const fetchUnavailableDate_time = () => {
  console.log("fetchUser_List");
  return async (dispatch) => {
    dispatch({ type: BLOCKDATE_REQUEST });

    try {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };

      const response = await axios.get(`${apiUrl}unAvailableDateAndTimeSlots`, {
        headers
      });
      console.log(
        "block date and time slot is1122 ============================>",
        response.data.data.blocKDates
      );
      dispatch({
        type: FETCH_UNAVAILABLE_DATE_TIME,
        blockDate_time: response.data.data.blocKDates
      });
    } catch (error) {
      // alert(error);
      dispatch({
        type: FETCH_BLOCKDATE_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};

export const fetchTimelist = () => {
  // alert('sdfds');
  return async (dispatch) => {
    // dispatch({type: FETCH_BLOCKDATE_REQUEST});
    dispatch({ type: BLOCKDATE_REQUEST });

    try {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };
      // alert('time slot');

      const response = await axios.get(`${apiUrl}timeSlots`, { headers });
      console.log(
        "time slot response is ************************************1122",
        response.data.data.timeSlots
      );
      // alert('mm');

      dispatch({
        type: FETCH_TIMESLOT_SUCCESS,
        Available_TimeSlots: response.data.data.timeSlots
      });
    } catch (error) {
      console.log("error is ..........", error);
      dispatch({
        type: FETCH_TIMESLOT_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};
const axiosInstance = axios.create({
  timeout: 5000 // Set a timeout of 5 seconds
});

// Apply retry logic to axios
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});

export const create_BlockDate_post = (formData, update) => {
  console.log("create and update user is .......++++++++++", formData, update);

  console.log(".........................");
  return async (dispatch) => {
    // dispatch(create_User_Request());
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;

    // axios;
    // .post(`${apiUrl}createUser`, formData, {headers})
    const url = `${apiUrl}editBlockDate`;

    // const url = 'https://bogathon.websitesupport.ie/api/createUser';
    axios({
      url,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          //  update
          "application/x-www-form-urlencoded"
        // :
        //   'multipart/form-data',
      },
      data: formData // important
    })
      .then((response) => {
        console.log("create user data is*****************>", response.data);
        console.log(
          "create user res msg is**************>",
          response.data.message
        );
        dispatch(fetchBlockDate_List());
        dispatch({
          type: CREATE_BLOCKDATE_SUCCESS,
          success: response.data.message

          // message: response.data.message,
        });
      })
      .catch((error) => {
        // Handle any errors here

        console.log(
          "error in block time slot is ........",
          error.response.data.error[0]
        );
        if (error.response) {
          console.error("Error status..:", error.response.status);
          console.error("Error data:", error.response.data.error[0]);

          // let errors = error?.response?.data['error'];
          dispatch({
            type: CREATE_BLOCKDATE_FAILURE,
            error: error.response.data.error[0]
          });
          dispatch(fetchBlockDate_List());
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
export const create_BlockDate = (formData, update) => {
  // alert('sdfsd');
  console.log("form data is ass ............", formData, update);
  return async (dispatch) => {
    dispatch({ type: BLOCKDATE_REQUEST });

    try {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { token } = transformedData;
      const url = update
        ? `${apiUrl}editBlockDate`
        : `${apiUrl}createBlockDate`;

      const response = await axios({
        url,
        method: update ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": update
            ? "application/x-www-form-urlencoded"
            : "multipart/form-data"
        },
        data: formData
      });

      console.log("create block date is*****************>", response.data);
      console.log(
        "create block date res msg is**************>",
        response.data.message
      );
      //   alert(response.data.message);
      //   alert(response.data.message, response.data.message);

      dispatch({
        type: CREATE_BLOCKDATE_SUCCESS,
        success: response.data.message
      });
      dispatch(fetchBlockDate_List());
    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.data.error[0]);
        // console.error('Error data:', error.response.data.error[0]);
        dispatch(fetchBlockDate_List());
        dispatch({
          type: CREATE_BLOCKDATE_FAILURE,
          error: update ? "" : error.response.data.error[0]
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message,,:", error.message);
      }
    }
  };
};

export const delete_BlockDate = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOCKDATE_REQUEST });

    const userData = await AsyncStorage.getItem("userData");
    const { token } = JSON.parse(userData);

    const response = await fetch(`${apiUrl}deleteBlockDate?id=${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',

        "Content-Type": "application/x-www-form-urlencoded" // Assuming you are sending JSON data
      }
    });

    const responseData = await response.json();
    console.log(
      "delete blockdate response is >>>>>>>>",
      responseData.success[0]
    );
    // alert(responseData.success[0]);

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData["errors"][0];
      throw new Error(errorMessage);
    }
    dispatch(fetchBlockDate_List());
    dispatch(fetchUnavailableDate_time());

    dispatch({
      type: DELETE_BLOCKDATE_SUCCESS,
      message: responseData.success[0]
    });
  } catch (error) {
    console.log("error is ........", error);
    console.log("error is ........", error.message);

    dispatch({ type: DELETE_BLOCKDATE_FAILURE, error: error.message });
  }
};
