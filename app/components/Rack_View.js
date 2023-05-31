import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import { Icon, Input } from "@rneui/base";
import { useFonts } from "expo-font";
import { Divider } from "react-native-paper";

const Rack_View = ({ rack }) => {
  const [CateGeneral, setCateGeneral] = useState("70");
  const [CateModerna, setCateModerna] = useState("50");
  const [modalVisible, setModalVisible] = useState(false);
  const [extraImages, setExtraImages] = useState([]);

  const handleTextGeneral = (txt) => {
    setCateGeneral(txt);
  };
  const handleTextModerna = (txt) => {
    setCateModerna(txt);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const acceptModal = () => {
    setCheck1(!check1);
    setCheck2(!check2);
    setIsModalVisible(false);
    setDisabled1(!disabled1);
    setDisabled2(!disabled2);
  };

  const validateExtraImages = (objeto) => {
    const imagenes = []
    if (objeto.url_imagen2) {
      setExtraImages(prevImagenes => [...prevImagenes, objeto.url_imagen2]);
    }
    
    if (objeto.url_imagen3) {
      setExtraImages(prevImagenes => [...prevImagenes, objeto.url_imagen3]);
    }

    let img = extraImages.join(",")
    console.log("IMAGENES EXTRAS: - - - - ",img)

  }

  useEffect(() => {
    validateExtraImages(rack)
  },[])

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
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
            fontSize: theme.fontSize.title,
            fontFamily: "Metropolis",
            left: 10,
          }}
        >
          {rack.nombre_categoria}
        </Text>
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
        <View style={{ width: "100%",backgroundColor:'black' }}>
        <Divider
          width={2}
          color={"black"}
          style={{ backgroundColor: "blue" }}
        />
      </View>
      </View>
      
      <View style={styles.categoryContainer}>
        <View style={styles.category}>
          <Text
            style={{
              fontWeight: theme.fontWeight.softbold,
              fontSize: theme.fontSize.subtitle,
              fontFamily: "Metropolis",
            }}
          >
            Categoría general
          </Text>
          <Input
            keyboardType="numeric"
            //onChangeText={handleTextGeneral}
            value={rack.categoria_general.toString()}
            editable={false}
            style={[
              styles.input,
              {
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.black,
                fontFamily: "Metropolis",
              },
            ]}
            disabled={true}
          />
        </View>
        <View style={styles.category}>
          <Text
            style={{
              fontWeight: theme.fontWeight.softbold,
              fontSize: theme.fontSize.subtitle,
              fontFamily: "Metropolis",
            }}
          >
            Categoría Moderna
          </Text>
          <Input
            keyboardType="numeric"
            //onChangeText={handleTextModerna}
            value={rack.categoria_moderna.toString()}
            editable={false}
            style={[
              styles.input,
              {
                fontWeight: theme.fontWeight.softbold,
                color: theme.colors.black,
                fontFamily: "Metropolis",
              },
            ]}
            underlineColor="transparent"
            disabled={true}
          />
        </View>
      </View>
      {openCamera ? (
        <View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    style={styles.imageContainer}
                    source={{ uri: rack.url_imagen1 }}
                  />
                  <View style={{ flexDirection: "row" }}>
                    {extraImages.map((images) => {
                        return (
                          <Image
                            //key={index}
                            source={{ uri: images }}
                            style={styles.imgContainer}
                            resizeMode="cover"
                          />
                        );
                      })}
                  </View>
                  {/* <View style={{ flexDirection: 'row', }}>
                                            <Image
                                                source={{ uri: img }}
                                                style={styles.imgContainer}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                source={{ uri: img1 }}
                                                style={styles.imgContainer}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                source={{ uri: img2 }}
                                                style={styles.imgContainer}
                                                resizeMode="cover"
                                            />
                                        </View> */}
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

export default Rack_View;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height:200,
    width: "100%",
    alignContent: "center",
    //backgroundColor: "red",
    shadowColor: "#000",
    //marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.lightgray,
  },
  header: {
    //backgroundColor:'blue',
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 5,
  },
  categoryContainer: {
    //backgroundColor:'orange',
    flexDirection: "row",
    flex: 1,
  },
  category: {
    //backgroundColor:'purple',
    flex: 1,
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
    marginTop: 22,
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
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
    width: 66,
    height: 49,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 10,
    borderColor: theme.colors.black,
    padding: 1,
  },
});
