import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../theme/theme";
import { FlashList } from "@shopify/flash-list";
import { ProductsDetails_Review } from "./ProductsDetails_Review";

export const ProductsPrices_Review = ({ text, products }) => {
  useEffect(() => {
    console.log("PRODUCTOS QUE ME LLEGAN DE REVIEW: - - - - -", products);
  }, []);

  return (
    <View style={styles.container}>
      {text ? <Text style={styles.title}> {text}</Text> : <></>}
      <FlashList
        data={products}
        renderItem={({ item }) => <ProductsDetails_Review item={item} />}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginBottom: 5,
    
  },
  title: {
    fontWeight: theme.fontWeight.softbold,
    fontSize: 14,
    fontFamily: "Metropolis",
    marginTop: 5,
  },
});
