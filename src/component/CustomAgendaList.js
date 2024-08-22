import React from "react";
import { FlatList } from "react-native";

const CustomAgendaList = ({ renderItem, data }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()} // Adjust key extractor as needed
    />
  );
};

export default CustomAgendaList;
