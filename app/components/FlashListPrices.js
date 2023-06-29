import React, { useContext, useEffect, useState } from "react";
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
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/base";

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
    setActivoItem,
  }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [activo, setActivo] = useState(true);

    useEffect(() => {
      // //console.log(
      //   "PRODUCTOS QUE LLEGAN AL PRECIADOR - - - - - - - - - - -: ",
      //   products
      // );
    }, []);

    const handleToggleSelection = (itemId) => {
      setSelectedItemId(itemId === selectedItemId ? null : itemId);
    };

    const [fontLoaded] = useFonts({
      Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    });

    if (!fontLoaded) return null;
    const onPress = () => {
      setActivo(!activo);
      setActivoItem(!activo);
    };

    return (
      <View style={{ flex: 1.2, width: "90%", marginBottom: 10 }}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "red",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                // backgroundColor:"black",
                fontWeight: theme.fontWeight.softbold,
                fontSize: theme.fontSize.subtitle,
                fontFamily: "Metropolis",
              }}
            >
              {title}
            </Text>
            {activo ? (
              <Icon
                name="chevron-small-down"
                type="entypo"
                size={28}
                color={theme.colors.gray}
                style={{ marginLeft: 20 }}
              />
            ) : (
              <Icon
                name="chevron-small-up"
                type="entypo"
                size={28}
                color={theme.colors.gray}
                style={{ marginLeft: 20 }}
              />
            )}
          </View>
        </TouchableOpacity>

        {activo ? (
          products.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
              showsVerticalScrollIndicator={true}
              extraData={selectedItemId}
            />
          )
        ) : (
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        )}
      </View>
    );
  }
);
