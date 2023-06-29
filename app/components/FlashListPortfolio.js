import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../context/GlobalContext";
import { CheckBox } from "@rneui/base";

const RenderItem = React.memo(
  ({
    item,
    setIdealPortfolioProducts,
    idealPortfolioProducts,
    tipo,
    idPortafolio,
    isUserScreen,
    hadSave,
  }) => {
    const saveId = async () => {
      await AsyncStorage.setItem("tipo_ideal", tipo);
    };

    useEffect(() => {
      saveId();
    }, []);

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

        <FlatList
          data={item.productos}
          renderItem={({ item }) => (
            <RenderItemProd
              item={item}
              hadSave={hadSave}
              isUserScreen={isUserScreen}
              setIdealPortfolioProducts={setIdealPortfolioProducts}
              idealPortfolioProducts={idealPortfolioProducts}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
);

const RenderItemProd = React.memo(
  ({ item, setIdealPortfolioProducts, idealPortfolioProducts }) => {
    const { hadSaveBriefCase } = useContext(GlobalContext);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
      if (idealPortfolioProducts.some((product) => product.id === item.id)) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }, [idealPortfolioProducts]);

    const toggleCheck = () => {
      if (isChecked) {
        setIdealPortfolioProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== item.id)
        );
      } else {
        setIdealPortfolioProducts((prevProducts) => [
          ...prevProducts,
          {
            name: item.name,
            id_portafolio: item.id_portafolio,
            tipo_portafolio: item.tipo_portafolio,
            id: item.id,
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
      }
    };

    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            checked={isChecked}
            disabled={hadSaveBriefCase}
            onPress={toggleCheck}
            // Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={theme.colors.modernaRed}
            containerStyle={{ backgroundColor: "transparent" }}
          />
          <Text style={{ flex: 1, fontFamily: "Metropolis", fontSize: 15 }}>
            {item.id}-{item.name}
          </Text>
        </View>
      </View>
    );
  }
);

export const FlashListPortfolio = React.memo(
  ({
    setIdealPortfolioProducts,
    idealPortfolioProducts,
    idealProducts,
    idPortafolio,
    isUserScreen,
    tipo,
    hadSave,
  }) => {
    const [fontLoaded] = useFonts({
      Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    });

    useEffect(() => {
      //console.log("ESTO LLEGA DE PORTAFOLIO:  - - - - - - - ", idealProducts);
    }, []);

    if (!fontLoaded) return null;

    return (
      <View style={{ flex: 1, width: "95%", marginBottom: 10 }}>
        {idealProducts.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
              No se encontraron productos
            </Text>
          </View>
        ) : (
          <FlatList
            data={idealProducts}
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
            keyExtractor={(item) => item.categoria}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
    );
  }
);
