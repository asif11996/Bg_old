import React, { useEffect } from "react";
import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import { MyColors } from "../style/MyColors";
// import {Icon} from 'react-native-elements';
import { wp } from "../style/Dimensions";
import { clearScanState } from "../store/action/scannerResponse";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { normalize } from "react-native-elements";

const CalendarModal = ({
  visible,
  closeModal,
  onOkPress,
  onCancelPress,
  message,
  error,
  cancel,
  heading
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearScanState());
    };
  }, []);

  console.log("message is ......", message);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalMessageContainer}>
          <View style={{ paddingTop: 20 }}>
            <MaterialCommunityIcons
              name="update"
              size={normalize(50)}
              color={MyColors.primary}
              style={{ alignSelf: "center" }}
            />
          </View>

          {/* <Icon type="FontAwesome" name="user" size={40} color={'green'} /> */}

          {/* <Text style={{color: 'grey', marginTop: 10}}> */}

          <View style={{ paddingHorizontal: 35 }}>
            <Text
              style={{
                fontSize: 18,
                // marginBottom: 20,
                textAlign: "center",
                marginTop: 10,
                color: MyColors.primary,
                fontWeight: "600"
              }}
            >
              {message.event_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                // marginBottom: 20,
                textAlign: "center",
                //   marginTop: 20,
                color: "#316c88"
                // paddingHorizontal: 35,
                // backgroundColor: "green"
                // fontWeight: "600"
              }}
            >
              {`${message.booker_name} Booked ${message.event_name} on ${message.booking_date} at ${message.booking_time}`}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  // marginBottom: 20,
                  textAlign: "center",
                  // marginTop: 20,
                  color: "#316c88",
                  fontWeight: "600"
                  // backgroundColor: "green"
                }}
              >
                {"Total Participants:"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  // marginBottom: 20,
                  textAlign: "center",
                  // marginTop: 20,
                  color: "#316c88",
                  fontWeight: "600"
                }}
              >
                {message.total_participants}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
                // backgroundColor: "green",
                // paddingHorizontal: 35
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  // marginBottom: 20,
                  textAlign: "center",
                  // marginTop: 20,
                  color: "#316c88",
                  fontWeight: "600"
                }}
              >
                {"Total Price:"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  // marginBottom: 20,
                  textAlign: "center",
                  // marginTop: 20,
                  color: "#316c88",
                  fontWeight: "600"
                }}
              >
                {message.total_price}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  // marginBottom: 20,
                  textAlign: "center",
                  // marginTop: 20,
                  color: "#316c88",
                  fontWeight: "600"
                }}
              >
                {"Waivers signed:"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  // marginBottom: 20,
                  textAlign: "center",
                  // marginTop: 20,
                  color: "#316c88",
                  fontWeight: "600"
                }}
              >
                {message.total_waiver_signed}
              </Text>
            </View>
          </View>

          {/* <Text style={styles.modalMessage}>{message}</Text> */}
          {/* </Text> */}
          <View style={{}}>
            <Pressable
              style={{
                // marginLeft: normalize(10),
                paddingVertical: normalize(8),
                width: normalize(150),

                // paddingHorizontal: 20,
                borderRadius: normalize(5),
                marginTop: normalize(15),
                backgroundColor: "#00a5cf",
                justifyContent: "center",
                alignItems: "center"
                // alignSelf: 'flex-end'}}
              }}
              onPress={onOkPress}
            >
              <Text style={styles.buttonText}>Ok</Text>
            </Pressable>

            {/* <Pressable
              style={{
                marginLeft: 10,
                paddingVertical: 7,
                width: 100,

                // paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#d9103a',

                // backgroundColor: '#00a5cf',

                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onOkPress}>
              <Text style={{color: '#d9103a', fontWeight: 'bold'}}>
                {'yes,delete'}
              </Text>
            </Pressable> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  modalContent: {
    // backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    elevation: 5
  },
  modalMessage: {
    fontSize: 15,
    // marginBottom: 20,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // paddingTop: 20,
    // backgroundColor: "green"

    // width: wp(90)
    // flex: 0.

    // justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
    paddingVertical: 7,
    width: wp(20),

    // paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
    // alignSelf: 'flex-end',
  },
  buttonOk: {
    backgroundColor: MyColors.secondary,
    justifyContents: "center",
    alignItems: "center" // Green color
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  modalMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#f2f2f2f2",
    borderRadius: 20,
    paddingVertical: 35,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default CalendarModal;
