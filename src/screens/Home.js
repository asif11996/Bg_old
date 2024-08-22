import React, { useEffect, useCallback } from "react";
import { View, ImageBackground, StatusBar, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import LatestBookingList from "./Booking/LatestBookingList";
import {
  fetch_AllBooking_Dashboard,
  fetchPayment_key
} from "../store/action/booking";
import HomeHeader from "../component/HomeHeader";
import { HomeStyle } from "../style/HomeStyle";
import useOrientation from "../component/useOrientation";
import { MyColors } from "../style/MyColors";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { width, height } = useOrientation();

  const fetchBookingDashboard = useCallback(async () => {
    try {
      await dispatch(fetch_AllBooking_Dashboard());
    } catch (err) {
      console.error("Error fetching booking dashboard data:", err);
    }
  }, [dispatch]);

  const fetchPayment = useCallback(async () => {
    try {
      await dispatch(fetchPayment_key());
    } catch (err) {
      console.error("Error fetching payment data:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.type === "admin") {
        await fetchBookingDashboard();
      }
      await fetchPayment();
    };

    fetchData();
  }, [fetchBookingDashboard, fetchPayment, user.type]);
  useEffect(() => {
    fetchBookingDashboard();
  }, []);

  return (
    <SafeAreaView
      style={{
        ...HomeStyle.container
        // backgroundColor:
        //   Platform.OS === "ios" ? MyColors.primary : MyColors.onPrimary
      }}
    >
      <StatusBar animated={true} backgroundColor={MyColors.primary} />
      <ImageBackground
        resizeMode="cover"
        activeOpacity={0.2}
        source={require("./../style/assets/img3.jpg")}
        style={HomeStyle.imgBackground}
      >
        <View
          style={{
            flex: width > height ? 1.3 : 0.6,
            backgroundColor: MyColors.onPrimaryContainer
          }}
        >
          <HomeHeader navigation={navigation} />
        </View>

        <View style={HomeStyle.latestBookingHeader}>
          <LatestBookingList
            title={"Latest Bookings"}
            // dataList={booking || {}}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
