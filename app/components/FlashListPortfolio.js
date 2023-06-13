import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../context/GlobalContext";

const RenderItem = ({
  item,
  setIdealPortfolioProducts,
  idealPortfolioProducts,
  tipo,
  idPortafolio,
  isUserScreen,
  hadSave,
}) => {
  const saveId = async () => {
    //await AsyncStorage.setItem("id_portafolio_ideal", idPortafolio);
    await AsyncStorage.setItem("tipo_ideal", tipo);
  };
  useEffect(() => {
    console.log("ID DEL PORTAFOLIO IDEAL: ", idPortafolio);
    console.log("TIPO DE PORTAFOLIO: ", tipo);
    saveId();
  }, []);

  //const idPortafolio2 = idPortafolio;
  //const tipo2 = tipo;

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
            backgroundColor: theme.colors.modernaYellow,
            height: 35,
            borderBottomColor: theme.colors.lightgray,
            flex: 1,
            fontFamily: "Metropolis",
            justifyContent: "center",
            color: theme.colors.white,
          }}
        >
          {item.categoria}
        </Text>
      </View>

      <FlashList
        data={item.productos}
        renderItem={({ item }) => (
          <RenderItemProd
            item={item}
            //idPortafolio={idPortafolio2}
            //tipo={tipo2}
            hadSave={hadSave}
            isUserScreen={isUserScreen}
            setIdealPortfolioProducts={setIdealPortfolioProducts}
            idealPortfolioProducts={idealPortfolioProducts}
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
  setIdealPortfolioProducts,
  idealPortfolioProducts,
  idPortafolio,
  isUserScreen,
  tipo,
  hadSave,
}) => {
  const { hadSaveBriefCase } = useContext(GlobalContext);
  useEffect(() => {
    console.log("HA GUARDADO? -- --- ", hadSaveBriefCase);
  }, [hadSaveBriefCase]);
  const [check1, setCheck1] = useState(false);
  useEffect(() => {
    if (isUserScreen) {
      idealPortfolioProducts.map((itemP) => {
        if (itemP.id == item.id) {
          setCheck1(true);
        }
      });
    }
  }, [idealPortfolioProducts, isUserScreen]);

  const validate = async (check1, name, id, item) => {
    if (check1) {
      console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
      console.log("PRODUCTO A REGISTRAR: ", item.name, item.id);
      //const idPortafolio = await AsyncStorage.getItem("id_portafolio_ideal");
      const tipo = await AsyncStorage.getItem("tipo_ideal");
      //console.log("ID DEL PORTAFOLIO A INGRESAR . . . . ", idPortafolio);
      console.log("TIPO DE PORTAFOLIO: ", tipo);
      setIdealPortfolioProducts((prevProducts) => [
        ...prevProducts,
        {
          name: name,
          id_portafolio: item.id_portafolio,
          tipo_portafolio: item.tipo_portafolio,
          id: id,
          url: item.url,
          price: 0.0,
          state: 0,
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
          disabled={hadSaveBriefCase}
          onPress={() => {
            setCheck1(!check1);
            validate(!check1, item.name, item.id, item);
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
  idPortafolio,
  isUserScreen,
  tipo,
  hadSave,
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
            Esta auditoría no registró productos
          </Text>
        </View>
      ) : (
        <FlashList
          data={idealProducts}
          estimatedItemSize={100}
          //keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              idPortafolio={idPortafolio}
              tipo={tipo}
              hadSave={hadSave}
              isUserScreen={isUserScreen}
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
