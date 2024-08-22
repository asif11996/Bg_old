// import {
//   BOOKING_REQUEST,
//   ALL_BOOKING_REQUEST,
//   CREATE_BOOKING_SUCCESS,
//   CREATE_BOOKING_FAILURE,
//   CREATE_PARTICIPANT_SUCCESS,
//   CREATE_PARTICIPANT_FAILURE,
//   FETCH_BOOKING_SUCCESS,
//   FETCH_BOOKING_DETAIL,
//   FETCH_BOOKING_FAILURE,
//   FETCH_PAYMENT_KEY_SUCCESS,
//   FETCH_PAYMENT_KEY_FAILURE,
//   FETCH_CALENDAR_EVENT_SUCCESS,
//   FETCH_CALENDAR_EVENT_FAILURE,
//   FETCH_ALL_BOOKING_SUCCESS,
//   FETCH_ALL_BOOKING_FAILURE,
//   SEND_EMAIL_SUCCESS,
//   SEND_EMAIL_FAILURE,
//   CREATE_TOKEN_SUCCESS,
//   CREATE_TOKEN_FAILURE,
//   RESET_BOOKING,
//   CLEART_STATE,
//   CLEART_BOOKING_STATE,
//   FETCH_BOOKING_EVENT_SUCCESS
// } from "../action/booking";

// const initialState = {
//   success: "",
//   error: "",
//   loading: false,
//   loader: false,
//   booking: {},
//   allBooking: {},

//   calendarEvent: [],

//   bookingdetail: {},
//   paymentKey: {},
//   bookingEvent: []
// };

// const bookingReducer = (state = initialState, action) => {
//   console.log("booking1122>>>>>>>>>>>>>>>>>>>>>>>>", action.data);

//   switch (action.type) {
//     case BOOKING_REQUEST:
//       return {
//         success: "",
//         error: "",
//         loading: true,
//         loader: true,

//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         calendarEvent: [...state.calendarEvent],

//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     // case ALL_BOOKING_REQUEST:
//     //   return {
//     //     success: "",
//     //     error: "",
//     //     loader: true,
//     //     loading: true,
//     //     allBooking: { ...state.allBooking },

//     //     booking: { ...state.booking },
//     //     calendarEvent: [...state.calendarEvent],

//     //     bookingdetail: { ...state.bookingdetail },
//     //     paymentKey: { ...state.paymentKey },
//     //     bookingEvent: [...state.bookingEvent]
//     //   };
//     case CREATE_TOKEN_SUCCESS:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         calendarEvent: [...state.calendarEvent],

//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case CREATE_TOKEN_FAILURE:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         calendarEvent: [...state.calendarEvent],

//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_BOOKING_SUCCESS:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         booking: action.data,
//         calendarEvent: [...state.calendarEvent],

//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_BOOKING_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };

//     case FETCH_ALL_BOOKING_SUCCESS:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         loader: false,
//         allBooking: action.data,
//         booking: { ...state.booking },
//         calendarEvent: [...state.calendarEvent],

//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_ALL_BOOKING_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,

//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };

//     case SEND_EMAIL_SUCCESS:
//       return {
//         success: action.success,
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         calendarEvent: [...state.calendarEvent],

//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case SEND_EMAIL_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_BOOKING_DETAIL:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],

//         booking: { ...state.booking },
//         bookingdetail: action.detail,
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };

//     case FETCH_CALENDAR_EVENT_SUCCESS:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: action.data,
//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_CALENDAR_EVENT_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],

//         booking: { ...state.booking },
//         bookingdetail: action.detail,
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };

//     case FETCH_PAYMENT_KEY_SUCCESS:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],
//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: action.data,
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_PAYMENT_KEY_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case FETCH_BOOKING_EVENT_SUCCESS:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         allBooking: { ...state.allBooking },

//         calendarEvent: [...state.calendarEvent],

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: action.data
//       };

//     case CREATE_BOOKING_SUCCESS:
//       return {
//         success: action.success,
//         error: "",
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case CREATE_BOOKING_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };

//     case CREATE_PARTICIPANT_SUCCESS:
//       return {
//         success: action.success,
//         error: "",
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case CREATE_PARTICIPANT_FAILURE:
//       return {
//         success: "",
//         error: action.error,
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case CLEART_STATE:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };
//     case CLEART_BOOKING_STATE:
//       return {
//         success: "",
//         error: "",
//         loading: false,
//         calendarEvent: [...state.calendarEvent],
//         allBooking: { ...state.allBooking },

//         booking: { ...state.booking },
//         bookingdetail: { ...state.bookingdetail },
//         paymentKey: { ...state.paymentKey },
//         bookingEvent: [...state.bookingEvent]
//       };

//     default:
//       return state;
//   }
// };

// export default bookingReducer;
// // // Helper function to dispatch error action
// // const dispatchError = (dispatch, type, errorMessage) => {
// //     dispatch({
// //       type: SET_ERROR,
// //       error: errorMessage,
// //     });

// //     dispatch({
// //       type,
// //       error: errorMessage,
// //     });
// //   };

import {
  BOOKING_REQUEST,
  ALL_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILURE,
  CREATE_PARTICIPANT_SUCCESS,
  CREATE_PARTICIPANT_FAILURE,
  FETCH_BOOKING_SUCCESS,
  FETCH_BOOKING_DETAIL,
  FETCH_BOOKING_FAILURE,
  FETCH_PAYMENT_KEY_SUCCESS,
  FETCH_PAYMENT_KEY_FAILURE,
  FETCH_CALENDAR_EVENT_SUCCESS,
  FETCH_CALENDAR_EVENT_FAILURE,
  FETCH_ALL_BOOKING_SUCCESS,
  FETCH_ALL_BOOKING_FAILURE,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  CREATE_TOKEN_SUCCESS,
  CREATE_TOKEN_FAILURE,
  RESET_BOOKING,
  CLEART_STATE,
  CLEART_BOOKING_STATE,
  FETCH_BOOKING_EVENT_SUCCESS
} from "../action/booking";

const initialState = {
  success: "",
  error: "",
  loading: false,
  loader: false,
  booking: {},
  allBooking: {},
  calendarEvent: [],
  bookingdetail: {},
  paymentKey: {},
  bookingEvent: []
};

const bookingReducer = (state = initialState, action) => {
  console.log("booking1122>>>>>>>>>>>>>>>>>>>>>>>>", action.data);

  switch (action.type) {
    case BOOKING_REQUEST:
      return { ...state, loading: true, loader: true };

    case CREATE_TOKEN_SUCCESS:
    case CREATE_TOKEN_FAILURE:
      return { ...state, loading: false };

    case FETCH_BOOKING_SUCCESS:
      return { ...state, loading: false, booking: action.data };

    case FETCH_BOOKING_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_ALL_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        loader: false,
        allBooking: action.data
      };

    case FETCH_ALL_BOOKING_FAILURE:
      return { ...state, loading: false, error: action.error };

    case SEND_EMAIL_SUCCESS:
      return { ...state, loading: false, success: action.success };

    case SEND_EMAIL_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_BOOKING_DETAIL:
      return { ...state, loading: false, bookingdetail: action.detail };

    case FETCH_CALENDAR_EVENT_SUCCESS:
      return { ...state, loading: false, calendarEvent: action.data };

    case FETCH_CALENDAR_EVENT_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_PAYMENT_KEY_SUCCESS:
      return { ...state, loading: false, paymentKey: action.data };

    case FETCH_PAYMENT_KEY_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_BOOKING_EVENT_SUCCESS:
      return { ...state, loading: false, bookingEvent: action.data };

    case CREATE_BOOKING_SUCCESS:
    case CREATE_PARTICIPANT_SUCCESS:
      return { ...state, loading: false, success: action.success };

    case CREATE_BOOKING_FAILURE:
    case CREATE_PARTICIPANT_FAILURE:
      return { ...state, loading: false, error: action.error };

    case CLEART_STATE:
      return {
        success: "",
        error: "",
        loading: false,
        calendarEvent: [...state.calendarEvent],
        allBooking: { ...state.allBooking },

        booking: { ...state.booking },
        bookingdetail: { ...state.bookingdetail },
        paymentKey: { ...state.paymentKey },
        bookingEvent: [...state.bookingEvent]
      };
    case CLEART_BOOKING_STATE:
      return { ...state };

    default:
      return state;
  }
};

export default bookingReducer;
