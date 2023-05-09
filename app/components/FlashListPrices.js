import React from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBoxContainer from "./CheckBoxContainer";
import theme from "../theme/theme";

const DATA = [
  {
    name: "Harina Ya",
  },
  {
    name: "Harina Ya sin polvo de hornear",
  },
  {
    name: "Harina Ya con",
  },
  {
    name: "Harinas Ya",
  },
];

const FlashListPrices = () => {
  return (
    <View style={{ height: '40%', width: '90%', marginBottom:10 }}>
      <Text style={{fontWeight:theme.fontWeight.bolder,fontSize:theme.fontSize.subtitle}}>Portafolio Ideal</Text>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <CheckBoxContainer productName={item.name}/>}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
};

export default FlashListPrices;