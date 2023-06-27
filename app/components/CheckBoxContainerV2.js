import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import { CheckBox } from "@rneui/themed";

import TakeImage from "./TakeImage";
import ConfirmationModal from "./ConfirmationModal";
import { validatePriceProduct } from "../utils/helpers";
import ToggleSwitch from "toggle-switch-react-native";
import { useFonts } from "expo-font";
import StyledInput from "./StyledInput";
import { GlobalContext } from "../context/GlobalContext";

export const CheckBoxContainerV2 = React.memo(
  ({
    productName,
    idPortafolio,
    idPreciador,
    setProducts,
    isUserScreen,
    item,
    errorPrice,
    setErrorPrice,
  }) => {
    const [state, setState] = useState(false);
    const [price, setPrice] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { hadSavePreciador, setHadSavePreciador } = useContext(GlobalContext);

    useEffect(() => {
      ////console.log("isUserScreen: ", isUserScreen);
      ////console.log("item: ", item);

      if (isUserScreen) {
        setState(item.state == 1 ? true : false);
        setPrice(item.price + "");
      }
    }, []);

    const handleOpenModal = () => {
      setIsModalVisible(true);
    };

    const handleCloseModal = () => {
      setIsModalVisible(false);
    };

    const acceptModal = () => {
      actualizarEstado(item.id, false);
      setIsModalVisible(false);
    };

    const actualizarEstado = (id, state) => {
      // //console.log(
      //   " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
      // );
      // //console.log(
      //   `\n * * * * * * * * * ACTUALIZANDO EL ESTADO DEL PRODUCTO :${id}  * * * * * * * * * \n`
      // );
      // //console.log(
      //   " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
      // );
      setState(state);
      setProducts((products) => {
        let productosActualizados = [...products];
        let producto = productosActualizados.find((p) => p.id === id);

        if (producto) {
          if (state) {
            producto.state = 1;
          } else {
            setPrice("");
            producto.state = 0;
            producto.price = 0.0;
            producto.images = {
              image1: null,
              image2: null,
              image3: null,
            };
          }
        }

        return productosActualizados;
      });
    };

    const actualizarPrecio = (id, price) => {
      // //console.log(
      //   " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
      // );
      // //console.log(
      //   `\n * * * * * * * * * ACTUALIZANDO PRECIO DEL PRODUCTO :${id}  * * * * * * * * * \n`
      // );
      // //console.log(
      //   " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
      // );
      setProducts((products) => {
        let productosActualizados = [...products];
        let producto = productosActualizados.find((p) => p.id === id);

        if (producto) {
          if (isNaN(price)) {
            producto.price = 0.0;
          } else {
            producto.price = price;
          }
        }

        return productosActualizados;
      });
    };

    const [fontLoaded] = useFonts({
      Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    });

    if (!fontLoaded) return null;

    return (
      <View style={[styles.container, { flex: 1 }]}>
        <ConfirmationModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          onPress={acceptModal}
          warning={
            "Al presionar el boton Aceptar se borraran los datos ingresados de este producto."
          }
        />
        <View style={styles.primaryContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 6,
            }}
          >
            <Image
              source={{ uri: item.url }}
              style={{ width: 75, height: 75, resizeMode: "cover" }}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={{ fontSize: 15, fontFamily: "Metropolis" }}>
              {item.id}-{productName}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                //backgroundColor: "blue",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  //marginHorizontal: 10,
                  marginTop: 5,
                  fontSize: 14,
                  fontFamily: "Metropolis",
                }}
              >
                Preciador visible
              </Text>
              <ToggleSwitch
                isOn={item.state === 1 ? true : state && item.state !== 1}
                onColor="green"
                disabled={hadSavePreciador}
                offColor={theme.colors.modernaYellow}
                // label="Example label"
                // labelStyle={{ color: "black", fontWeight: "900" }}
                onToggle={() => {
                  //console.log("CAMBIA A: ", !state);
                  if (item.state === 1 && state) {
                    handleOpenModal();
                  } else {
                    setState(!state);
                    actualizarEstado(item.id, !state);
                  }
                }}
              />
            </View>
          </View>
        </View>
        {item.state ? (
          <View style={styles.secondaryContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  //width: "50%",
                  flex: 0.6,
                  paddingHorizontal: 10,
                }}
              >
                <StyledInput
                  onChangeText={(txt) => {
                    setPrice(txt);
                    validatePriceProduct(txt, setErrorPrice);
                    actualizarPrecio(item.id, parseFloat(txt));
                  }}
                  label="Precio"
                  placeholder="Precio"
                  maxLength={6}
                  keyboard="numeric"
                  editable={!hadSavePreciador}
                  error={errorPrice}
                  value={
                    price !== ""
                      ? price
                      : item.price
                      ? item.price.toString()
                      : ""
                  }
                  width={"100%"}
                  // information={"* Este campo es obligatorio"}
                />
              </View>
              <View
                style={{
                  //backgroundColor: "green",
                  flex: 1.2,
                  // padding: 10,
                  justifyContent: "center",
                  //alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={{ color: "red", textAlign: "left" }}>*</Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 13.5,
                        fontWeight: "500",
                        fontFamily: "Metropolis",
                      }}
                    >
                      Foto del preciador
                    </Text>
                  </View>
                </View>

                <TakeImage
                  setProducts={setProducts}
                  item={item}
                  isUserScreen={isUserScreen}
                  disabled={hadSavePreciador}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    //borderRadius: 20,
    margin: 1,
    //marginVertical: 10,
    //borderWidth: 2,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.lightgray,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
  },
  descriptionContainer: {
    //marginLeft: 5,
    //backgroundColor: "orange",
    flex: 3,
    padding: 10,
  },
  primaryContainer: {
    flexDirection: "row",
    flex: 1,
    //backgroundColor: "blue",
    //backgroundColor:'blue',
    width: "100%",
  },
  secondaryContainer: {
    //backgroundColor: "brown",
    flex: 1,
    height: 130,
    width: "100%",
  },
});
