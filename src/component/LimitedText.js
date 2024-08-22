import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";

const LimitedText = ({ text, maxWords, maxLines, textStyle }) => {
  const words = text.split(" ").slice(0, maxWords).join(" ");

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <Text
        numberOfLines={maxLines}
        style={[styles.text, textStyle]}
        maxLength={20}
      >
        {words}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 16
    // Add more styles as needed
  }
});

export default LimitedText;
