import React, { useState, useEffect, version } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../component/HeaderComponent";
import InputTexts from "../../component/InputTexts";
import TextHeading from "../../component/TextHeading";
import { MyColors } from "../../style/MyColors";
import { normalize } from "react-native-elements";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { create_Participant } from "../../store/action/booking";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import SnackMessage from "../../component/SnackMessage";
import Buttons from "../../component/Buttons";
import useOrientation from "../../component/useOrientation";
import HeaderCircle from "../../component/HeaderCircle";

const Edit_Participant = ({ navigation, route }) => {
  const { item, update, itemId } = route.params;
  const { loading, booking, error, success } = useSelector(
    (state) => state.bookinglist
  );
  const dispatch = useDispatch();

  const [nameFields, setNameFields] = useState(item.name);
  const [surNameFields, setSurNameFields] = useState(item.sur_name);
  const [emailFields, setEmailFields] = useState(item.email);
  const [visible, setVisible] = useState("");
  const { height, width, orientation } = useOrientation();

  let clears;

  useEffect(() => {
    if (success) {
      clears = setTimeout(() => {
        navigation.navigate("Booking_Waivers", { itemId: itemId });

        // navigation.navigate("Bookinglist");
      }, 700);
    }
    return () => {
      setVisible("");

      clearInterval();
      clearTimeout(clears);

      // dispatch(clear_booking_state());
    };
  }, [success]);

  const validateEmail = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  const checkFormFieldsStatus = () => {
    // reportHandler();

    if (!nameFields) {
      return setVisible("Name is required");
    }
    if (!surNameFields) {
      return setVisible("Surname is required");
    }
    console.log("valid email is...", validateEmail(emailFields));
    if (!emailFields || !validateEmail(emailFields)) {
      return setVisible("Valid Email is required");
    }

    // Check if cardInfo is provided

    EditParticipant_Handler();

    // setVisible('');
  };
  const EditParticipant_Handler = async () => {
    dataToSend = {
      participant_id: item.id,
      name: nameFields,
      sur_name: surNameFields,
      email: emailFields // Initialize time_slots as an empty array
    };

    await dispatch(create_Participant(dataToSend, update, itemId));
  };
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

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

        <HeaderComponent
          // title={'Scan QR Code'}
          onBackPress={() =>
            navigation.navigate("Booking_Waivers", { itemId: itemId }) &&
            dispatch(clearState())
          }
        />

        <ScrollView style={{ marginBottom: normalize(10) }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(5)
              // flexDirection: "column",
              // marginBottom: 6,
              // padding: 6
              // justifyContent: "space-evenly"
              // alignItems: 'center',
              // backgroundColor: "red"
            }}
          >
            <Text
              style={{
                ...BookingStyle.headertitle,
                color: MyColors.primary,
                fontWeight: "bold",
                fontSize: responsiveFontSize(2.2)
              }}
            >
              {"Edit Participant"}
            </Text>
          </View>
          <View style={{ marginTop: hp(5) }}>
            <TextHeading title={"Name:"} />

            <InputTexts
              placeHolders={"Name"}
              keyboardTypes={"default"}
              values={nameFields}
              onChangeTexts={(text) => setNameFields(text)}
              secureTextEntries={false}
              editables={true}
              IconName={"location"}
              IconType={"EvilIcons"}
              size={hp(3.5)}
            />
          </View>
          <View style={{ marginTop: hp(1) }}>
            <TextHeading title={"Surname:"} />

            <InputTexts
              placeHolders={"Surname"}
              keyboardTypes={"default"}
              values={surNameFields}
              onChangeTexts={(text) => setSurNameFields(text)}
              secureTextEntries={false}
              editables={true}
              IconName={"location"}
              IconType={"EvilIcons"}
              size={hp(3.5)}
            />
          </View>
          <View style={{ marginTop: hp(1) }}>
            <TextHeading title={"Email:"} />

            <InputTexts
              placeHolders={"Email"}
              keyboardTypes={"default"}
              values={emailFields}
              onChangeTexts={(text) => setEmailFields(text)}
              secureTextEntries={false}
              editables={true}
              IconName={"location"}
              IconType={"EvilIcons"}
              size={hp(3.5)}
            />
          </View>

          <View
            style={{
              marginBottom: hp(1),
              marginTop: normalize(20)
            }}
          >
            <Buttons
              bg={MyColors.primary}
              heights={orientation == "landscape" ? hp(10) : hp(6)}
              widths={wp(25)}
              border={wp(1.5)}
              onPresses={() => checkFormFieldsStatus()}
              title={"Update"}
            />
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

export default Edit_Participant;

const styles = StyleSheet.create({});
