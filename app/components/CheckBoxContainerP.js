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
import { verifyUrlImage } from "../services/onedrive";

export const CheckBoxContainerP = ({ productName, item, setData }) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [newImage, setNewImage] = useState(
    "https://www.herbolariosivana.com/sites/default/files/default_images/default.jpg"
  );

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // useEffect(() => {
  //   //console.log(
  //     "ESTO LLEGA A PROMOCIONES: ----------------------------------- ",
  //     item
  //   );
  // });

  const updateImage = async (item) => {
    const imagenVerificada = await verifyUrlImage(
      item.url,
      `${item.id_tipo_exhibidor}`
    );
    setNewImage(imagenVerificada);
  };

  useEffect(() => {
    updateImage(item);
  }, []);
  /*const acceptModal = () => {
    setCheck1(!check1);
    setCheck2(!check2);
    actualizarEstado(item, check2);
    setIsModalVisible(false);
    setDisabled1(!disabled1);
    setDisabled2(!disabled2);
  };*/
  useEffect(() => {
    //console.log("NOMBRE DE LOS IMAGENES: ", item.url);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  const actualizarEstado = (item, state) => {
    //console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    //console.log("PERCHA: ", item);
    //console.log("ESTADO: ", state);
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
          /*(exhibidor.images.image1 = null),
            (exhibidor.images.image2 = null),
            (exhibidor.images.image3 = null);*/
        }

        //console.log("PARAMETRO ACTUALIZADO: ", exhibidor);
      }

      // Devuelve el array actualizado como el nuevo estado
      return exhibidorActualizados;
    });
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.primaryContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
            {productName}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1.2 }}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: theme.fontWeight.softbold,
                    fontFamily: "Metropolis",
                    fontSize: 16,
                    marginTop: 10,
                  }}
                >
                  Planograma Ideal
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: newImage }}
            style={{
              flex: 1,
              width: "100%",
              height: 150,
              marginTop: 10,
              resizeMode: "stretch",
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              //right: 20,
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
              //disabled={had ? hadSaveRack : disabled1}
            />
            <Text style={{ fontFamily: "Metropolis" }}>Cumple</Text>
            <CheckBox
              checked={check2}
              onPress={() => {
                check1
                  ? (setCheck2(!check2),
                    setCheck1(!check1),
                    actualizarEstado(item, check2),
                    setDisabled2(!disabled2),
                    setDisabled1(!disabled1))
                  : (setCheck2(!check2),
                    actualizarEstado(item, check2),
                    setDisabled2(!disabled2));
              }}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={theme.colors.modernaRed}
              containerStyle={{ backgroundColor: "transparent" }}
              //disabled={hadSaveRack ? hadSaveRack : disabled2}
            />
            <Text style={{ fontFamily: "Metropolis" }}>No cumple</Text>
          </View>
        </View>
      </View>
      {check1 || check2 ? (
        <View style={styles.secondaryContainer}>
          <View style={{ padding: 0, flex: 1 }}>
            <Text
              style={{
                fontWeight: theme.fontWeight.softbold,
                fontFamily: "Metropolis",
                //marginVertical: 10,
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
