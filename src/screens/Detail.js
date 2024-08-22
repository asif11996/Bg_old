import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../component/HeaderComponent";
// import { hp, wp } from "../style/Dimensions";
import { Text } from "react-native-paper";
import TextHeading from "../component/TextHeading";
import TextView from "../component/TextView";
import { useDispatch } from "react-redux";

import {
  bookingStatus,
  clearScanData,
  clearScanState,
  userInfo
} from "../store/action/scannerResponse";
import { useSelector } from "react-redux";
import ActivityIndicatorComponent from "../component/ActivityIndicatorComponent";
import SnackMessage from "../component/SnackMessage";
import handleBarCodeScanner from "../component/handleBarCodeScanner";
import { MyColors } from "../style/MyColors";
import ModalResponse from "../component/ModalResponse";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
import CustomModal from "../component/CustomModel";
import FontAwesome6 from "react-native-vector-icons/MaterialIcons";
import BookingStyle from "../style/BookingStyle";
import DownloadFile from "../component/DownloadFile";
import { normalize } from "react-native-elements";
import useOrientation from "../component/useOrientation";
import HeaderCircle from "../component/HeaderCircle";

const Detail = ({ navigation, route }) => {
  const { loading, data, message, msg_error } = useSelector(
    (state) => state.scannerResponse
  );

  // const {msg} = useSelector(state => state.scannerResponse);
  // const {data} = route.params;

  const [userData, setUserData] = useState(data?.waiver);
  const [age, setAge] = useState();

  // const [userStatus, setUserStatus] = useState(msg);
  const [visible, setVisible] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = useOrientation();

  const [errors, setError] = useState(msg_error);

  console.log("msg is  ...............mn userData", userData);
  // alert(message)
  // alert(msg_error);

  const calculateAge = (dob) => {
    const dobParts = dob?.split("-");
    const dobDate = new Date(
      parseInt(dobParts[2]),
      parseInt(dobParts[1]) - 1,
      parseInt(dobParts[0])
    ); // Year, Month (zero-based), Day
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  console.log(
    "Date of birth is  ...............1122233   *******",
    userData?.dob
  );

  console.log(
    "user data is in detail screen ...............",
    userData?.public_code
  );

  useEffect(() => {
    const age = userData?.dob ? calculateAge(userData?.dob) : "";

    setAge(age);
    console.log("Age:", age);
  }, []);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userInfo()).catch(error => {
  //     console.error('API Error:', error);
  //   });
  // }, []);

  useEffect(() => {
    if (message || msg_error) {
      openModal();
      // setTimeout(function () {
      //   navigation.navigate('HomeScreen');
      // }, 2000);
      // dispatch(clearState());
      // clearStates();
    }
  }, [message, msg_error]);

  const bookingHandler = () => {
    // let formData = new ForalermData();
    // alert(data.public_code);
    // formData.append('status', 'attended');
    // formData.append('member_id', data?.id);
    // Alert(data.id);
    const requestData = {
      public_code: userData?.public_code,
      status: "attended"
    };

    dispatch(bookingStatus(requestData)).catch((error) => {
      console.error("API Error:", error);
    });
  };

  useEffect(() => {
    return () => {
      clearStates();
      // dispatch(clearState());
    };
  }, []);
  const clearStates = async () => {
    await dispatch(clearScanState());
  };

  const setVisibleFunction = () => {
    setVisible("");
  };

  const modalToggleState = () => {
    setError("");
    setMessage("");
  };

  console.log(data);
  // if (loading) {
  //   return <ActivityIndicatorComponent />;
  // }{}
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOkPress = () => {
    // Handle OK button press
    navigation.navigate("ScanScreen");

    console.log("OK Pressed");
    closeModal();
  };

  const handleCancelPress = () => {
    // Handle Cancel button press
    console.log("Cancel Pressed");
    closeModal();
  };
  function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  function hp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  const handleDownload = () => {
    // Do something when download button is pressed
    console.log("Download button pressed");
  };

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <HeaderCircle /> */}
      {/* <View
        style={{
          height: normalize(220),
          width: normalize(220),
          backgroundColor: MyColors.primary,
          borderRadius: normalize(110),
          position: "absolute",
          top: 0,
          left: -80,
          top: -80
        }}
      ></View> */}

      <HeaderComponent
        // title={'Booking Details'}
        onBackPress={
          () => navigation.goBack()
          // navigation.navigate("HomeScreen") && dispatch(clearScanState())
        }
        color={null}
        qr="qrcode"
        data={"data"}

        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />
      {/* {(success || error) && (
        <View style={{marginTop: hp(3)}}>
          <SnackMessage
            success={success}
            visible={visible}
            error={error}
            setVisibleFunction={setVisibleFunction}
          />
        </View>
      )} */}
      <View style={{ paddingHorizontal: normalize(10), alignItems: "center" }}>
        {/* <TextHeading title={'heading'} /> */}
        <Text
          style={{
            marginHorizontal: normalize(5),
            // backgroundColor: "#121212",
            // color: "#ffffff",
            color: MyColors.primary,

            fontWeight: "bold",
            fontSize: normalize(18),

            paddingBottom: normalize(15),
            marginTop: normalize(40)
          }}
        >
          {data?.event_name}
          {/* {"Participant Details"} */}
        </Text>
      </View>

      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>
          {/* <TextHeading title={'heading'} /> */}
          <Text
            style={{
              marginHorizontal: normalize(5),
              // backgroundColor: "#121212",
              color: "#9e9e9e",
              fontWeight: "bold",
              fontSize: normalize(15),

              paddingBottom: normalize(5)
            }}
          >
            {"Personal Details"}
          </Text>

          <View
            style={{
              marginBottom: normalize(8),
              backgroundColorL: "green",
              paddingVertical: normalize(10),
              paddingHorizontal: normalize(10),

              // marginHorizontal: 8,
              height: normalize(230),
              width: wp(96),
              alignSelf: "center",
              backgroundColor: "white",
              // alignItem s: 'center',
              borderRadius: 8,
              shadowColor: "grey",
              // shadowColor: "black",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 5
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(40) }}>
                <TextView text={userData?.name} heading={"Name:"} />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView text={userData?.sur_name} heading={"Surname:"} />
              </View>
            </View>

            {/* <TextView text={userData?.name} heading={'Name:'} /> */}
            <TextView text={userData?.email} heading={"Email:"} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(55) }}>
                <TextView text={userData?.phone} heading={"Phone:"} />
              </View>
              <View style={{ width: wp(30) }}>
                <TextView text={age + " years"} heading={"Age:"} />
              </View>
            </View>
          </View>
          <Text
            style={{
              marginHorizontal: 5,
              // backgroundColor: "#121212",
              color: "#9e9e9e",
              fontWeight: "bold",
              fontSize: normalize(15),

              paddingBottom: normalize(5)
            }}
          >
            {"Kin Details"}
          </Text>

          <View
            style={{
              marginBottom: normalize(8),
              backgroundColorL: "green",
              paddingVertical: normalize(10),
              paddingHorizontal: normalize(10),

              // marginHorizontal: 8,
              height: normalize(160),
              width: wp(96),
              alignSelf: "center",
              backgroundColor: "white",
              // alignItem s: 'center',
              borderRadius: 8,
              shadowColor: "grey",
              // shadowColor: "black",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 5
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(40) }}>
                <TextView text={userData?.kin_name} heading={"Kin Name:"} />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView
                  text={userData?.kin_sur_name}
                  heading={"Kin Surname:"}
                />
              </View>
            </View>
            <TextView text={userData?.phone} heading={"Kin Phone:"} />

            {/* <TextView text={userData?.name} heading={'Name:'} /> */}
            {/* <TextView text={userData?.email} heading={'Email:'} /> */}

            {/* <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                     <View style={{width:wp(55)}}>

                     <TextView text={userData?.phone} heading={'Kin Phone:'} />

                     </View>
                     <View style={{width:wp(30)}}>

                     <TextView text={userData?.dob} heading={'Date of Birth:'} />

                     </View>

              </View> */}
          </View>
          <Text
            style={{
              marginHorizontal: 5,
              // backgroundColor: "#121212",
              color: "#9e9e9e",
              fontWeight: "bold",
              fontSize: normalize(15),

              paddingBottom: normalize(5)
            }}
          >
            {"Waiver Details"}
          </Text>
          <View
            style={{
              marginBottom: normalize(8),
              backgroundColorL: "green",
              paddingVertical: normalize(10),
              paddingHorizontal: normalize(10),

              // marginHorizontal: 8,
              height: normalize(210),
              width: wp(96),
              alignSelf: "center",
              backgroundColor: "white",
              // alignItem s: 'center',
              borderRadius: 8,
              shadowColor: "grey",
              // shadowColor: "black",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 5
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(40) }}>
                <TextView text={userData?.concent} heading={"Photo consent:"} />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView text={userData?.relevant} heading={"Experience: "} />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(40) }}>
                <TextView
                  text={userData?.wavier_status}
                  heading={"Wavier Status:"}
                />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView
                  text={userData?.completed_before}
                  heading={"Completed Before:"}
                />
              </View>
            </View>
            <View
              style={{
                width: wp(90),
                justifyContent: "center",
                alignItems: "center",
                marginTop: normalize(10)
              }}
            >
              <DownloadFile attachment={userData?.waiver_url} data={userData} />
            </View>

            {/* <TextView text={userData?.name} heading={'Name:'} /> */}
            {/* <TextView text={userData?.completed_before} heading={'Completed Before:'} /> */}
          </View>
          <Text
            style={{
              marginHorizontal: 5,
              // backgroundColor: "#121212",
              color: "#9e9e9e",
              fontWeight: "bold",
              fontSize: 15,

              paddingBottom: 5
            }}
          >
            {"Booking Details"}
          </Text>
          <View
            style={{
              marginBottom: normalize(8),
              backgroundColorL: "green",
              paddingVertical: normalize(10),
              paddingHorizontal: normalize(10),

              // marginHorizontal: 8,
              height: normalize(160),
              width: wp(96),
              alignSelf: "center",
              backgroundColor: "white",
              // alignItem s: 'center',
              borderRadius: normalize(8),
              shadowColor: "grey",
              // shadowColor: "black",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 5
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(40) }}>
                <TextView
                  text={userData?.booking_date}
                  heading={"Booking Date:"}
                />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView text={userData?.time_slot} heading={"Time Slot:"} />
              </View>
            </View>
            {/* <View style={{flexDirection:'row',justifyContent:'space-evenly'}}> */}
            {/* <View style={{width:wp(40)}}>

                     <TextView text={userData?.status} heading={'Status:'} />

                     </View> */}
            {/* <View style={{width:wp(40)}}>

                     <TextView text={userData?.created_at} heading={'Created at:'} />

                     </View> */}
            {/* </View> */}
            <TextView text={userData?.status} heading={"Attendance Status:"} />

            {/* <TextView text={userData?.name} heading={'Name:'} /> */}
            {/* <TextView text={userData?.email} heading={'Email:'} /> */}

            {/* <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                     <View style={{width:wp(55)}}>

                     <TextView text={userData?.phone} heading={'Kin Phone:'} />

                     </View>
                     <View style={{width:wp(30)}}>

                     <TextView text={userData?.dob} heading={'Date of Birth:'} />

                     </View>

              </View> */}
          </View>

          {/* <TextView text={userData?.phone} heading={'Phone:'} />
          <TextView text={userData?.dob} heading={'Date of Birth:'} />

          <TextView text={userData?.kin_name} heading={'Kin Name:'} />
          <TextView text={userData?.kin_phone} heading={'Kin Phone:'} />

          <TextView text={userData?.age} heading={'Age:'} />

          <TextView text={userData?.concent} heading={'Photo concent:'} />

          <TextView text={userData?.relevant} heading={'Experience '} /> */}
          {/* <TextView text={userData?.name} heading={'Public code'} /> */}

          {/* <TextView text={'hohn12@gmail.com'} heading={'Member Type'} /> */}
        </View>

        <TouchableOpacity
          onPress={() => bookingHandler()}
          style={{
            height: width > height ? hp(10) : hp(6),
            width: width > height ? wp(65) : wp(65),
            marginBottom: hp(5),

            backgroundColor: MyColors.primary,
            shadowColor: MyColors.primary,
            borderRadius: normalize(10),
            shadowOffset: {
              width: 0,
              height: 4
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: normalize(20)
          }}
        >
          <Text
            style={{
              color: "#ffff",
              fontSize: normalize(14),
              fontWeight: "bold"
            }}
          >
            Check In
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <TouchableOpacity onPress={handleDownload} style={{...BookingStyle.add,height:50,width:50,borderRadius:25,backgroundColor:MyColors.primary,justifyContent:'center',alignItems:'center'}}>

          <FontAwesome6 name="picture-as-pdf" size={30} color={'#ffffff'} />
      </TouchableOpacity> */}
      {/* <DownloadFile attachment={userData?.waiver_url} handleDownloads={handleDownload} /> */}
      {(!!message || !!msg_error) && (
        <CustomModal
          visible={modalVisible}
          closeModal={closeModal}
          onOkPress={handleOkPress}
          onCancelPress={handleCancelPress}
          message={message}
          error={msg_error}
          cancel={null}
        />
      )}
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginBottom: hp(2)
    // padding: 16,
    // justifyContent: 'center',
  },
  textStyle: {
    // height: hp(6),
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center"
    // paddingHorizontal: wp(3)
  }
});
