import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";

const DATA = [
  {
    id: 1,
    title: "Categoría 1",
    productos: [
      { id: 1, nombre: "Harina" },
      { id: 2, nombre: "Harina Ya" },
      { id: 3, nombre: "Harina Ya sin polvo" },
    ],
  },
  {
    id: 2,
    title: "Categoría 2",
    productos: [
      { id: 4, nombre: "Fideos Don Bitorio" },
      { id: 5, nombre: "Fideos Horiental" },
      { id: 6, nombre: "Fideos Otra marca" },
    ],
  },
  {
    id: 3,
    title: "Categoría 2",
    productos: [
      { id: 7, nombre: "Pan Moderna" },
      { id: 8, nombre: "Pan Supan" },
      { id: 9, nombre: "Pan Otro" },
    ],
  },
];

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
        borderWidth: 1,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          fontWeight: theme.fontWeight.bolder,
          fontSize: theme.fontSize.subtitle,
          paddingLeft: 15,
          backgroundColor: theme.colors.modernaYellow,
          height: 30,
          justifyContent: "center",
          borderWidth: 0.5,
          color: theme.colors.white,
        }}
      >
        {item.categoria}
      </Text>
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

  const validate = (check1, item) => {
    if (check1) {
      console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
      setIdealPortfolioProducts((prevProducts) => [
        ...prevProducts,
        {
          name: item.name,
          id: item.id,
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
            validate(!check1, item);
          }}
          // Use ThemeProvider to make change for all checkbox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={theme.colors.modernaRed}
          containerStyle={{ backgroundColor: "transparent" }}
        />
        <Text>
          {item.name}-{item.id}
        </Text>
      </View>
    </View>
  );
};

const FlashListPortfolio = ({
  setIdealPortfolioProducts,
  idealPortfolioProducts,
  idealProducts,
}) => {

  useEffect(()=>{
    console.log("ESTO LLEGA DE PORTAFOLIO:  - - - - - - - ",)
  },[])

  return (
    <View style={{ flex: 1, width: "95%", marginBottom: 10 }}>
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
    </View>
  );
};

export default FlashListPortfolio;
