import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/store/store";
import { Provider, useSelector } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";

function App() {
  return (
    <Provider store={store}>
      <AppWithStripe />
    </Provider>
  );
}

const AppWithStripe = () => {
  const { paymentKey } = useSelector((state) => state.bookinglist);
  return (
    <StripeProvider publishableKey={paymentKey.stripePublicKey}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
