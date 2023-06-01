import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBoxContainer from "./CheckBoxContainer";
import theme from "../theme/theme";
import { CheckBoxContainerV2 } from "./CheckBoxContainerV2";

export const FlashListPrices = ({
  title,
  products,
  setProducts,
  idPreciador,
  idPortafolio,
}) => {
  useEffect(() => {
    console.log(
      "ESTO LLEGA DE LA PANTALLA PRECIOS: ",
      idPreciador + " " + " " + idPortafolio
    );
  }, []);
  return (
    <View style={{ flex: 1, width: "90%", marginBottom: 10 }}>
      <Text
        style={{
          fontWeight: theme.fontWeight.bolder,
          fontSize: theme.fontSize.subtitle,
        }}
      >
        {title}
      </Text>
      <FlashList
        data={products}
        renderItem={({ item }) => (
          <CheckBoxContainerV2
            productName={item.name}
            products={products}
            setProducts={setProducts}
            idPreciador={idPreciador}
            idPortafolio={idPortafolio}
            item={item}
          />
        )}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

