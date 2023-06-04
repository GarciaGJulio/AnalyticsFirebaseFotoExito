import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBoxContainer from "./CheckBoxContainer";
import theme from "../theme/theme";
import { CheckBoxContainerP } from "./CheckBoxContainerP";

export const FlashListPromos = ({ data, setData }) => {
  useEffect(() => {
    console.log("ESTO LLEGA DE PROMOS DE LISTA: ", data);
  }, []);
  return (
    <View style={{ flex: 1, width: "90%" }}>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <CheckBoxContainerP
            productName={item.name}
            item={item}
            //data={data}
            setData={setData}
          />
        )}
        //estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
