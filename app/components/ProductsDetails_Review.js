import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import TakeImage from "./TakeImage";
import PromosItemsDetails_Review from "./PromosItemsDetails_Review";
import { Divider, Icon } from "@rneui/base";
import { verifyUrlImage } from "../services/onedrive";

export const ProductsDetails_Review = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const [extraImages, setExtraImages] = useState([]);

  const thumbPosition =
    item.estado === 1 ? "60%" : item.estado === 0 ? "10%" : "35%";
  const trackColor =
    item.estado === null
      ? "#999999"
      : item.estado === 1
      ? theme.colors.modernaGreen
      : theme.colors.modernaRed;

  const validateExtraImages = async (objeto) => {
    setExtraImages([]);

    if (objeto.url_imagen1 && objeto.url_imagen1 !== "null") {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen1,
        `${objeto.id_preciador + "-" + objeto.id_producto}-1`
      );

      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
      //setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen1]);
    }

    if (objeto.url_imagen2 && objeto.url_imagen2 !== "null") {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen2,
        `${objeto.id_preciador + "-" + objeto.id_producto}-2`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
      //setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen2]);
    }

    if (objeto.url_imagen3 && objeto.url_imagen3 !== "null") {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen3,
        `${objeto.id_preciador + "-" + objeto.id_producto}-3`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
      //setExtraImages((prevImagenes) => [...prevImagenes, objeto.url_imagen3]);
    }

    let img = extraImages.join(",");
    console.log("IMAGENES EXTRAS: - - - - - - - - -  ", img);
  };

  useEffect(() => {
    validateExtraImages(item);
    console.log("ESTO ES EL ITEM: - - - - - - - - - - -", item);
  }, [item]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.primaryContainer, { marginLeft: 5 }]}>
        <Image
          source={{ uri: item.url_imagen_producto }}
          style={{ width: 100, height: 100, margin: 5 }}
        />
        <View style={styles.descriptionContainer}>
          <View
            style={{
              flexDirection: "row",
              //backgroundColor: "orange",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontFamily: "Metropolis" }}>
                {item.id_producto}-{item.nombre_producto}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              //marginVertical: 5,
              flex: 1,
              //backgroundColor: "orange",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontFamily: "Metropolis" }}>
                Precio de la auditoría
              </Text>
            </View>
            {item.estado === 1 ? (
              <View
                style={{
                  //backgroundColor: "blue",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    //backgroundColor: "green",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    setOpenCamera(!openCamera);
                    setModalVisible(true);
                  }}
                >
                  <Icon name="camera" type="evilicon" size={40} />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              //backgroundColor: "red",
              marginRight: 5,
            }}
          >
            {item.estado == 1 ? (
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 10,
                    fontFamily: "Metropolis",
                    bottom: 5,
                  }}
                >
                  ${item.precio}
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 10,
                  bottom: 5,
                  fontFamily: "Metropolis",
                }}
              >
                Precio no disponible
              </Text>
            )}

            <View>
              <View
                style={[
                  styles.switchContainer,
                  { backgroundColor: trackColor },
                ]}
              >
                <View
                  style={[styles.switchTrack, { backgroundColor: trackColor }]}
                />
                <View style={[styles.switchThumb, { left: thumbPosition }]} />
              </View>
            </View>
          </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderRadius: 20,
    margin: 1,
    //marginVertical: 10,
    //borderWidth: 2,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    width: "99%",
    marginBottom: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  descriptionContainer: {
    //marginLeft: 5,
    //backgroundColor: "orange",
    flex: 3,
    padding: 5,
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
  switchContainer: {
    width: 60,
    height: 30,
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  switchTrack: {
    flex: 1,
    borderRadius: 15,
  },
  switchThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  //MODAL
  imageContainer: {
    width: 224,
    height: 186,
    resizeMode: "cover",
    marginTop: 100,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
    //borderWidth: 1,
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 100)",
    //alignItems: "center",
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
    width: 200,
    height: 120,
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
