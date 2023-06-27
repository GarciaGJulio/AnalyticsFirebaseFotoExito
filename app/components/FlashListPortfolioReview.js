import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RenderItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        overflow: "hidden",
        borderColor: theme.colors.lightgray,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            fontWeight: theme.fontWeight.softbold,
            fontSize: 15,
            borderBottomWidth: 2,
            paddingLeft: 10,
            backgroundColor: theme.colors.modernaYellow,
            height: 35,
            borderBottomColor: theme.colors.lightgray,
            flex: 1,
            fontFamily: "Metropolis",
            justifyContent: "center",
            color: theme.colors.white,
          }}
        >
          {item.nombre_categoria}
        </Text>
      </View>

      <FlashList
        data={item.productos}
        renderItem={({ item }) => (
          <RenderItemProd
            item={item}
            //idPortafolio={idPortafolio2}
            //tipo={tipo2}
            //setIdealPortfolioProducts={setIdealPortfolioProducts}
            //idealPortfolioProducts={idealPortfolioProducts}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const RenderItemProd = ({
  //name,
  //id,
  item,
  //setIdealPortfolioProducts,
  //dealPortfolioProducts,
  //idPortafolio,
  //tipo,
}) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          checked={item.estado ? true : false}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={theme.colors.modernaRed}
          containerStyle={{ backgroundColor: "transparent" }}
          disabled={true}
        />
        <Text
          style={{
            flex: 1,
            fontFamily: "Metropolis",
            fontSize: 15,
            padding: 10,
          }}
        >
          {item.id_producto}-{item.nombre_producto}
        </Text>
      </View>
    </View>
  );
};

export const FlashListPortfolioReview = ({
  products,
  // tipo,
}) => {
  useEffect(() => {
    console.log("ESTO LLEGA DE PORTAFOLIO:  - - - - - - - ", products);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={{ flex: 1, width: "95%", marginBottom: 10 }}>
      {products.length == 0 ? (
        <View
          style={{
            //backgroundColor: "red",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
            En esta auditoría no se seleccionó ningún producto del portafolio complementario.
          </Text>
        </View>
      ) : (
        <FlashList
          data={products}
          //keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              //idPortafolio={idPortafolio}
              //tipo={tipo}
              //setIdealPortfolioProducts={setIdealPortfolioProducts}
              //idealPortfolioProducts={idealPortfolioProducts}
            />
          )}
          //estimatedItemSize={4}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
