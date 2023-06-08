import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import { Icon, Input } from "@rneui/base";
import { useFonts } from "expo-font";
import { Divider } from "react-native-paper";
import StyledInput from "./StyledInput";

export const Rack_View = ({ rack }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [extraImages, setExtraImages] = useState([]);
  const [imagesPlanograma, setImagesPlanograma] = useState([]);

  const validateExtraImages = (objeto) => {
    setExtraImages([]);

    if (
      objeto.url_imagen1 !== null &&
      objeto.url_imagen1 !== undefined &&
      objeto.url_imagen1 !== "null" &&
      objeto.url_imagen1 !== "undefined"
    ) {
      setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen1]);
    }

    if (
      objeto.url_imagen2 !== null &&
      objeto.url_imagen2 !== undefined &&
      objeto.url_imagen2 !== "null" &&
      objeto.url_imagen2F !== "undefined"
    ) {
      setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen2]);
    }

    if (
      objeto.url_imagen3 !== null &&
      objeto.url_imagen3 !== undefined &&
      objeto.url_imagen3 !== "null" &&
      objeto.url_imagen3 !== "undefined"
    ) {
      setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen3]);
    }

    let img = extraImages.join(",");
    console.log("IMAGENES EXTRAS: - - - - ", img);
  };

  const validateImagesPlanograma = (objeto) => {
    setImagesPlanograma([]);
    if (rack.hasOwnProperty("url_planograma1")) {
      if (objeto.url_planograma1 != "null" || objeto.url_planograma1 != null) {
        setImagesPlanograma((prevImagenes) => [
          ...prevImagenes,
          objeto.url_planograma1,
        ]);
      }

      if (objeto.url_planograma2 != "null" || objeto.url_planograma2 != null) {
        setImagesPlanograma((prevImagenes) => [
          ...prevImagenes,
          objeto.url_planograma2,
        ]);
      }

      if (objeto.url_planograma3 != "null" || objeto.url_planograma3 != null) {
        setImagesPlanograma((prevImagenes) => [
          ...prevImagenes,
          objeto.url_planograma3,
        ]);
      }
    }

    let img = extraImages.join(",");
    console.log("IMAGENES EXTRAS: - - - - ", img);
  };

  useEffect(() => {
    validateExtraImages(rack);
    validateImagesPlanograma(rack);
    console.log("ITEM QUE LLEGA DE PERCHAS: -----", rack);
  }, [rack]);

  const [openCamera, setOpenCamera] = useState(false);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: theme.fontWeight.softbold,
            fontSize: theme.fontSize.subtitle,
            left: 10,
            marginVertical: 5,
            borderColor: theme.colors.lightgray,
            fontFamily: "Metropolis",
            color: "white",
            flex: 1,
          }}
        >
          {rack.nombre_categoria}
        </Text>
        {rack.estado_percha == 0 ? (
          <></>
        ) : (
          <TouchableOpacity
            style={{ position: "absolute", right: 4, top: 2 }}
            onPress={() => {
              setOpenCamera(!openCamera);
              setModalVisible(true);
            }}
          >
            <Icon name="camera" type="evilicon" size={40} />
            {/* <Icon name='camerao' type='antdesign' size={32} /> */}
          </TouchableOpacity>
        )}

        <View style={{ width: "100%" }}>
          <Divider
            width={1}
            color={theme.colors.lightgray}
            style={{ borderColor: theme.colors.lightgray }}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <View style={styles.category}>
          <View style={{ flex: 1 }}>
            <StyledInput
              label="Categoría Moderna"
              //placeholder="Precio"
              maxLength={6}
              keyboard="numeric"
              editable={false}
              value={rack.categoria_general.toString()}
              width={"100%"}
              // error={errorPrice}
              // information={"* Este campo es obligatorio"}
            />
          </View>
          <Text
            style={{
              bottom: 25,
              right: 20,
              fontFamily: "Metropolis",
              textAlign: "center",
            }}
          >
            Número de caras
          </Text>
        </View>
        <View style={styles.category}>
          <View style={{ flex: 1 }}>
            <StyledInput
              label="Categoría Moderna"
              placeholder="Precio"
              maxLength={6}
              keyboard="numeric"
              editable={false}
              value={rack.categoria_moderna.toString()}
              width={"100%"}
              // error={errorPrice}
              // information={"* Este campo es obligatorio"}
            />
          </View>
          <Text
            style={{
              bottom: 25,
              right: 20,
              fontFamily: "Metropolis",
              textAlign: "center",
            }}
          >
            Número de caras
          </Text>
        </View>
      </View>
      {openCamera ? (
        <View style={{ flex: 1 }}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={styles.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      //backgroundColor: "red",
                      flex: 1,
                      //marginVertical: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      //flexDirection: "row",
                      //padding: 5,
                    }}
                  >
                    <View
                      style={{
                        //backgroundColor: "orange",
                        margin: 10,
                        marginVertical: 50,
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 0.2,
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Metropolis", fontSize: 16 }}
                        >
                          Planograma Ideal
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1.5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ScrollView
                          horizontal={true}
                          style={
                            {
                              //backgroundColor: "blue",
                              //padding: 10,
                            }
                          }
                        >
                          {imagesPlanograma.map((images) => {
                            return (
                              <Image
                                key={images} // Se utiliza " images" como clave
                                source={{ uri: images }}
                                style={styles.imgContainer} // Utilizar el estilo "imgContainer"
                                resizeMode="cover"
                              />
                            );
                          })}
                        </ScrollView>
                      </View>

                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 0.2,
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Metropolis", fontSize: 16 }}
                        >
                          Planograma Real
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1.5,
                          justifyContent: "center",
                          alignItems: "center",
                          //backgroundColor: "brown",
                        }}
                      >
                        <ScrollView horizontal={true} style={{ top: 15 }}>
                          {extraImages
                            .filter(
                              (image) => image !== null && image !== undefined
                            )
                            .map((image) => {
                              return (
                                <Image
                                  key={image} // Utiliza la variable "image" como clave
                                  source={{ uri: image }}
                                  style={styles.imgContainer2} // Utiliza el estilo "imgContainer"
                                  resizeMode="cover"
                                />
                              );
                            })}
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setOpenCamera(!openCamera);
                    }}
                  >
                    <Icon name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    //height:200,
    width: "100%",
    alignContent: "center",
    //backgroundColor: "red",
    shadowColor: "#000",
    //marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.lightgray,
  },
  header: {
    backgroundColor: theme.colors.modernaYellow,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    justifyContent: "space-between",
    alignItems: "flex-start",
    //left:10,
    flex: 1,
    //paddingVertical: 5,
    borderBottomWidth: 2,
    borderColor: theme.colors.lightgray,
  },
  categoryContainer: {
    //backgroundColor:'orange',
    flexDirection: "row",
    flex: 1,
  },
  category: {
    //backgroundColor:'purple',
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  input: {
    fontWeight: theme.fontWeight.light,
    textAlign: "center",
  },
  //MODAL
  imageContainer: {
    width: 224,
    height: 186,
    resizeMode: "cover",
    marginTop: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    //alignItems: "center",
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 528,
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 10,
  },

  imgContainer: {
    width: 250,
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    //marginTop: 20,
    margin: 5,
    //marginHorizontal: 10,
    borderColor: theme.colors.black,
    padding: 1,
    resizeMode: "stretch",
  },
  imgContainer2: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    //marginTop: 20,
    margin: 5,
    //marginHorizontal: 10,
    borderColor: theme.colors.black,
    padding: 1,
    resizeMode: "stretch",
  },
});
