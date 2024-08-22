import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../component/HeaderComponent";
import { hp, wp } from "../../style/Dimensions";
import TextView from "../../component/TextView";
import { MyColors } from "../../style/MyColors";
import { clearState } from "../../store/action/scannerResponse";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import DownloadFile from "../../component/DownloadFile";
import { normalize } from "react-native-elements";
import useOrientation from "../../component/useOrientation";
import HeaderCircle from "../../component/HeaderCircle";

const BookingDetail = ({ navigation, route, id }) => {
  const { itemData, itemId } = route.params;
  // const { params } = route;
  // const { itemId } = params;
  const dispatch = useDispatch();

  const { booking, bookingdetail, message, error, loading } = useSelector(
    (state) => state.bookinglist
  );
  const [age, setAge] = useState();
  const { height, width } = useOrientation();

  useEffect(() => {
    const age = calculateAge(itemData?.dob);

    setAge(age);
    console.log("Age:", age);
  }, []);

  console.log("msg is =======================>", itemData);
  console.log("user data is in detail screen ...............", bookingdetail);
  // alert(itemId);

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
      (monthDiff === 0 && today.getDate() < dobDate?.getDate())
    ) {
      age--;
    }

    return age;
  };

  const detail_Handler = async () => {
    let formData = new FormData();
    // alert(itemId);
    formData.append("booking_id", itemId);

    // await dispatch(fetchBooking_Detail(formData));
  };

  useEffect(() => {
    detail_Handler();
  }, []);

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
    <SafeAreaView style={styles.container}>
      <HeaderCircle />

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() =>
          navigation.navigate("Booking_Waivers", { itemId: itemId })
        }
        // color={MyColors.primary}

        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />

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

            paddingBottom: normalize(5),
            marginTop: normalize(50)
          }}
        >
          {"Participant Details"}
        </Text>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: normalize(10) }}>
          {/* <TextHeading title={'heading'} /> */}
          <Text
            style={{
              marginHorizontal: normalize(5),
              // backgroundColor: "#121212",
              // color: "#ffffff",
              color: "#9e9e9e",

              fontWeight: "bold",
              fontSize: normalize(15),

              paddingBottom: normalize(5),
              marginTop: normalize(40)
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
                <TextView text={itemData?.name} heading={"Name:"} />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView text={itemData?.sur_name} heading={"Surname:"} />
              </View>
            </View>

            {/* <TextView text={itemData?.name} heading={'Name:'} /> */}
            <TextView text={itemData?.email} heading={"Email:"} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(55) }}>
                <TextView text={itemData?.phone} heading={"Phone:"} />
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

              // shadowColor: "#000",
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
                <TextView text={itemData?.kin_name} heading={"Kin Name:"} />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView
                  text={itemData?.kin_sur_name}
                  heading={"Kin Surname:"}
                />
              </View>
            </View>
            <TextView text={itemData?.phone} heading={"Kin Phone:"} />
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

              // shadowColor: "#000",
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
                <TextView text={itemData?.concent} heading={"Photo consent:"} />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView text={itemData?.relevant} heading={"Experience: "} />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: wp(40) }}>
                <TextView
                  text={itemData?.wavier_status}
                  heading={"Wavier Status:"}
                />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView
                  text={itemData?.completed_before}
                  heading={"Completed Before:"}
                />
              </View>
            </View>
            <View
              style={{
                width: wp(96),
                justifyContent: "center",
                alignItems: "center",
                marginTop: normalize(10)
              }}
            >
              <DownloadFile attachment={itemData?.waiver_url} data={itemData} />
            </View>

            {/* <TextView text={itemData?.name} heading={'Name:'} /> */}
            {/* <TextView text={itemData?.completed_before} heading={'Completed Before:'} /> */}
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
                  text={itemData?.booking_date}
                  heading={"Booking Date:"}
                />
              </View>
              <View style={{ width: wp(40) }}>
                <TextView text={itemData?.time_slot} heading={"Time Slot:"} />
              </View>
            </View>

            <TextView text={itemData?.status} heading={"Attendance Status:"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: hp(2)
    // padding: 16,
    // justifyContent: 'center',
  },
  textStyle: {
    height: hp(6),
    backgroundColor: "#ffffff",
    borderRadius: normalize(10),
    justifyContent: "center",
    paddingHorizontal: wp(3)
  }
});
// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const BookingDetail = () => {
//   return (
//     <View>
//       <Text>BookingDetail</Text>
//     </View>
//   );
// };

// export default BookingDetail;

// const styles = StyleSheet.create({});
