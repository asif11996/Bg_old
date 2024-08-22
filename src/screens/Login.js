import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/action/authAction";
import { hp, wp } from "../style/Dimensions";
import { MyColors } from "../style/MyColors";
import ActivityIndicatorComponent from "../component/ActivityIndicatorComponent";
import SnackMessage from "../component/SnackMessage";
import { normalize } from "react-native-elements";
import useOrientation from "../component/useOrientation";
import CustomLoginInput from "../component/CustomLoginInput";
import LoginHeader from "../component/LoginHeader";
import { LoginStyle } from "../style/loginStyle";

const LoginScreen = ({ navigation }) => {
  const { loading, error, message } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [err, setErr] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useDispatch();
  const { width, height, orientation } = useOrientation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setErr(error || "");
  }, [error]);

  const loginHandler = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      setErr("Please enter the email and password");
      return;
    }
    try {
      let userData = new FormData();
      userData.append("email", email);
      userData.append("password", password);
      await dispatch(loginUser(userData));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const setVisibleFunction = () => setErr("");

  if (loading) return <ActivityIndicatorComponent />;

  return (
    <SafeAreaView style={LoginStyle.container}>
      <StatusBar animated={true} backgroundColor={MyColors.primary} />
      <View style={LoginStyle.container}>
        <LoginHeader isKeyboardVisible={isKeyboardVisible} />
        <CustomLoginInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomLoginInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isPasswordSecure}
          setIsPasswordSecure={setIsPasswordSecure}
          eyeIcon={true}
        />
        <TouchableOpacity
          onPress={loginHandler}
          style={[
            LoginStyle.loginButton,
            {
              backgroundColor: email && password ? MyColors.primary : "#999999"
            }
          ]}
          disabled={!email || !password}
        >
          <Text style={LoginStyle.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      {(message || err) && (
        <View style={LoginStyle.snackMessage}>
          <SnackMessage
            success={message}
            visible={err || error}
            error={err || error}
            setVisibleFunction={setVisibleFunction}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
