// reducers/eventReducer.js

import { PASS_EVENT_ID, CLEAR_EVENT_ID } from "../action/event";

const initialState = {
  event_ids: null
};

const eventReducer = (state = initialState, action) => {
  //   alert(action.payload);

  console.log("evernt id ...........................112266", action);
  switch (action.type) {
    case PASS_EVENT_ID:
      return {
        event_ids: action.payload
      };
    case CLEAR_EVENT_ID:
      return {
        event_ids: null
      };
    default:
      return state;
  }
};

export default eventReducer;
