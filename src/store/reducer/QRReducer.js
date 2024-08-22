// reducer.js

import {
  SCAN_RESPONSE_SUCCESS,
  SCAN_RESPONSE_FAILED,
  REQUEST_SCAN_RESPONSE,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_BOOKING_SUCCESS,
  AUTHENTICATE_BOOKING_FAILURE,
  INITIALIZE_STATE,
  CLEAR_SCAN_STATE,
  CLEAR_SCAN_MESSAGE
} from "../action/scannerResponse";

const initialState = {
  loading: false,
  data: null,
  success: "",
  message: "",

  error: "",
  msg_error: "",

  flag: false,
  scanned: false,
  modal: false
  // msg: '',
  // resMessage: '',
  // bookingError: [],
};

const QRReducer = (state = initialState, action) => {
  console.log("action in QR reducer........", action.success, action.error);
  switch (action.type) {
    case REQUEST_SCAN_RESPONSE:
      return {
        // loading: true,
        data: null,
        error: "",
        msg_error: "",
        success: "",
        message: "",
        flag: false,
        scanned: false,
        modal: false
      };
    case AUTHENTICATE_REQUEST:
      return {
        // loading: true,
        data: { ...state.data },
        error: "",
        msg_error: "",

        success: "",
        message: "",

        flag: false,
        scanned: false,
        modal: false
      };
    case SCAN_RESPONSE_SUCCESS:
      return {
        // loading: false,
        data: action.data,
        error: "",
        msg_error: "",

        success: action.message,
        message: "",

        flag: false,
        scanned: true,
        modal: action.modal
      };
    case SCAN_RESPONSE_FAILED:
      return {
        // loading: false,
        data: {},
        error: action.error,
        msg_error: "",

        message: "",

        success: "",
        flag: false,
        scanned: true,
        modal: action.modal
      };
    case AUTHENTICATE_BOOKING_SUCCESS:
      return {
        // loading: false,
        data: { ...state.data },
        error: "",
        msg_error: "",

        success: "",
        message: action.success,

        flag: false,
        scanned: true,
        modal: action.modal
      };

    case AUTHENTICATE_BOOKING_FAILURE:
      return {
        // loading: false,
        data: { ...state.data },
        error: "",
        msg_error: action.error,

        success: "",
        message: "",

        flag: false,
        scanned: true,
        modal: action.modal
      };
    case CLEAR_SCAN_MESSAGE:
      return {
        // loading: false,
        data: { ...state.data },
        success: "",
        message: "",

        error: "",
        msg_error: "",

        flag: false,
        scanned: false,
        modal: false
        // bookingError: [],
      };
    case CLEAR_SCAN_STATE:
      return {
        // loading: false,
        data: null,
        success: "",
        message: "",

        error: "",
        msg_error: "",

        flag: false,
        scanned: false,
        modal: false
        // bookingError: [],
      }; // Reset to initial state

      // case POST_BOOKING_REQUEST:
      return { ...state, loading: true, bookingError: [] };
      // case POST_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
        bookingError: []
      };
      // case POST_BOOKING_FAILURE:
      return { ...state, loading: false, bookingError: action.payload };

    default:
      return state;
  }
};

export default QRReducer;
