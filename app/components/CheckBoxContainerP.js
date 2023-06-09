import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import { CheckBox } from "@rneui/themed";
import StyledInput from "./StyledInput";
import TakeImage from "./TakeImage";
import ConfirmationModal from "./ConfirmationModal";
import { useFonts } from "expo-font";

export const CheckBoxContainerP = ({ productName, item, setData }) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const acceptModal = () => {
    setCheck1(!check1);
    setCheck2(!check2);
    actualizarEstado(item, check2);
    setIsModalVisible(false);
    setDisabled1(!disabled1);
    setDisabled2(!disabled2);
  };
  useEffect(() => {
    console.log("NOMBRE DE LOS IMAGENES: ", item.url);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  const actualizarEstado = (item, state) => {
    console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    console.log("PERCHA: ", item);
    console.log("ESTADO: ", state);
    setData((exhibidores) => {
      // Obtén una copia del array actual
      const exhibidorActualizados = [...exhibidores];

      // Encuentra el objeto con el ID correspondiente
      const exhibidor = exhibidorActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (exhibidor) {
        if (state) {
          exhibidor.state = 1;
        } else {
          exhibidor.state = 0;
          (exhibidor.images.image1 = null),
            (exhibidor.images.image2 = null),
            (exhibidor.images.image3 = null);
        }

        console.log("PARAMETRO ACTUALIZADO: ", exhibidor);
      }

      // Devuelve el array actualizado como el nuevo estado
      return exhibidorActualizados;
    });
  };

  return (
    <View style={[styles.container]}>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPress={acceptModal}
        warning={
          "Al presionar el boton Aceptar se va a eliminar el registro ingresado."
        }
      />
      <View style={styles.primaryContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
            {productName}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ color: "red", textAlign: "left" }}>*</Text>
            </View>
            <View>
              <Text style={{ fontSize: 13.5, fontFamily: "Metropolis" }}>
                Exhibidor disponible
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              right: 20,
              //backgroundColor: "red",
              flex: 1,
            }}
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
            <Text style={{ fontSize: 15, fontFamily: "Metropolis" }}>Si</Text>
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
            <Text style={{ fontSize: 15, fontFamily: "Metropolis" }}>No</Text>
          </View>
        </View>
      </View>
      {check1 ? (
        <View style={styles.secondaryContainer}>
          <View style={{ padding: 10, flex: 2 }}>
            <View style={{ flex: 1.2 }}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: theme.fontWeight.softbold,
                    fontFamily: "Metropolis",
                    fontSize: 16,
                    marginVertical: 10,
                  }}
                >
                  Planograma Ideal
                </Text>
              </View>
              <Image
                source={{
                  uri: item.url,
                }}
                style={{ resizeMode: "stretch", width: "100%", height: 200 }}
              />
            </View>
            <Text
              style={{
                fontWeight: theme.fontWeight.softbold,
                fontFamily: "Metropolis",
                marginVertical: 10,
              }}
            >
              Planograma Real
            </Text>
            <View style={{ flex: 1.2 }}>
              <TakeImage setProducts={setData} item={item} />
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
    flex: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: theme.colors.lightgray,
    borderWidth: 2,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    //width: "100%",
  },
  descriptionContainer: {
    marginLeft: 5,
    //backgroundColor: "orange",
    flex: 1,
    padding: 10,
  },
  primaryContainer: {
    flexDirection: "row",
    //backgroundColor: "blue",
    flex: 1,
    width: "90%",
  },
  secondaryContainer: {
    //backgroundColor: "brown",
    flex: 1,
    //height: 290,
    width: "90%",
  },
});
