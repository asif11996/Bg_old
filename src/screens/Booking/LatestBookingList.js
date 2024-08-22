import React, { useState } from "react";
import { Alert, View } from "react-native";
import { fetch_AllBooking_Dashboard } from "../../store/action/booking";
import { useDispatch, useSelector } from "react-redux";
import useOrientation from "../../component/useOrientation";
import ActivityIndicatorComponent from "../../component/ActivityIndicatorComponent";
import { HomeStyle } from "./../../style/HomeStyle";
import Heading from "../../component/Heading";
import HomeCard from "../../component/HomeCard";
import GenericFlatList from "../../component/GenericFlatList";
import ListEmptyComponent from "../../component/ListEmptyComponent";
import { hp, wp } from "../../style/Dimensions";

const LatestBookingList = ({ props, title, dataList }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { height, orientation } = useOrientation();
  const { loading, loader, booking, allBooking } = useSelector(
    (state) => state.bookinglist
  );
  const { loadings } = useSelector((state) => state.blockDate);

  const update_BookingHandler = async () => {
    await dispatch(fetch_AllBooking_Dashboard());
  };
  const onRefresh = () => {
    setRefreshing(true);
    update_BookingHandler();

    setRefreshing(false);
  };
  // alert(loader);

  return loader ? (
    <ActivityIndicatorComponent />
  ) : (
    <View
      style={{
        ...HomeStyle.container,
        paddingBottom: orientation == "landscape" ? hp(0) : hp(0)
      }}
    >
      <View>
        <Heading title={title} />

        <GenericFlatList
          contentContainerStyle={{ paddingBottom: hp(5) }}
          data={allBooking?.bookings}
          renderItem={({ item }) => <HomeCard item={item} />}
          ListEmptyComponent={() => <ListEmptyComponent />}
          refreshing={refreshing}
          onRefresh={onRefresh}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default LatestBookingList;
