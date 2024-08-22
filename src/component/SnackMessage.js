import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Snackbar } from "react-native-paper";
import Icon from "react-native-dynamic-vector-icons";
import { useDispatch } from "react-redux";
// import {clearState} from '../store/action/scannerResponse';

import { hp } from "../style/Dimensions";
import { clearState } from "../store/action/userAction";
import {
  cleardateState,
  clear_blockDate_State
} from "../store/action/blockDate";
import {
  clearScanMessage,
  clearScanState
} from "../store/action/scannerResponse";
import { clear_booking_state } from "../store/action/booking";
import { NavigationContainer } from "@react-navigation/native";

function SnackMessage({
  success,
  visible,
  error,
  setVisibleFunction,
  navigation
}) {
  console.log("error isqweqweqw ......................", error);
  // alert(success);
  let timerID;
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    timerID = 3000;
    const clear = setTimeout(() => {
      setState(false);
      // dispatch(clearState());
      // dispatch(cleardateState());
      dispatch(clear_booking_state());

      setVisibleFunction();
      //   snackCallBack();
    }, timerID);
    return () => {
      dispatch(clearScanMessage());
      // dispatch({type: USER_REQUEST});
      dispatch(clear_booking_state());
      // dispatch(clear_blockDate_State());

      clearInterval();
      clearTimeout(clear);
      // callBackStateClearCall()
    };
  }, [success, visible, error]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setState(false);
  //     // dispatch(clearState());
  //     // setVisibleFunction();
  //   }, 3000); // 3000 milliseconds = 3 seconds

  //   return () => clearTimeout(timer); // Clear the timer if the component unmounts
  // }, []);
  return (
    <View style={{}}>
      {success || visible || error ? (
        <Snackbar
          visible={state}
          //  duration={timerID}
          style={{ backgroundColor: success ? "green" : "#d14e52" }}
          theme={{ colors: { surface: "white", accent: "red" } }}
          // onDismiss={onDismissSnackBar}
          action={{
            label: success && (
              <Icon
                color={"white"}
                name={"check"}
                type={"Entypo"}
                size={hp(3)}
                // style={{ position: "absolute" }}
                //           onPress={() => setVisible("")}
              />
            )
          }}
        >
          {success ? success : error}
        </Snackbar>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

export default SnackMessage;
