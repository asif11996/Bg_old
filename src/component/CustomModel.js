import React, { useEffect } from "react";
import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import { MyColors } from "../style/MyColors";
import { Icon } from "react-native-elements";
import { wp } from "../style/Dimensions";
import { clearScanState } from "../store/action/scannerResponse";
import { useDispatch } from "react-redux";
import { normalize } from "react-native-elements";

const CustomModal = ({
  visible,
  closeModal,
  onOkPress,
  onCancelPress,
  message,
  error,
  cancel
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearScanState());
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalMessageContainer}>
          {message ? (
            <Icon
              type="ionicon"
              name="checkmark-circle-sharp"
              size={50}
              color={"green"}
            />
          ) : (
            <Icon
              type="MaterialIcons"
              name="error"
              size={50}
              color={MyColors.primary}
            />
          )}
          <View style={{ color: "grey", marginTop: normalize(10) }}>
            <Text style={styles.modalMessage}>{message ? message : error}</Text>

            {/* <Text style={styles.modalMessage}>{message}</Text> */}
          </View>
          <View style={styles.buttonContainer}>
            {cancel && (
              <Pressable
                style={[styles.button, styles.buttonOk]}
                onPress={onCancelPress}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, styles.buttonOk]}
              onPress={onOkPress}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
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
    backgroundColor: "yellow",
    // padding: 20,
    borderRadius: 10,
    elevation: 5
  },
  modalMessage: {
    fontSize: normalize(15),
    marginBottom: normalize(20),
    // textAlign: "center"
    // backgroundColor:'red',
    marginTop: normalize(20)
  },
  buttonContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 20
    // justifyContent: 'flex-end',
  },
  button: {
    // marginLeft: 10,
    paddingVertical: 7,
    width: wp(20),

    // paddingHorizontal: 20,
    borderRadius: 5
    // marginTop: 10
    // alignSelf: 'flex-end',
  },
  buttonOk: {
    backgroundColor: MyColors.primary,
    justifyContents: "center",
    alignItems: "center" // Green color
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  modalMessageContainer: {
    // margin: normalize(20),
    backgroundColor: "#f2f2f2",
    borderRadius: normalize(20),
    padding: normalize(35),
    alignItems: "center",

    // alignItems: 'center',
    // justifyContent: "center",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: normalize(10),
      height: normalize(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default CustomModal;
