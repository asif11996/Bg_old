import { FlatList } from "react-native";
import React from "react";
import { RefreshControl } from "react-native-gesture-handler";

const GenericFlatList = ({
  contentContainerStyle,
  data,
  renderItem,
  ListEmptyComponent,
  refreshing,
  onRefresh,
  numColumns = 1,
  keyExtractor = (item, index) => index.toString()
}) => {
  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default GenericFlatList;
