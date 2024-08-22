import React, { useState, useEffect, version, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../component/HeaderComponent";
import InputTexts from "../../component/InputTexts";
import TextHeading from "../../component/TextHeading";
import { MyColors } from "../../style/MyColors";
import { CheckBox, normalize } from "react-native-elements";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import DeepLinking from "react-native-deep-linking";

import {
  CardField,
  CardFieldInput,
  confirmPayment,
  createPaymentMethod,
  useStripe,
  createPaymentIntent,
  handleCardAction,
  initStripe
} from "@stripe/stripe-react-native";
import {
  clear_booking_state,
  create_Participant,
  create_token_failure,
  fetch_booking_Request
} from "../../store/action/booking";

import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import SnackMessage from "../../component/SnackMessage";
import Buttons from "../../component/Buttons";
import useOrientation from "../../component/useOrientation";

import validator from "validator";
import { ActivityIndicator } from "react-native-paper";
import CreatePaymentIntents from "../../component/CreatePaymentIntent";
import HeaderCircle from "../../component/HeaderCircle";
import { hp } from "../../style/Dimensions";

const ParticipantForm = ({ route, navigation }) => {
  // Destructure the params object to get itemId
  const { params } = route;
  const { itemId, BookingDetails, event_id } = params;
  const { handleURLCallback } = useStripe();

  // Now you can use itemId
  // alert(itemId);

  console.log("booking details is .........", BookingDetails.unit_price);

  const { loading, booking, paymentKey, error, success } = useSelector(
    (state) => state.bookinglist
  );

  const [numParticipants, setNumParticipants] = useState("1");
  const [emailFields, setEmailFields] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cardInfo, setCardInfo] = useState(null);
  const [visible, setVisible] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(null);
  const [stripeToken, setStripeToken] = useState(null);
  const [withemails, setwithEmails] = useState(true);
  const [withPayments, setwithPayments] = useState(true);
  const [withoutPayments, setwithoutPayments] = useState(false);

  const [disableButton, setDisableButton] = useState(false);

  const [withoutEmails, setwithoutEmails] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [handleLoader, setHandleLoader] = useState(false);
  const { height, width, orientation } = useOrientation();

  const dispatch = useDispatch();
  let clears;
  let update = false;

  // console.log("success msg is paymentKey ........", paymentKey.stripePublicKey);

  // alert(Booking_id);
  // console.log('booking id is ............', BookingId);

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/payment-sheet`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   const { paymentIntent, ephemeralKey, customer } = await response.json();

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer
  //   };
  // };

  useEffect(() => {
    updateFieldsAndTotal();
  }, [numParticipants]);

  const updateFieldsAndTotal = () => {
    const participants = parseInt(numParticipants, 10) || 0;
    setTotalAmount(participants * BookingDetails.unit_price);

    // const emailFieldsArray = Array.from(
    //   { length: participants },
    //   (_, index) => ({
    //     id: index + 1,
    //     email: ""
    //   })
    // );
    // setEmailFields(emailFieldsArray);
  };

  const handleEmailChange = (id, newEmail) => {
    setEmailFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, email: newEmail } : field
      )
    );
  };
  useEffect(() => {
    return () => {
      setVisible("");
      // dispatch(clear_booking_state());
    };
  }, []);

  useEffect(() => {
    if (success) {
      setSnackbarMessage(success);
      clears = setTimeout(() => {
        navigation.navigate("Booking_Waivers", {
          itemId: itemId,
          event_id: event_id
        });
      }, 1100);
    } else if (error !== "") {
      setSnackbarError("Error  in Creating block date");
      // setSnackbarMessage('Error deleting');
    }
    return () => {
      setVisible("");

      clearInterval();
      clearTimeout(clears);
      // dispatch(resetForm());
    };
  }, [success, error]);

  console.log(
    "participant form is ",
    numParticipants,
    emailFields,
    totalAmount
  );

  const bookingHandler = async (stripeToken) => {
    // console.log("email fields is .........", emailFields);
    // await createTokens();
    let formData = new FormData();

    formData.append("booking_id", itemId);
    formData.append("new_participants", numParticipants);

    if (withPayments) {
      formData.append("stripeToken", stripeToken);
      formData.append("total_price", totalAmount);
    }

    // if (withemails) {
    //   const participantEmails = emailFields.map((field) => field.email);
    //   formData.append("participant_emails", JSON.stringify(participantEmails));
    // }

    console.log("form data is .......", formData);

    await dispatch(create_Participant(formData, update, itemId));
  };
  // const renderEmailFields = () => {
  //   return emailFields.map((field) => (
  //     <View style={{ marginTop: hp(2) }}>
  //       <TextHeading title={`Email for Participant ${field.id} `} />

  //       <InputTexts
  //         // key={field.id}
  //         placeHolders={`Email for Participant ${field.id}`}
  //         keyboardTypes={"default"}
  //         values={field.email}
  //         onChangeTexts={(text) => handleEmailChange(field.id, text)}
  //         secureTextEntries={false}
  //         editables={true}
  //         IconName={"location"}
  //         IconType={"EvilIcons"}
  //         size={hp(3.5)}
  //       />
  //     </View>
  //   ));
  // };

  const handlePaymentResponse = async () => {
    try {
      setHandleLoader(true);
      const result = await CreatePaymentIntents({
        BookingDetails,
        cardInfo,
        paymentKey,
        totalAmount
      });
      Keyboard.dismiss();

      if (result.error) {
        throw new Error(`Error creating payment intent: ${result.error}`);
      } else {
        const { paymentIntentData, confirmPaymentIntent } = result;
        const paymentIntent = confirmPaymentIntent.paymentIntent; // Extracting paymentIntent object

        console.log(
          "paymentintent and confirmpayment",
          paymentIntent,
          paymentIntent.status
        );

        setHandleLoader(false);
        Keyboard.dismiss();

        if (paymentIntent && paymentIntent.status === "Succeeded") {
          bookingHandler(paymentIntentData.id);
          console.log("PaymentIntent data:", paymentIntentData);
          console.log("Confirm payment intent:", confirmPaymentIntent);
        } else {
          throw new Error("Payment confirmation failed");
        }
      }
    } catch (error) {
      setHandleLoader(false);
      // console.error("Unexpected error:", error);
      if (error.response && error.response.data) {
        setVisible(`Error: ${error.response.data.error.message}`);
      } else {
        setVisible("Transaction Failed.Please try again.");
      }
      // Show an alert for the error
      // Alert.alert("Payment Error", error.message);
    }
  };

  const validateEmail = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  useEffect(() => {
    // updateFieldsAndTotal();
    // updateButtonDisabledState();
    if ((!cardInfo && withPayments) || handleLoader) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }

    // Call the function to update the button disabled state
  }, [numParticipants, withemails, withPayments, emailFields, cardInfo]);
  // alert(disableButton);
  const checkFormFieldsStatus = async () => {
    // reportHandler();
    Keyboard.dismiss();
    console.log("times is ....", emailFields.length, cardInfo);
    const specialCharRegex = /^[!@#$%^&*(),.?":{}|<>~[\]\\;'+=_-]+$/;

    // if (
    //   !numParticipants ||
    //   numParticipants == 0 ||
    //   numParticipants < 1 ||
    //   numParticipants > 30
    // ) {
    //   return setVisible("Minimum one and Maximum 30 Participant is required");
    // }

    // if (!numParticipants) {
    //   return setVisible("Participant is required");
    // } else if (specialCharRegex.test(numParticipants)) {
    //   return setVisible(
    //     "Invalid input. Please enter a valid number of participants."
    //   );
    // } else if (numParticipants < 1) {
    //   return setVisible("Minimum one participant is required");
    // } else if (numParticipants > 30) {
    //   return setVisible("Maximum 30 participants are required");
    // }
    if (!numParticipants) {
      return setVisible("Participant is required");
    } else if (!/^\d+$/.test(numParticipants)) {
      return setVisible(
        "Invalid input. Please enter a valid number of participants."
      );
    } else if (numParticipants < 1) {
      return setVisible("Minimum one participant is required");
    } else if (numParticipants > 100) {
      return setVisible("Maximum 100 participants are required");
    }

    // if (!numParticipants) {
    //   return setVisible("Participant is required");
    // } else if (numParticipants < 1) {
    //   return setVisible("Minimum one participant is required");
    // } else if (numParticipants > 30) {
    //   return setVisible("Maximum 30 participants are required");
    // }

    // if (
    //   (withemails && !emailFields.length) ||
    //   (withemails &&
    //     emailFields.some(
    //       (field) => !field.email || !validateEmail(field.email)
    //     ))
    // ) {
    //   return setVisible("Correct Email is required");
    // }
    if (
      withPayments &&
      (!cardInfo || (Object.keys(cardInfo).length === 0 && withPayments))
    ) {
      return setVisible("Payment Information is required");
    }
    // await dispatch(fetch_booking_Request());
    Keyboard.dismiss();

    if (withPayments) {
      Keyboard.dismiss();

      await handlePaymentResponse();
    } else {
      bookingHandler("");
    }

    // Check if there is at least one email field and each email field has a value
    // if (!emailFields.length || emailFields.some(field => !field.email)) {
    //   return setVisible('Email is required');
    // }

    // Check if cardInfo is provided

    // setVisible('');
  };
  const withEmail = () => {
    setwithEmails(!withemails);
    // setwithoutEmails(!withoutEmails);
  };
  const withPayment = () => {
    setwithPayments(!withPayments);
    setwithoutPayments(!withoutPayments);
  };
  const withoutPayment = () => {
    setwithPayments(!withPayments);
    setwithoutPayments(!withoutPayments);
  };

  const fetchCardDetail = (cardDetail) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

  console.log("orientation...", orientation);
  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider
        style={{
          flex: 1,
          backgroundColor: "#f2f2f2",
          paddingTop: hp(1),
          paddingHorizontal: wp(2)
        }}
      >
        <HeaderCircle />

        {/* <View
          style={{
            height: normalize(height > 1000 ? 250 : 190),
            width: normalize(height > 1000 ? 250 : 190),
            backgroundColor: MyColors.primary,
            borderRadius: normalize(height > 1000 ? 125 : 95),

            position: "absolute",
            top: 0,
            left: -normalize(height > 1000 ? 105 : 80),
            top: -normalize(height > 1000 ? 105 : 80)
          }}
        ></View> */}
        <HeaderComponent
          // title={'Scan QR Code'}
          onBackPress={() =>
            navigation.navigate("Booking_Waivers", { itemId: itemId }) &&
            dispatch(clearState())
          }
          // onBackPress={() => props.navigation.goBack() && dispatch(clearState())}
          // onMenuPress={() => navigation.navigate('DetailScreen')}
        />
        {/* <View
        style={{
          flexDirection: "column",
          marginBottom: 6,
          padding: 6,
          justifyContent: "space-evenly"
          // alignItems: 'center',
          // backgroundColor: "red"
        }}
      >
        <Text style={BookingStyle.headertitle}>{"Add Participant"}</Text>
      </View> */}

        {/* <View
        style={{
          flexDirection: 'column',
          marginBottom: 6,
          padding: 6,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Text style={BookingStyle.headertitle}>{'Booking'}</Text>
      </View> */}
        <View style={{ height: normalize(60) }}></View>
        <ScrollView style={{ marginBottom: normalize(10) }}>
          <View style={{ marginTop: hp(5) }}>
            <TextHeading title={"Number of Participants:"} />

            <InputTexts
              placeHolders={"Enter number of participants"}
              keyboardTypes={"number-pad"}
              values={numParticipants}
              onChangeTexts={(text) => setNumParticipants(text)}
              secureTextEntries={false}
              editables={true}
              IconName={"location"}
              IconType={"EvilIcons"}
              size={hp(3.5)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRadius: normalize(10),
              justifyContent: "space-evenly",
              marginTop: normalize(10)
            }}
          >
            <CheckBox
              center
              title="With Payments"
              checked={withPayments}
              onPress={withPayment}
              textStyle={{ fontSize: responsiveFontSize(1.7) }}
              size={normalize(25)}
            />
            <CheckBox
              center
              title="Without Payments"
              checked={withoutPayments}
              textStyle={{ fontSize: responsiveFontSize(1.7) }}
              onPress={withoutPayment}
              size={normalize(25)}
            />
          </View>

          {/* {withemails ? renderEmailFields() : ""} */}
          {/* {renderEmailFields()} */}
          {withPayments ? (
            <>
              <Text style={styles.label}>Total Amount: €{totalAmount}</Text>
              <View
                style={{
                  flex: 1
                  // justifyContent: "center",
                  // alignItems: "center"
                }}
                // Adjust as needed
              >
                <CardField
                  postalCodeEnabled={false}
                  placeholders={{
                    number: "4242 4242 4242 4242"
                  }}
                  autofocus={false}
                  cardStyle={{
                    backgroundColor: "#E2E1E1",
                    borderRadius: normalize(1.5)
                  }}
                  style={{ ...styles.cardField, height: normalize(40) }}
                  onCardChange={(cardDetails) => {
                    // Handle card details change
                    fetchCardDetail(cardDetails);

                    // setCardInfo(cardDetails);

                    // console.log("cardDetails", cardDetails);
                  }}
                  onFocus={(focusedField) => {
                    // Handle focus change
                    console.log("focusField", focusedField);
                  }}
                />
              </View>
            </>
          ) : (
            ""
          )}
          <View
            style={{
              marginBottom: hp(1),
              marginTop: normalize(20)
            }}
          >
            {/* <Buttons
            bg={cardInfo ? MyColors.primary : "#cccbc8"}
            heights={hp(6)}
            widths={wp(25)}
            border={wp(1.5)}
            onPresses={() => checkFormFieldsStatus()}
            title={"Add"}
            disable={cardInfo ? false : true}
          /> */}
            {disableButton ? (
              <TouchableOpacity
                // activeOpacity={0.7}
                style={{
                  // backgroundColor: handleLoader
                  //   ? "#cccbc8"
                  //   : cardInfo
                  //   ? MyColors.primary
                  //   : "#cccbc8",
                  backgroundColor: disableButton ? "#cccbc8" : MyColors.primary,
                  height: width > height ? hp(10) : hp(6),
                  width: wp(25),
                  borderRadius: wp(1.5),
                  justifyContent: "center",
                  alignItems: "center"
                }}

                // onPress={onPresses}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: normalize(13),
                    fontWeight: "700"
                  }}
                >
                  {"Add"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                // activeOpacity={0.7}
                style={{
                  backgroundColor: disableButton ? "#cccbc8" : MyColors.primary,
                  height: width > height ? hp(10) : hp(6),
                  width: wp(25),
                  borderRadius: wp(1.5),
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => checkFormFieldsStatus()}
              >
                {handleLoader || loading ? (
                  <ActivityIndicator animating={true} color={"#ffffff"} />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: normalize(13),
                      color: "white",
                      fontWeight: "700"
                    }}
                  >
                    {"Add"}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* <Button title="Submit" onPress={() => createTokens()} /> */}
        </ScrollView>
        {(!!visible || !!success || !!error) && (
          <View style={{ marginTop: hp(0) }}>
            <SnackMessage
              success={success}
              visible={visible}
              error={error || visible}
              setVisibleFunction={() => setVisible("")}
            />
          </View>
        )}
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default ParticipantForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(16)
  },
  label: {
    fontSize: normalize(16),
    fontWeight: "bold",
    marginTop: normalize(10),
    color: "grey",
    paddingVertical: normalize(10)
  },
  input: {
    height: normalize(90),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: normalize(10),
    padding: normalize(8)
  },
  cardField: {
    width: "99%",
    color: "red",
    marginVertical: normalize(10)
  }
});
