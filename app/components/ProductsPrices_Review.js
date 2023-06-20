import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../theme/theme";
import { FlashList } from "@shopify/flash-list";
import { ProductsDetails_Review } from "./ProductsDetails_Review";
import { useFonts } from "expo-font";

export const ProductsPrices_Review = ({ text, products }) => {
  useEffect(() => {
    console.log("PRODUCTOS QUE ME LLEGAN DE REVIEW: - - - - -", products);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;
  return (
    <View style={styles.container}>
      {text ? <Text style={styles.title}> {text}</Text> : <></>}
      {products.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontFamily: "Metropolis", fontSize: 14 }}>
            En esta auditoría no se seleccionó ningún producto del portafolio.
          </Text>
        </View>
      ) : (
        <FlashList
          data={products}
          renderItem={({ item }) => <ProductsDetails_Review item={item} />}
          estimatedItemSize={4}
          showsVerticalScrollIndicator={false}
        />
      )}
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
