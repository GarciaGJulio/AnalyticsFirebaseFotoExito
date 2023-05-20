import React from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBoxContainer from "./CheckBoxContainer";
import theme from "../theme/theme";
import CheckBoxContainerV2 from "./CheckBoxContainerV2";

const FlashListPrices = ({ title, products, setProducts }) => {
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
            item={item}
          />
        )}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FlashListPrices;
