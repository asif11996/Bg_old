import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScanButton from "./ScanButton";
import Header from "./Header";
import useOrientation from "./useOrientation";
import { normalize } from "react-native-elements";

const HomeHeader = ({ navigation }) => {
  const { orientation } = useOrientation();

  return (
    <View style={{ backgroundColor: "transparent", height: normalize(240) }}>
      <Header
        title={"Dashboard"}
        onBackPress={() => navigation.openDrawer()}
        onMenuPress={() => navigation.navigate("ScanScreen")}
        qr="qrcode"
      />
      <View
        style={{
          flex: orientation == "landscape" ? 0.8 : 0.4
        }}
      >
        <ScanButton
          navigation={navigation}
          buttonText="Scan"
          onPressed={() => navigation.navigate("ScanScreen")}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
