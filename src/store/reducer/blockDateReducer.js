import { Alert } from "react-native";
import {
  BLOCKDATE_REQUEST,
  FETCH_BLOCKDATE_SUCCESS,
  FETCH_BLOCKDATE_FAILURE,
  FETCH_TIMESLOT_SUCCESS,
  FETCH_UNAVAILABLE_DATE_TIME,
  FETCH_TIMESLOT_FAILURE,
  CREATE_BLOCKDATE_SUCCESS,
  CREATE_BLOCKDATE_FAILURE,
  DELETE_BLOCKDATE_SUCCESS,
  DELETE_BLOCKDATE_FAILURE,
  INITIALIZE_STATE,
  RESET_FORM
} from "../action/blockDate";

const initialState = {
  loadings: false,
  success: "",
  error: "",
  deletesuccess: "",
  deleteError: "",

  blockDate: [],
  timeSlot: [],
  blockDate_time: {}
};

const blockDateReducer = (state = initialState, action) => {
  console.log("block time is ...............in reducer", action.blockDate_time);
  switch (action.type) {
    case BLOCKDATE_REQUEST:
      return {
        loadings: true,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",

        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],

        blockDate_time: { ...state.blockDate_time }
      };
    case FETCH_BLOCKDATE_SUCCESS:
      return {
        loadings: false,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",
        blockDate: action.blockDate,
        timeSlot: action.timeSlots,
        blockDate_time: { ...state.blockDate_time }
      };
    case FETCH_BLOCKDATE_FAILURE:
      return {
        loadings: false,
        success: "",
        error: action.error,
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: { ...state.blockDate_time }
      };
    case FETCH_UNAVAILABLE_DATE_TIME:
      return {
        loadings: false,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: {
          ...state.blockDate_time,
          ...action.blockDate_time
        }
      };

    case FETCH_TIMESLOT_SUCCESS:
      return {
        loadings: false,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: action.Available_TimeSlots,
        blockDate_time: { ...state.blockDate_time }
      };
    case FETCH_TIMESLOT_FAILURE:
      return {
        loadings: false,
        success: "",
        error: action.error,
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: { ...state.blockDate_time }
      };
    case CREATE_BLOCKDATE_SUCCESS:
      return {
        loadings: false,
        success: action.success,
        error: "",
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],

        blockDate_time: { ...state.blockDate_time }

        // blockDate: Array.isArray(state.blockDate) ? [...state.blockDate] : [],
        // timeSlot: Array.isArray(state.timeSlot) ? [...state.timeSlot] : [],
      };
    case CREATE_BLOCKDATE_FAILURE:
      return {
        loadings: false,
        success: "",
        error: action.error,
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: { ...state.blockDate_time }
      };
    case DELETE_BLOCKDATE_SUCCESS:
      return {
        ...state,
        loadings: false,
        success: "",
        error: "",
        deletesuccess: action.message,
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: { ...state.blockDate_time }

        // blockDate_time: [...state.blockDate_time],
      };
    case DELETE_BLOCKDATE_FAILURE:
      return {
        loadings: false,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: action.error,

        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: { ...state.blockDate_time }
      };
    case INITIALIZE_STATE:
      return {
        loadings: false,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",
        blockDate: [...state.blockDate],
        timeSlot: [...state.timeSlot],
        blockDate_time: { ...state.blockDate_time }
      };

    case RESET_FORM: {
      return initialState;
    }
    default:
      return state;
  }
};

export default blockDateReducer;
