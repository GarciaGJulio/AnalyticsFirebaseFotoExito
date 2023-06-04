import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import ImageViewer from "react-native-image-zoom-viewer";
import { useFonts } from "expo-font";
import { Divider, Icon } from "@rneui/base";

export const PromosItemsDetails_Review = ({ exhibitor }) => {
  const [extraImages, setExtraImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const validateExtraImages = (objeto) => {
    setExtraImages([]);
    setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen1]);
    if (objeto.url_imagen2) {
      setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen2]);
    }

    if (objeto.url_imagen3) {
      setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen3]);
    }

    let img = extraImages.join(",");
    console.log("IMAGENES EXTRAS: - - - - ", img);
  };

  useEffect(() => {
    validateExtraImages(exhibitor);
    console.log("EXHIBIDOR TIPO / */ * / * / */: - - - - ", exhibitor);
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14, fontFamily: "Metropolis" }}>
              {exhibitor.nombre_tipo_exhibidor}
            </Text>
            <TouchableOpacity
              disabled={exhibitor.estado_promocion == "0" ? true : false}
              style={{ position: "absolute", right: 4, top: 2 }}
              onPress={() => {
                setOpenCamera(!openCamera);
                setModalVisible(true);
              }}
            >
              <Icon name="camera" type="evilicon" size={40} />
              {/* <Icon name='camerao' type='antdesign' size={32} /> */}
            </TouchableOpacity>
            <View style={{ width: "100%" }}>
              <Divider
                width={1}
                color={theme.colors.lightgray}
                style={{ borderColor: theme.colors.lightgray }}
              />
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
                          //flex: 1,
                          //marginVertical: 200,
                          justifyContent: "center",
                          alignItems: "center",
                          //flexDirection: "row",
                          //padding: 5,
                        }}
                      >
                        <View>
                          <Image
                            //key={images} // Se utiliza "images" como clave
                            source={{ uri: exhibitor.url_imagen_exhibidor }}
                            style={styles.imgContainer} // Utilizar el estilo "imgContainer"
                            resizeMode="cover"
                          />
                        </View>
                        {extraImages.map((images) => {
                          return (
                            <Image
                              key={images} // Se utiliza "images" como clave
                              source={{ uri: images }}
                              style={styles.imgContainer} // Utilizar el estilo "imgContainer"
                              resizeMode="cover"
                            />
                          );
                        })}
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
    borderWidth: 1,
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
    marginTop: 22,
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    //alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 528,
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
    width: 200,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    //marginTop: 20,
    margin: 5,
    //marginHorizontal: 10,
    borderColor: theme.colors.black,
    padding: 1,
  },
});
