import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AppConfig from "../config";
import { fetchUnavailableDate_time } from "./blockDate";
import {
  confirmPayment,
  createPaymentMethod
} from "@stripe/stripe-react-native";
import { apiRequest } from "./apiRequest";
const apiUrl = AppConfig.apiUrl;

export const BOOKING_REQUEST = "BOOKING_REQUEST";
export const ALL_BOOKING_REQUEST = "ALL_BOOKING_REQUEST";

export const FETCH_BOOKING_SUCCESS = "FETCH_BOOKING_SUCCESS";
export const FETCH_BOOKING_FAILURE = "FETCH_BOOKING_FAILURE";

export const FETCH_ALL_BOOKING_SUCCESS = "FETCH_ALL_BOOKING_SUCCESS";
export const FETCH_ALL_BOOKING_FAILURE = "FETCH_ALL_BOOKING_FAILURE";

export const FETCH_BOOKING_EVENT_SUCCESS = "FETCH_BOOKING_EVENT_SUCCESS";
export const FETCH_BOOKING_EVENT_FAILURE = "FETCH_BOOKING_EVENT_FAILURE";

export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";

export const FETCH_BOOKING_DETAIL = "FETCH_BOOKING_DETAIL";

export const CREATE_BOOKING_SUCCESS = "CREATE_BOOKING_SUCCESS";
export const CREATE_BOOKING_FAILURE = "CREATE_BOOKING_FAILURE";

export const CREATE_PARTICIPANT_SUCCESS = "CREATE_PARTICIPANT_SUCCESS";
export const CREATE_PARTICIPANT_FAILURE = "CREATE_PARTICIPANT_FAILURE";

export const FETCH_CALENDAR_EVENT_SUCCESS = "FETCH_CALENDAR_EVENT_SUCCESS";
export const FETCH_CALENDAR_EVENT_FAILURE = "FETCH_CALENDAR_EVENT_FAILURE";

export const FETCH_PAYMENT_KEY_SUCCESS = "FETCH_PAYMENT_KEY_SUCCESS";
export const FETCH_PAYMENT_KEY_FAILURE = "FETCH_PAYMENT_KEY_FAILURE";

export const CREATE_TOKEN_SUCCESS = "CREATE_TOKEN_SUCCESS";
export const CREATE_TOKEN_FAILURE = "CREATE_TOKEN_FAILURE";

export const CLEART_STATE = "CLEART_STATE";
export const CLEART_BOOKING_STATE = "CLEART_BOOKING_STATE";

export const RESET_BOOKING = "BOOKING/RESET";

export const fetch_booking_Request = () => ({
  type: BOOKING_REQUEST
});

export const create_token_success = () => ({
  type: CREATE_TOKEN_SUCCESS
});
export const create_token_failure = () => ({
  type: CREATE_TOKEN_FAILURE
});
// export const clear_booking_state = () => ({
//   type: CLEART_STATE
// });
export const clear_booking_state = () => {
  // alert("test");
  return {
    type: CLEART_STATE
  };
};
export const clear_booking_List = () => {
  return {
    type: CLEART_BOOKING_STATE
  };
};

export const resetForm = () => {
  return {
    type: RESET_BOOKING
  };
};

export const fetchCalendar_Event = () => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };

      const response = await axios.get(`${apiUrl}bookingCalender`, { headers });
      console.log("Calendar event list is###", response.data.data);
      dispatch({
        type: FETCH_CALENDAR_EVENT_SUCCESS,
        data: response?.data?.data
      });
      // await dispatch(fetchUnavailableDate_time());
    } catch (error) {
      dispatch({
        type: FETCH_CALENDAR_EVENT_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};

export const fetch_AllBooking_Dashboard = () => {
  return async (dispatch) => {
    dispatch({ type: ALL_BOOKING_REQUEST });
    // alert("1");
    try {
      const response = await apiRequest("allBookingList", "GET", null, {});
      // alert("2");

      console.log("all Booking list is###", response.data.data);

      dispatch({
        type: FETCH_ALL_BOOKING_SUCCESS,
        data: response?.data?.data
      });
    } catch (error) {
      console.error("Error fetching fetch_AllBooking_Dashboard:", error);

      const errorMessage =
        error.response?.data?.error[0] || "Server error occurred";
      dispatch({
        type: FETCH_ALL_BOOKING_FAILURE,
        error: errorMessage
      });
    }
  };
};

export const fetchBooking_Dashboard = (id) => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const response = await apiRequest("bookingList", "GET", null, {
        event_id: id
      });

      console.log("Booking list is###", response);

      dispatch({
        type: FETCH_BOOKING_SUCCESS,
        data: response?.data?.data
      });

      await dispatch(fetchUnavailableDate_time());
    } catch (error) {
      console.error("Error fetchBooking_Dashboard:", error);

      const errorMessage =
        error.response?.data?.error[0] || "Server error occurred";
      dispatch({
        type: FETCH_BOOKING_FAILURE,
        error: errorMessage
      });
    }
  };
};

export const update_fetchBooking_Dashboard = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest("bookingList", "GET", null, {
        event_id: id ? id : 1
      });

      console.log("Booking list is###", response);

      dispatch({
        type: FETCH_BOOKING_SUCCESS,
        data: response?.data?.data
      });

      await dispatch(fetchUnavailableDate_time());
    } catch (error) {
      console.error("Error update_fetchBooking_Dashboard:", error);

      const errorMessage =
        error.response?.data?.error[0] || "Server error occurred";
      dispatch({
        type: FETCH_BOOKING_FAILURE,
        error: errorMessage
      });
    }
  };
};

export const fetchPayment_key = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest("stripeKeys", "GET", null, {});

      console.log("Booking list is###", response);

      dispatch({
        type: FETCH_PAYMENT_KEY_SUCCESS,
        data: response?.data?.data
      });
    } catch (error) {
      console.error("Error fetchPayment_keya:", error);
      dispatch({
        type: FETCH_PAYMENT_KEY_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};
// export const fetchPayment_key = () => {
//   // alert("sfsdf");
//   return async (dispatch) => {
//     dispatch({ type: BOOKING_REQUEST });

//     try {
//       const userData = await AsyncStorage.getItem("userData");
//       const transformedData = JSON.parse(userData);
//       const { token } = transformedData;

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data"
//       };

//       const response = await axios.get(`${apiUrl}stripeKeys`, { headers });
//       console.log("payment key is .... is###", response.data.data);
//       dispatch({
//         type: FETCH_PAYMENT_KEY_SUCCESS,
//         data: response?.data?.data
//       });
//       await dispatch(fetchUnavailableDate_time());
//     } catch (error) {
//       dispatch({
//         type: FETCH_PAYMENT_KEY_FAILURE,
//         error: error.response.data.error[0] || "An error occurred"
//       });
//     }
//   };
// };

export const sendEmail = (id) => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const response = await apiRequest("reSendEmail", "GET", null, {
        id: id
      });

      console.log("Booking list is###", response);

      dispatch({
        type: SEND_EMAIL_SUCCESS,
        success: response.data.success[0]
      });
    } catch (error) {
      console.error("Error sendEmail:", error);

      dispatch({
        type: SEND_EMAIL_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};
export const fetch_Booker_Booking = (id) => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const response = await apiRequest("bookerBookingList", "GET", null, {
        user_id: id
      });

      console.log("Booking list is###", response);

      dispatch({
        type: FETCH_BOOKING_SUCCESS,
        data: response?.data?.data
      });
    } catch (error) {
      console.error("Error fetch_Booker_Booking:", error);

      dispatch({
        type: FETCH_BOOKING_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};
export const fetchBooking_Detail = (id) => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const response = await apiRequest("bookingDetails", "GET", null, {
        booking_id: id
      });

      console.log("Booking list is###", response);

      dispatch({
        type: FETCH_BOOKING_DETAIL,
        detail: response.data.data,
        message: response.data.message
      });
    } catch (error) {
      console.error("Error fetchBooking_Detail:", error);

      dispatch({
        type: FETCH_BOOKING_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};
export const fetchBooking_Events = () => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const response = await apiRequest("events", "GET", null, {});

      console.log("Booking event list is###", response.data.data);

      dispatch({
        type: FETCH_BOOKING_EVENT_SUCCESS,
        data: response.data.data
      });
    } catch (error) {
      console.error("Error fetching booking event is:", error);

      dispatch({
        type: FETCH_BOOKING_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};
export const refresh_fetchBooking_Detail = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest("bookingDetails", "GET", null, {
        booking_id: id
      });

      // console.log("Booking list is###", response);

      dispatch({
        type: FETCH_BOOKING_DETAIL,
        detail: response.data.data,
        message: response.data.message
      });
    } catch (error) {
      console.error("Error fetching refresh_fetchBooking_Detai:", error);

      dispatch({
        type: FETCH_BOOKING_FAILURE,
        error: error.response.data.error[0] || "An error occurred"
      });
    }
  };
};

export const create_Booking = (formData, update) => {
  console.log("form data is ............", formData);
  return async (dispatch) => {
    try {
      dispatch({ type: BOOKING_REQUEST });

      const userData = await AsyncStorage.getItem("userData");

      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      // axios;
      // .post(`${apiUrl}createUser`, formData, {headers})
      // const url = `${apiUrl}createBooking`;

      const url = update ? `${apiUrl}editBooking` : `${apiUrl}createBooking`;

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

      console.log("create Booking data is*****************>", response.data);
      console.log(
        "create Booking res msg is**************>",
        response.data.message
      );

      // await dispatch(fetchUnavailableDate_time());
      // await dispatch(fetchBooking_Dashboard());
      dispatch({
        type: CREATE_BOOKING_SUCCESS,
        success: response?.data?.message
        // message: response.data.message,
      });
      // await dispatch(fetchBooking_Dashboard());

      // await dispatch(fetchUnavailableDate_time());

      // Assuming fetchUser_List is the correct action to fetch data
      // Assuming fetchUser_List is the correct action to fetch data
    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.data.errors);
        console.error("Error data:", error.response.data.errors[0]);

        // let errors = error?.response?.data['error'];
        // dispatch(fetchUser_List);
        dispatch({
          type: CREATE_BOOKING_FAILURE,
          error: error.response.data.errors[0] || "server error"
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
};

export const create_Participant2 = (formData, update, itemId) => {
  return async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });

    try {
      const endpoint = update ? "editParticipant" : "addParticipants";
      const method = update ? "PUT" : "POST";

      const response = await apiRequest(
        update ? "editParticipant" : "addParticipants",
        update ? "PUT" : "POST",
        formData,
        {}
      );

      // const response = await apiRequest(endpoint, method, formData);

      console.log("Create Participant response:", response?.data);

      await dispatch(fetchBooking_Detail(itemId));

      dispatch({
        type: CREATE_PARTICIPANT_SUCCESS,
        success: response?.data?.message
        // message: response.data.message,
      });
    } catch (error) {
      if (error.response) {
        console.log("Error status:", error.response.data.error);

        dispatch({
          type: CREATE_PARTICIPANT_FAILURE,
          error:
            error.response.data.errors[0] ||
            error.response.data.error[0] ||
            "server error"
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
};

export const create_Participant = (formData, update, itemId) => {
  // alert(update);
  return async (dispatch) => {
    try {
      dispatch({ type: BOOKING_REQUEST });

      const userData = await AsyncStorage.getItem("userData");

      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      // axios;
      // .post(`${apiUrl}createUser`, formData, {headers})

      const url = update
        ? `${apiUrl}editParticipant`
        : `${apiUrl}addParticipants`;

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

      console.log(
        "create Participant data is*****************>",
        response?.data?.message
      );

      console.log(
        "create Participant data is*****************>",
        response?.data
      );
      // alert(response?.data?.message);
      // await dispatch(fetchBooking_Dashboard());
      await dispatch(fetchBooking_Detail(itemId));

      dispatch({
        type: CREATE_PARTICIPANT_SUCCESS,
        success: response?.data?.message
        // message: response.data.message,
      });
    } catch (error) {
      if (error.response) {
        // console.error("Error status:", error.response.data);
        console.log("Error status:", error.response.data.error);

        // console.error("Error data:", error.response.data.errors);

        // let errors = error?.response?.data['error'];
        // dispatch(fetchUser_List);
        dispatch({
          type: CREATE_PARTICIPANT_FAILURE,
          error:
            error.response.data.errors[0] ||
            error.response.data.error[0] ||
            "server error"
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
};

export const createPaymentIntents = (
  BookingDetails,
  cardInfo,
  paymentKey,
  totalAmount,
  itemId,
  emailFields,
  numParticipants,
  update
) => {
  // alert("update");
  return async (dispatch) => {
    // dispatch({ type: BOOKING_REQUEST });

    try {
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: "Card",
        ...cardInfo
      });

      if (error) {
        throw new Error(`Error creating payment method`);
      }
      const paymentMethodId = paymentMethod.id;
      // alert(paymentKey.stripeSecretKey);
      const paymentIntentResponse = await fetch(
        "https://api.stripe.com/v1/payment_intents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paymentKey.stripeSecretKey}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            amount: totalAmount * 100,
            currency: "EUR",
            "automatic_payment_methods[enabled]": "true",
            payment_method: paymentMethodId,
            description: "Payment from Bogathon for new Users.",
            "metadata[name]":
              BookingDetails.first_name + " " + BookingDetails.last_name,
            "metadata[phone]": BookingDetails.phone,
            "metadata[date]": BookingDetails.booking_date,
            "metadata[time_slot]": BookingDetails.time_slot,
            "metadata[num_participants]": BookingDetails.total_participants,
            "metadata[group_name]": BookingDetails.group_name
          }).toString()
        }
      );

      const paymentIntentData = await paymentIntentResponse.json();

      let confirmPaymentIntent = await confirmPayment(
        paymentIntentData.client_secret,
        { paymentMethodType: "Card" }
      );

      // alert(paymentIntentData.id);
      if (paymentIntentData?.id) {
        alert("test....");
        let formData = new FormData();

        formData.append("booking_id", itemId);
        formData.append("stripeToken", paymentIntentData.id);

        const participantEmails = emailFields.map((field) => field.email);
        formData.append(
          "participant_emails",
          JSON.stringify(participantEmails)
        );

        formData.append("total_price", totalAmount);
        formData.append("new_participants", numParticipants);

        console.log("form data is .......", formData);

        await dispatch(create_Participant(formData, update, itemId));
      }

      console.log("confirm payment is .....", confirmPaymentIntent);
      if (!paymentIntentResponse.ok) {
        throw new Error(
          `Failed to create payment intent: ${paymentIntentResponse.statusText}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
