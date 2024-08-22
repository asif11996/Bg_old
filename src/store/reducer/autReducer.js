import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_DID_TRY_AL
} from "../action/authAction";

const initialState = {
  token: null,
  user: null,
  message: "",
  error: null,
  loading: false,
  didTryAutoLogin: false
};

const authReducer = (state = initialState, action) => {
  // console.log(
  //   'Auth reducer api data is ......',
  //   action.token,
  //   action.user,
  //   action.message,
  // );
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state
        // loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
        message: action.message,

        error: null
        // loading: false,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload
        // loading: false,
      };
    case LOGOUT:
      return {
        token: null,
        user: null,
        message: "",
        error: null,
        // loading: false,
        didTryAutoLogin: false
      };
    default:
      return state;
  }
};

export default authReducer;
