import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
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
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [state, setState] = useState(0);
    const [price, setPrice] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [disabled1, setDisabled1] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const { hadSavePreciador, setHadSavePreciador } = useContext(GlobalContext);

    useEffect(() => {
      console.log(
        "////////////////////////////////////////////////isUserScreen: ",
        isUserScreen
      );
      console.log(
        "////////////////////////////////////////////////item: ",
        item
      );

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
      actualizarEstado(item, false);
      setIsModalVisible(false);
    };

    useEffect(() => {
      console.log("PRECIADOR QUE ESTA LLEGANDO: - - - - -", idPreciador);
      console.log("PORTAFOLIO QUE ESTA LLEGANDO: - - - - -", idPortafolio);
    }, []);

    const actualizarEstado = (item, state) => {
      console.log("ENTRANDO A ACRUALIZAR ESTADO - - - - - - - ");
      console.log("PRODUCTO: ", item);
      console.log("ESTADO: ", state);
      setState(state);
      setProducts((products) => {
        const productosActualizados = [...products];
        const producto = productosActualizados.find((p) => p.id === item.id);
        if (producto) {
          if (state) {
            producto.state = 1;
          } else {
            setPrice("");
            producto.state = 0;
            producto.price = 0.0;
            producto.images.image1 = null;
            producto.images.image2 = null;
            producto.images.image3 = null;
          }
        }
        return productosActualizados;
      });
    };

    const actualizarPrecio = (item, price) => {
      console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
      console.log("PRODUCTO: ", item);
      console.log("PRECIO: ", price);
      setProducts((products) => {
        const productosActualizados = [...products];
        const producto = productosActualizados.find((p) => p.id === item.id);
        if (producto) {
          if (isNaN(price)) {
            producto.price = 0.0;
          } else {
            producto.price = price;
          }
          console.log("PORDUCTO ACTUALIZADO: ", producto);
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
              {productName}-{item.id}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontFamily: "Metropolis",
                }}
              >
                Preciador visible
              </Text>
              <ToggleSwitch
                isOn={state}
                onColor="green"
                disabled={hadSavePreciador}
                offColor={theme.colors.modernaYellow}
                size="small"
                onToggle={() => {
                  console.log("CAMBIA A: ", !state);
                  !state ? actualizarEstado(item, !state) : handleOpenModal();
                }}
              />
            </View>
          </View>
        </View>
        {state ? (
          <View style={styles.secondaryContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  padding: 10,
                }}
              >
                <StyledInput
                  onChangeText={(txt) => {
                    setPrice(txt);
                    validatePriceProduct(txt, setErrorPrice);
                    actualizarPrecio(item, parseFloat(txt));
                  }}
                  label="Preciador del producto"
                  placeholder="Precio"
                  maxLength={6}
                  keyboard="numeric"
                  editable={!hadSavePreciador}
                  error={errorPrice}
                  value={price}
                  width={"100%"}
                />
              </View>
              <View
                style={{
                  flex: 1.2,
                  justifyContent: "center",
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
                      Foto del preciador del producto
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
    margin: 1,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.lightgray,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
  },
  descriptionContainer: {
    flex: 3,
    padding: 10,
  },
  primaryContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
  },
  secondaryContainer: {
    flex: 1,
    width: "100%",
  },
});
