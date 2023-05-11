import React from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import BriefcaseList from "./BriefcaseList";

const DATA = [
  {
    name: "Harina",
  },
  {
    name: "Avena",
  },
  {
    name: "Fideos",
  },
  {
    name: "Arrocito",
  },
];

const FlashListC = ({title}) => {
  return (
    <View style={{ flex:1, width:'90%',marginBottom:10 }}>
      <Text style={{fontWeight:theme.fontWeight.bolder,fontSize:theme.fontSize.subtitle}}>{title}</Text>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <BriefcaseList productList={item.name}/>}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
};

export default FlashListC;