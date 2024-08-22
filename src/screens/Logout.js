import { StyleSheet, Text, View, Keyboard, Alert } from "react-native";
import ActivityIndicatorComponent from "../component/ActivityIndicatorComponent";

import React, { useEffect, useState } from "react";
import { logOutUser } from "../store/action/authAction";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../store/action/scannerResponse";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state?.auth?.user);

  React.useEffect(() => {
    logoutHandler();
    // showLogoutAlert();
    // showLogoutAlert();
  }, []);
  const logoutHandler = async () => {
    console.log("lout is pressed", "");
    Keyboard.dismiss();
    let userData = new FormData();
    userData.append("user_id", userId?.id);

    try {
      // dispatch(clearState());
      await dispatch(logOutUser(userData));
      dispatch(clearState());

      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      //   dispatch(clearState());
      // setError(err.message);
      // setIsLoading(false);
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicatorComponent />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
