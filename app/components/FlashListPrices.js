import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBoxContainer from "./CheckBoxContainer";
import theme from "../theme/theme";
import { CheckBoxContainerV2 } from "./CheckBoxContainerV2";
import { useFonts } from "expo-font";

export const FlashListPrices = ({
  title,
  products,
  setProducts,
  idPreciador,
  idPortafolio,
  isUserScreen,
  errorPrice,
  setErrorPrice,
}) => {
  useEffect(() => {
    console.log(
      "ESTO LLEGA DE LA PANTALLA PRECIOS: ",
      idPreciador + " " + " " + idPortafolio
    );
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;
  return (
    <View style={{ flex: 1, width: "90%", marginBottom: 10 }}>
      <Text
        style={{
          fontWeight: theme.fontWeight.softbold,
          fontSize: theme.fontSize.subtitle,
          fontFamily: "Metropolis",
        }}
      >
        {title}
      </Text>
      {products.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontFamily: "Metropolis" }}>
            No se han asignado productos al portafolio ideal para este grupo de
            cliente
          </Text>
        </View>
      ) : (
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
              errorPrice={errorPrice}
              setErrorPrice={setErrorPrice}
              isUserScreen={isUserScreen}
            />
          )}
          estimatedItemSize={4}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
