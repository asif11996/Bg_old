import React, { useEffect } from "react";
import LoginStack from "./LoginStack";

import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import StartupScreen from "../screens/StartupScreen";
import DrawerNavigator from "./DrawerStack";
import { StripeProvider } from "@stripe/stripe-react-native";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state?.auth?.token);

  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  console.log("didtryAutologin in js ......", didTryAutoLogin);

  return (
    <StripeProvider>
      <NavigationContainer independent={true}>
        {isAuth && <DrawerNavigator />}
        {!isAuth && didTryAutoLogin && <LoginStack />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    </StripeProvider>
  );
};

export default AppNavigator;
