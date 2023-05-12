import React from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBoxContainer from "./CheckBoxContainer";
import theme from "../theme/theme";
import CheckBoxContainerP from "./CheckBoxContainerP";

const DATA = [
  {
    name: "Exhibidor 1",
  },
  {
    name: "Exhibidor 2",
  },
  {
    name: "Exhibidor 3",
  },
  {
    name: "Exhibidor 4",
  },
];

const FlashListPromos = ({title}) => {
  return (
    <View style={{ flex:1, width:'90%' }}>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <CheckBoxContainerP productName={item.name}/>}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
};

export default FlashListPromos;