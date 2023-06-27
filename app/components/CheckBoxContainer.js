import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import { CheckBox } from "@rneui/themed";
import StyledInput from "./StyledInput";
import TakeImage from "./TakeImage";
import ConfirmationModal from "./ConfirmationModal";
import { validatePriceProduct } from "../utils/helpers";

const CheckBoxContainer = ({ productName, products, setProducts, item }) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [price, setPrice] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [errorPrice, setErrorPrice] = useState();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const acceptModal = () => {
    actualizarEstado(item, check2);
    setCheck1(!check1);
    setCheck2(!check2);
    setIsModalVisible(false);
    setDisabled1(!disabled1);
    setDisabled2(!disabled2);
  };

  const actualizarEstado = (item, state) => {
    //console.log("ENTRANDO A ACRUALIZAR ESTADO - - - - - - - ");
    //console.log("PRODUCTO: ", item);
    //console.log("ESTADO: ", state);
    setProducts((products) => {
      // Obtén una copia del array actual
      const productosActualizados = [...products];

      // Encuentra el objeto con el ID correspondiente
      const producto = productosActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (producto) {
        producto.state = state;
        //console.log(producto);
      }

      // Devuelve el array actualizado como el nuevo estado
      return productosActualizados;
    });
  };

  const actualizarPrecio = (item, price) => {
    //console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    //console.log("PRODUCTO: ", item);
    //console.log("PRECIO: ", price);
    setProducts((products) => {
      // Obtén una copia del array actual
      const productosActualizados = [...products];

      // Encuentra el objeto con el ID correspondiente
      const producto = productosActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (producto) {
        producto.price = price;
        //console.log(producto);
      }

      // Devuelve el array actualizado como el nuevo estado
      return productosActualizados;
    });
  };

  return (
    <View style={[styles.container, { height: check1 ? 460 : 150 }]}>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPress={acceptModal}
        warning={
          "nar el boton Aceptar se va a eliminar el registro ingresado."
        }
      />
      <View style={styles.primaryContainer}>
        <Image source={HARINA} style={{ width: 100, height: 100 }} />
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 13 }}>{productName}</Text>
          <Text style={{ marginHorizontal: 10, marginTop: 5, fontSize: 11 }}>
            Precio disponible
          </Text>
          <View
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
          </View>
        </View>
      </View>
      {check1 ? (
        <View style={styles.secondaryContainer}>
          <View style={{ padding: 10 }}>
            <StyledInput
              onChangeText={(txt) => {
                setPrice(txt);
                validatePriceProduct(txt, setErrorPrice);
                actualizarPrecio(item, parseFloat(txt));
              }}
              label="Precio"
              placeholder="Ingresa el precio del producto"
              maxLength={5}
              keyboard="numeric"
              editable={true}
              value={price}
              width={"100%"}
              error={errorPrice}
              information={"Este campo es obligatorio"}
            />
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Foto del precio del producto respectivo
              </Text>
              <Text style={{ fontSize: 13, marginTop: 10 }}>
                Proporcione una foto del producto respectivo
              </Text>
              <TakeImage setProducts={setProducts} item={item} />
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CheckBoxContainer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 2,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  descriptionContainer: {
    marginLeft: 5,
    //backgroundColor:'orange',
    flex: 1,
    padding: 10,
  },
  primaryContainer: {
    flexDirection: "row",
    //backgroundColor:'blue',
    width: "90%",
  },
  secondaryContainer: {
    //backgroundColor:'brown',
    height: 290,
    width: "90%",
  },
});
