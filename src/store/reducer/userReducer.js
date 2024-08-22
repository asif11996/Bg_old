import {
  USER_REQUEST,
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USERSTATUS_SUCCESS,
  UPDATE_USERSTATUS_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  RESET_FORM,
  INITIALIZE_STATE
} from "../action/userAction";

// import {
//   CREATE_USERS_REQUEST,
//   CREATE_USERS_SUCCESS,
//   CREATE_USERS_FAILURE,
// } from '../action/userActions';

const initialState = {
  // user: null,
  // userList: [],

  loading: false,
  success: "",
  error: "",
  deletesuccess: "",
  deleteError: "",
  userList: []
};

const userReducer = (state = initialState, action) => {
  console.log("user reducer api data is ......", action.userlistData);
  switch (action.type) {
    case USER_REQUEST:
      return {
        // loading: true,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",
        userList: [...state.userList]
      };
    case FETCH_USERLIST_SUCCESS:
      return {
        // loading: false,
        success: "",
        error: "",
        deletesuccess: "",
        deleteError: "",
        userList: action.userlistData
      };

    case FETCH_USERLIST_FAILURE:
      return {
        // loading: false,
        success: "",
        error: action.error,
        deletesuccess: "",
        deleteError: "",
        userList: [...state.userList]
      };

    case CREATE_USER_SUCCESS:
      return {
        // loading: false,
        success: action.success,
        error: "",
        deletesuccess: "",
        deleteError: "",
        userList: [...state.userList]
      };
    case CREATE_USER_FAILURE:
      return {
        // loading: false,
        success: "",
        error: action.error,
        deletesuccess: "",
        deleteError: "",
        userList: [...state.userList]
      };
    case UPDATE_USERSTATUS_SUCCESS:
      return {
        // loading: false,
        success: action.success,
        error: "",
        deletesuccess: "",
        deleteError: "",
        userList: [...state.userList]
      };
    case UPDATE_USERSTATUS_FAILED:
      return {
        // loading: false,
        success: "",
        error: action.error,
        deletesuccess: "",
        deleteError: "",
        userList: [...state.userList]
      };
    case DELETE_USER_SUCCESS:
      return {
        // loading: false,
        deletesuccess: action.success,
        deleteError: "",
        error: "",
        success: "",
        userList: [...state.userList]
      };
    case DELETE_USER_FAILED:
      return {
        // loading: false,
        deletesuccess: "",
        deleteError: action.error,
        error: "",
        success: "",
        userList: [...state.userList]
      };
    // case INITIALIZE_STATE:
    //   return {
    // loading: false,
    //     deleteError: '',
    //     error: '',
    //     success: '',
    //     userList: [...state.userList],
    //   };

    // case RESET_FORM: {
    //   return initialState;
    // }
    default:
      return state;
  }
};

export default userReducer;
