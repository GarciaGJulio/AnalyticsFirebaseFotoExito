import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Image } from "react-native";
import { useFonts } from "expo-font";
import theme from "../theme/theme";
import StyledInput from "./StyledInput";
import TakeImage from "./TakeImage";
import ToggleSwitch from "toggle-switch-react-native";
import ConfirmationModal from "./ConfirmationModal";
import { validatePriceProduct } from "../utils/helpers";
import { GlobalContext } from "../context/GlobalContext";
import { CheckBoxContainerV2 } from "./CheckBoxContainerV2";

export const FlashListPrices = React.memo(
  ({
    title,
    products,
    setProducts,
    idPreciador,
    idPortafolio,
    isUserScreen,
    errorPrice,
    setErrorPrice,
  }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
      console.log(
        "ESTO LLEGA DE LA PANTALLA PRECIOS: ",
        idPreciador + " " + " " + idPortafolio
      );
    }, []);

    const handleToggleSelection = (itemId) => {
      setSelectedItemId(itemId === selectedItemId ? null : itemId);
    };

    const [fontLoaded] = useFonts({
      Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
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
              No se han asignado productos al portafolio ideal para este grupo
              de cliente
            </Text>
          </View>
        ) : (
          <FlatList
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
                isSelected={item.id === selectedItemId}
                onToggleSelection={handleToggleSelection}
                price={item.price.toString()}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            extraData={selectedItemId}
          />
        )}
      </View>
    );
  }
);