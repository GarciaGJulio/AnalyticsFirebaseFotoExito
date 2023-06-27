import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import ImageViewer from "react-native-image-zoom-viewer";
import { useFonts } from "expo-font";
import { CheckBox, Divider, Icon } from "@rneui/base";
import { verifyUrlImage } from "../services/onedrive";
import ImageModal from "react-native-image-modal";

export const PromosItemsDetails_Review = ({ exhibitor }) => {
  const [extraImages, setExtraImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [newImage, setNewImage] = useState(
    "https://www.herbolariosivana.com/sites/default/files/default_images/default.jpg"
  );

  const validateExtraImages = async (objeto) => {
    setExtraImages([]);

    if (
      objeto.url_imagen1 !== null &&
      objeto.url_imagen1 !== undefined &&
      objeto.url_imagen1 !== "null" &&
      objeto.url_imagen1 !== "undefined"
    ) {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen1,
        `${objeto.id_promocion + "-" + objeto.id_exhibidor}-1`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
      //setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen1]);
    }

    if (
      objeto.url_imagen2 !== null &&
      objeto.url_imagen2 !== undefined &&
      objeto.url_imagen2 !== "null" &&
      objeto.url_imagen2 !== "undefined"
    ) {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen2,
        `${objeto.id_promocion + "-" + objeto.id_exhibidor}-2`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
      //setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen2]);
    }

    if (
      objeto.url_imagen3 !== null &&
      objeto.url_imagen3 !== undefined &&
      objeto.url_imagen3 !== "null" &&
      objeto.url_imagen3 !== "undefined"
    ) {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen3,
        `${objeto.id_promocion + "-" + objeto.id_exhibidor}-3`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
      //setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen3]);
    }

    let img = extraImages.join(",");
    console.log("IMAGENES EXTRAS: - - - - ", img);
  };

  const updateImage = async (item) => {
    const imagenVerificada = await verifyUrlImage(
      item.url_imagen_exhibidor,
      `${item.id_exhibidor_tipo}`
    );
    setNewImage(imagenVerificada);
  };

  useEffect(() => {
    updateImage(exhibitor);
    console.log("ESTO LLEGA ------- - - - - -", exhibitor);
  }, []);

  useEffect(() => {
    validateExtraImages(exhibitor);
    //console.log("EXHIBIDOR TIPO / */ * / * / */: - - - - ", exhibitor);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={[styles.container]}>
      <View style={[styles.primaryContainer]}>
        <View style={styles.descriptionContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //backgroundColor: "red",
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
              {exhibitor.nombre_tipo_exhibidor}
            </Text>
            {exhibitor.estado_promocion == 1 ||
            exhibitor.estado_promocion == 0 ? (
              <TouchableOpacity
                style={{ position: "absolute", right: 4 }}
                onPress={() => {
                  setOpenCamera(!openCamera);
                  setModalVisible(true);
                }}
              >
                <Icon name="camera" type="evilicon" size={40} />
                {/* <Icon name='camerao' type='antdesign' size={32} /> */}
              </TouchableOpacity>
            ) : (
              <></>
            )}
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
                          //backgroundColor: "white",
                          //flex: 1,
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
                            //margin: 10,
                            marginTop: 40,
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
                              flex: 1.1,
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
                              <ImageModal
                                //key={images} // Se utiliza "images" como clave
                                source={{ uri: newImage }}
                                style={styles.imgContainer} // Utilizar el estilo "imgContainer"
                                resizeMode="stretch"
                              />
                            </ScrollView>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              right: 10,
                              justifyContent: "center",
                              flex: 0.5,
                              //backgroundColor:'red'
                            }}
                          >
                            <CheckBox
                              checked={
                                exhibitor.estado_promocion == 1 ? true : null
                              }
                              // Use ThemeProvider to make change for all checkbox
                              iconType="material-community"
                              checkedIcon="checkbox-marked"
                              uncheckedIcon="checkbox-blank-outline"
                              checkedColor={theme.colors.modernaRed}
                              containerStyle={{
                                backgroundColor: "transparent",
                              }}
                              disabled={true}
                            />
                            <Text style={{ fontFamily: "Metropolis" }}>
                              Cumple
                            </Text>
                            <CheckBox
                              checked={
                                exhibitor.estado_promocion == 0 ? true : null
                              }
                              iconType="material-community"
                              checkedIcon="checkbox-marked"
                              uncheckedIcon="checkbox-blank-outline"
                              checkedColor={theme.colors.modernaRed}
                              containerStyle={{
                                backgroundColor: "transparent",
                              }}
                              disabled={true}
                            />
                            <Text style={{ fontFamily: "Metropolis" }}>
                              No cumple
                            </Text>
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
                                  (image) =>
                                    image !== null && image !== undefined
                                )
                                .map((image) => {
                                  return (
                                    <ImageModal
                                      resizeMode="stretch"
                                      key={image} // Utiliza la variable "image" como clave
                                      source={{ uri: image }}
                                      style={styles.imgContainer} // Utiliza el estilo "imgContainer"
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    marginVertical: 10,
    //borderWidth: 1,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "rgba(255, 255, 255, 100)",
    //alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 650,
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
