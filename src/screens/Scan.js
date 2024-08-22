import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../style/Dimensions";
import QRCodeScanner from "react-native-qrcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

import HeaderComponent from "../component/HeaderComponent";
import handleBarCodeScanner from "../component/handleBarCodeScanner";

import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorComponent from "../component/ActivityIndicatorComponent";
import useScanResponseFunction from "../component/useScanResponseFunction";
import { MyColors } from "../style/MyColors";
import SnackMessage from "../component/SnackMessage";
import { clearScanMessage } from "../store/action/scannerResponse";
import {
  check,
  request,
  PERMISSIONS,
  openSettings
} from "react-native-permissions";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize } from "react-native-elements";
import useOrientation from "../component/useOrientation";

const Scan = ({ navigation }) => {
  let clears;
  const dispatch = useDispatch();

  //
  const { loading, data, error, success, modal } = useSelector(
    (state) => state.scannerResponse
  );
  const [userData, setuserData] = useState(data);
  const [visible, setVisible] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [errors, setErrors] = useState();
  const [scanDataState, setScanData] = useState();
  handleBarCodeScanner(scanDataState ? scanDataState : undefined);
  const [message, setMessage] = useState("");
  const [handleLoader, setHandleLoader] = useState(false);
  const { height, width } = useOrientation();

  const checkStatus = useScanResponseFunction(navigation, loading, data, error); // Call the custom hook

  console.log("width and height is .........", width, height);
  useEffect(() => {
    setuserData(data);
    checkStatus;
  }, [data]);
  useEffect(() => {
    setSuccessmsg(success);
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("DetailScreen", {
          data: data
        });
      }, 100);
      // success
      //   ? navigation.navigate("DetailScreen", {
      //       data: data
      //     })
      //   : "";
      return () => {
        clearTimeout(timer);
        setHandleLoader(false);
        setSuccessmsg("");
        dispatch(clearScanMessage());
        setVisible("");
      };
    }
  }, [success]);

  useEffect(() => {
    setErrors(error);
    setHandleLoader(false);
    return () => {
      setErrors("");
      setVisible("");
    };
  }, [error]);

  useEffect(() => {
    // Check camera permission status
    checkCameraPermission();
  }, []);

  onSuccess = (e) => {
    Linking.openURL(e.data).catch((err) =>
      console.error("An error occured", err)
    );
  };

  const handleBarCodeScanned = (item) => {
    console.log("scan data is", item.data);

    item.type != "org.iso.QRCode" || isNaN(item.data);
    // (item.type != "QR_CODE" || isNaN(item.data)) && scanner.reactivate();
    if (
      // !scanned &&
      item.type === "QR_CODE" ||
      item.type === "org.iso.QRCode"
    ) {
      setHandleLoader(true);
      setScanData(item);
    }
  };

  const setVisibleFunction = () => {
    setVisible("");
  };

  const checkCameraPermission = async () => {
    if (Platform.OS === "ios") {
      try {
        const status = await check(PERMISSIONS.IOS.CAMERA);
        if (status !== "granted") {
          requestCameraPermission();
        }
      } catch (error) {
        console.error("Error checking camera permission:", error);
      }
    } else {
      check(PERMISSIONS.ANDROID.CAMERA).then((status) => {
        if (status !== "granted") {
          requestCameraPermission();
        }
      });
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
      if (granted === "granted") {
        console.log("Camera permission is granted");
        // Permission granted, you can use the camera
      } else {
        // Permission denied
        showPermissionDeniedAlert();
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
    }
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      "Camera Permission Required",
      "Please allow camera permission in settings to use the camera.",
      [
        {
          // text: "Cancel",
          // style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => openSettings()
        }
      ]
    );
  };

  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }

  const modalToggleState = () => {
    setErrors("");
    setMessage("");
  };

  if (loading || handleLoader) {
    return <ActivityIndicatorComponent />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: MyColors.primary }}>
      <HeaderComponent
        title={
          width > height &&
          "Kindly Scan the Assigned QR code for Authentication!"
        }
        // onBackPress={() => goBack()}
        onBackPress={() =>
          navigation.navigate("HomeScreen") && dispatch(clearScanMessage())
        }
        backButtonColor={"#ffff"}
      />
      {(!!error || errors) && (
        <View style={{ marginTop: hp(3) }}>
          <SnackMessage
            // success={successmsg}
            visible={visible}
            error={error || errors}
            setVisibleFunction={setVisibleFunction}
            navigation={navigation}
          />
        </View>
      )}
      {/* <View style={{ flex: 0.5 }}></View> */}
      <View
        style={{
          flex: 4,
          // marginTop: height > width ? normalize(0) : normalize(0),
          justifyContent: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            height: height > width ? hp(65) : normalize(280),
            marginHorizontal: hp(2),
            // paddingHorizontal: wp(5),
            borderRadius: normalize(20),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {height > width && (
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                height: hp(10),
                paddingHorizontal: normalize(10)

                // backgroundColor: "green"
              }}
            >
              <Text
                style={{
                  fontSize: normalize(16),
                  color: "#000000",
                  // fontWeight: '500',
                  paddingHorizontal: wp(2),
                  textAlign: "center"
                }}
              >
                Kindly Scan the Assigned QR code for Authentication!
              </Text>
            </View>
          )}

          <View style={styles.barCodeScannerContainer}>
            <View style={styles.barCodeScannerbox}>
              <QRCodeScanner
                onRead={handleBarCodeScanned}
                containerStyle={{
                  height: normalize(250),
                  width: normalize(250),
                  alignSelf: "center"
                }}
                bottomContent={
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                  ></TouchableOpacity>
                }
              />
              <View
                style={{
                  position: "absolute",
                  height: normalize(250),
                  width: normalize(250),
                  alignSelf: "center"
                }}
              >
                <BarcodeMask
                  edgeColor="#62B1F6"
                  height={normalize(250)}
                  width={normalize(250)}
                  showAnimatedLine
                  style={{
                    height: normalize(250),
                    width: normalize(250),
                    alignSelf: "center"
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* {(!!success || !!error || loading || data) && (
        <ModalResponse
          message={success ? success : error}
          modalToggleState={modalToggleState}
        />
      )} */}
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: normalize(18),
    padding: normalize(32),
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: normalize(21),
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: normalize(16)
  },
  camera: {
    width: wp(70), // Set the desired width here
    height: hp(20) // Set the desired height here
  },
  barCodeScannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
    // overflow: 'hidden',

    // backgroundColor: '#ffffff',
    height: hp(60),
    marginHorizontal: hp(2),
    borderRadius: 20
  },
  barCodeMaintext: {
    fontSize: 16,
    margin: 0
  },
  barCodeScannerbox: {
    alignItems: "center",
    justifyContent: "center",
    height: normalize(250),
    width: normalize(250),
    overflow: "hidden"
  }
});
