import { View, Text, Dimensions, TouchableNativeFeedback } from "react-native";
import React from "react";
import { hp, wp } from "../style/Dimensions";
import { Icon } from "react-native-elements";
import { MyColors } from "../style/MyColors";
import CircularProgress from "react-native-circular-progress-indicator";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const HomeHeaderItem = ({ title, count, onSelect }) => {
  const counts =
    typeof count === "string" ? parseFloat(count.replace(/,/g, "")) : count;
  console.log(count);
  return (
    <TouchableNativeFeedback
      onPress={onSelect}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <View
        style={{
          width: wp(30),
          height: wp(30),

          //   padding: 20,
          //   marginHorizontal: 5,
          //   marginVertical: 5,
          borderRadius: 20,
          alignItems: "center",
          //   justifyContent: 'center',
          backgroundColor: "#ffffff",
          // height: screenHeight < 709 ? 90 : 120,
          // width: screenHeight < 709 ? 140 : 150,
          // marginTop: 10,
          // alignSelf: 'center',
          // justifyContent: 'center',
          // alignItems: 'center',
          // paddingHorizontal: 10,
          // backgroundColor: '#3155a5',
          // elevation: 5,
        }}
      >
        <Text
          style={{
            color: MyColors.primary,
            fontWeight: "bold",
            paddingVertical: 5,
            fontSize: 18,
          }}
        >
          {title}
        </Text>

        {/* <Text style={HomeStyle.scanButtonText}>{"Scan"}</Text> */}
        {/* <View style={HomeStyle.iconContainer}> */}
        <Ionicons
          name="qr-code-outline"
          size={responsiveFontSize(8)}
          color={MyColors.primary}
        />
        {/* </View> */}
        {/* {title == "Total Bookings" ? (
          <CircularProgress
            value={counts}
            progressValueColor={MyColors.primary}
            radius={20}
            progressValueColor={MyColors.primary}
            activeStrokeColor={MyColors.primary}
            inActiveStrokeColor={"grey"}
            titleStyle={{ fontWeight: "200" }}
            // title={'Euro'}
            // titleStyle={(fontWeight = '200')}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={10}
            activeStrokeWidth={10}
          />
        ) : (
          <CircularProgress
            title={"€"}
            titleStyle={{ fontWeight: "bold", fontSize: 17 }}
            progressValueStyle={{
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
            value={counts}
            radius={20}
            progressValueColor={MyColors.primary}
            activeStrokeColor={MyColors.primary}
            inActiveStrokeColor={"grey"}
            // titleStyle={{fontWeight: '200'}}

            // title={'KM/H'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={10}
            activeStrokeWidth={10}
          />
        )} */}
      </View>
    </TouchableNativeFeedback>
  );
};

export default HomeHeaderItem;

// const styles = StyleSheet.create({});
