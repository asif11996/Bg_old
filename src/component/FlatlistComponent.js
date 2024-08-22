import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GenericFlatList from "./GenericFlatList";

const FlatlistComponent = ({
  data,
  renderItem,
  ListEmptyComponent,
  refreshing,
  onRefresh
}) => {
  return (
    <GenericFlatList
      contentContainerStyle={{
        alignItems: "center",
        padding: 20,
        paddingBottom: 30
        // backgroundColor: "green"
      }}
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default FlatlistComponent;

const styles = StyleSheet.create({});
