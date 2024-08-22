import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/autReducer";
import userReducer from "./reducer/userReducer";

import QRReducer from "./reducer/QRReducer";
import splashScreenFalseReducer from "./reducer/splashScreenFalseReducer";
import bookingReducer from "./reducer/bookingReducer";
import blockDateReducer from "./reducer/blockDateReducer";
import eventReducer from "./reducer/eventReducer";

// import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  scannerResponse: QRReducer,
  user: userReducer,
  bookinglist: bookingReducer,
  blockDate: blockDateReducer,
  isSplash: splashScreenFalseReducer,
  event: eventReducer

  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
