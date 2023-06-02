import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";
import { useFonts } from "expo-font";

const RenderItem = ({
  item,
  setIdealPortfolioProducts,
  idealPortfolioProducts,
}) => {
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
            paddingLeft: 15,
            //paddingVertical: -22,
            backgroundColor: theme.colors.modernaYellow,
            height: 35,
            //textAling: "center",
            borderBottomColor: theme.colors.lightgray,
            flex: 1,

            fontFamily: "Metropolis",
            justifyContent: "center",
            //borderWidth: 2,
            color: theme.colors.white,
          }}
        >
          {" "}
          {item.categoria}
        </Text>
      </View>

      <FlashList
        data={item.productos}
        renderItem={({ item }) => (
          <RenderItemProd
            //name={item.name}
            item={item}
            //id={item.id}
            setIdealPortfolioProducts={setIdealPortfolioProducts}
            idealPortfolioProducts={idealPortfolioProducts}
          />
        )}
        //estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const RenderItemProd = ({
  //name,
  //id,
  item,
  setIdealPortfolioProducts,
  idealPortfolioProducts,
}) => {
  const [check1, setCheck1] = useState(false);

  const validate = (check1, name, id) => {
    if (check1) {
      console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
      console.log("PRODUCTO A REGISTRAR: ", item.name, item.id);
      setIdealPortfolioProducts((prevProducts) => [
        ...prevProducts,
        {
          name: name,
          id: id,
          url: item.url,
          price: null,
          state: false,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        },
      ]);
    } else {
      console.log("ELIMINANDO PRODUCTO . . . . ");
      setIdealPortfolioProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          checked={check1}
          onPress={() => {
            setCheck1(!check1);
            validate(!check1, item.name, item.id);
          }}
          // Use ThemeProvider to make change for all checkbox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={theme.colors.modernaRed}
          containerStyle={{ backgroundColor: "transparent" }}
        />
        <Text style={{ flex: 1, fontFamily: "Metropolis", fontSize: 15 }}>
          {item.name}-{item.id}
        </Text>
      </View>
    </View>
  );
};

export const FlashListPortfolio = ({
  setIdealPortfolioProducts,
  idealPortfolioProducts,
  idealProducts,
}) => {
  useEffect(() => {
    console.log("ESTO LLEGA DE PORTAFOLIO:  - - - - - - - ", idealProducts);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={{ flex: 1, width: "95%", marginBottom: 10 }}>
      {idealProducts.length == 0 ? (
        <View
          style={{
            //backgroundColor: "red",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
            No existen productos registrados para este cliente
          </Text>
        </View>
      ) : (
        <FlashList
          data={idealProducts}
          //keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              setIdealPortfolioProducts={setIdealPortfolioProducts}
              idealPortfolioProducts={idealPortfolioProducts}
            />
          )}
          //estimatedItemSize={4}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
