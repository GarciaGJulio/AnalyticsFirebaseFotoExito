import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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

export const CheckBoxContainerV2 = ({
  productName,
  idPortafolio,
  idPreciador,
  setProducts,
  isUserScreen,
  item,
}) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [state, setState] = useState(false);
  const [price, setPrice] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [errorPrice, setErrorPrice] = useState();
  useEffect(()=>{
    console.log("////////////////////////////////////////////////isUserScreen: ", isUserScreen);
    console.log("////////////////////////////////////////////////item: ", item);

    if(isUserScreen){
      
      setState(item.state=="1"?true:false)
      setPrice(item.price+"")
    }
  },[])
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const acceptModal = () => {
    actualizarEstado(item, false);
    //setCheck1(!check1);
    //setCheck2(!check2);
    setIsModalVisible(false);
    //setDisabled1(!disabled1);
    //setDisabled2(!disabled2);
    //setState(!state);
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
      // Obtén una copia del array actual
      const productosActualizados = [...products];

      // Encuentra el objeto con el ID correspondiente
      const producto = productosActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (producto) {
        if (state) {
          producto.state = "1";
        } else {
          producto.state = "0";
        }
        //producto.id_portafolio_complementario = idPortafolio;
        //producto.id_preciador_portafolio_complementario = idPreciador;
        console.log("PORDUCTO ACTUALIZADO: ", producto);
      }

      // Devuelve el array actualizado como el nuevo estado
      return productosActualizados;
    });
  };

  const actualizarPrecio = (item, price) => {
    console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    console.log("PRODUCTO: ", item);
    console.log("PRECIO: ", price);
    setProducts((products) => {
      // Obtén una copia del array actual
      const productosActualizados = [...products];

      // Encuentra el objeto con el ID correspondiente
      const producto = productosActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (producto) {
        producto.price = price;
        //producto.id_portafolio_complementario = idPortafolio;
        //producto.id_preciador_portafolio_complementario = idPreciador;
        console.log("PORDUCTO ACTUALIZADO: ", producto);
      }

      // Devuelve el array actualizado como el nuevo estado
      return productosActualizados;
    });
  };

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
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
              isOn={state}
              onColor="green"
              offColor={theme.colors.modernaYellow}
              //label="Example label"
              //labelStyle={{ color: "black", fontWeight: "900" }}
              size="small"
              onToggle={() => {
                console.log("CAMBIA A: ", !state);
                !state ? actualizarEstado(item, !state) : handleOpenModal();
              }}
            />
          </View>
          {/*<View
            style={{ flexDirection: "row", alignItems: "center", right: 10 }}
          >
            <CheckBox
              checked={check1}
              onPress={() => {
                check2
                  ? (setCheck2(!check2),
                    actualizarEstado(item, !check1),
                    setDisabled2(!disabled2),
                    setCheck1(!check1),
                    setDisabled1(!disabled1))
                  : (setCheck1(!check1),
                    actualizarEstado(item, !check1),
                    setDisabled1(!disabled1));
              }}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={theme.colors.modernaRed}
              containerStyle={{ backgroundColor: "transparent" }}
              disabled={disabled1}
            />
            <Text>Si</Text>
            <CheckBox
              checked={check2}
              onPress={() => {
                check1
                  ? handleOpenModal()
                  : (setCheck2(!check2),
                    actualizarEstado(item, check2),
                    setDisabled2(!disabled2));
              }}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={theme.colors.modernaRed}
              containerStyle={{ backgroundColor: "transparent" }}
              disabled={disabled2}
            />
            <Text>No</Text>
          </View>*/}
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
                //justifyContent: "center",
                //alignItems: "center",
                //backgroundColor: "red",
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
                editable={true}
                value={price}
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
                    Foto del preciador del producto
                  </Text>
                </View>
              </View>

              <TakeImage setProducts={setProducts} item={item} isUserScreen={isUserScreen} />
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

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
    //height: 290,
    width: "100%",
  },
});
