import { Alert } from "react-native";

// actions/event.js

export const PASS_EVENT_ID = "PASS_EVENT_ID";
export const CLEAR_EVENT_ID = "CLEAR_EVENT_ID";

export const setEventId_Action = (eventId) => {
  return {
    type: PASS_EVENT_ID,
    payload: eventId
  };
};

export const clearEventId_Action = () => {
  return {
    type: CLEAR_EVENT_ID
  };
};
