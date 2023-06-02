import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import { TouchableOpacity } from "react-native";
import { pickImages } from "../services/CameraM";
import { Icon } from "@rneui/base";
import { useEffect } from "react";
import { deleteImageFromOneDrive } from "../services/onedrive";
import { generateUIDDGeneric } from "../services/GenerateID";
import LoaderModal from "./LoaderModal";
import LOCATION_ANIMATION from "../../assets/camera.json";


const TakeImage = ({ setProducts, item }) => {
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/001/198/770/small_2x/camera.png"
  );
  const [idItem, setidItem] = useState();
  const [imageV1, setImageV1] = useState(false);
  const [imageV2, setImageV2] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [REimage1, setRemoteImage1] = useState("");
  const [REimage2, setRemoteImage2] = useState("");
  const [REimage3, setRemoteImage3] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    console.log("Id dsde Taker:", item.id);
    setidItem(item.id);
  }, []);
  const handleOpenModal = async (setRemote,setImg,actImg,NomImg) => {
    setIsModalVisible(true)
    try {
      
      await pickImages((img) => {

        console.log("URLSSSSSS:", img)
        const start = img.indexOf('UniqueId=') + 9;
        const end = img.indexOf('&', start);
        const uniqueId = img.substring(start, end !== -1 ? end : undefined);
        console.log("uniqueIDDD:", uniqueId)
        setRemote(uniqueId)
        setImg(img);
        actImg(item, img, NomImg);
        console.log(NomImg + item.id.toString())
      }, NomImg +"-"+ item.id.toString() + "-" + generateUIDDGeneric());


    } catch (error) {

    } finally {
      setIsModalVisible(false)
    }
  }
  const actualizarImagen = (item, image, imagesNumber) => {
    //pickImages(item, setImage);
    console.log("\nENTRANDO A ACtUALIZAR IMAGEN - - - - - - - ");
    console.log("PRODUCTO: ", item);
    console.log("IMAGEN: ", image);
    setProducts((products) => {
      // Obtén una copia del array actual
      const productosActualizados = [...products];

      // Encuentra el objeto con el ID correspondiente
      const producto = productosActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (producto) {
        producto.images["" + imagesNumber + ""] = image;
        console.log(producto);
      }

      // Devuelve el array actualizado como el nuevo estado
      return productosActualizados;
    });
  };

  const borrarImagen = (item, imagesNumber, idBorrar) => {
    deleteImageFromOneDrive(idBorrar)
    console.log("\nENTRANDO A ELIMINAR IMAGEN - - - - - - - ");
    console.log("PRODUCTO: ", item);
    console.log("ELIMINANDO IMAGEN: . . . . . ");
    setProducts((products) => {
      // Obtén una copia del array actual
      const productosActualizados = [...products];

      // Encuentra el objeto con el ID correspondiente
      const producto = productosActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (producto) {
        producto.images["" + imagesNumber + ""] = null;
        console.log(producto);
      }
      // Devuelve el array actualizado como el nuevo estado
      return productosActualizados;
    });
  };
  return (
    <ScrollView horizontal style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setImageV1(!imageV1);
          handleOpenModal(setRemoteImage1,setImage1,actualizarImagen,"imge1");
        }}
        //actualizarImagen(item, setImage1, "image1",image1);
        style={styles.imageContainer}
      >
        <Image source={{ uri: image1 ? image1 : image }} style={styles.image} />
      </TouchableOpacity>
      {imageV1 ? (
        <TouchableOpacity
          onPress={() => {
            setImageV2(!imageV2);
          handleOpenModal(setRemoteImage2,setImage2,actualizarImagen, "image2");

          }}
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: image2 ? image2 : image }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setImageV1(!imageV1);
              borrarImagen(item, "image2", REimage2);
              setImage2("");
            }}
          >
            <Icon name="remove-circle" type="ionicon" size={25} color={"red"} />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {imageV2 ? (
        <TouchableOpacity
          onPress={() => {
          handleOpenModal( setRemoteImage3,setImage3,actualizarImagen, "image3");
            
          }}
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: image3 ? image3 : image }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setImageV2(!imageV2);
              borrarImagen(item, "image3", REimage3);
              setImage3("");
            }}
          >
            <Icon name="remove-circle" type="ionicon" size={25} color={"red"} />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <LoaderModal
        animation={LOCATION_ANIMATION}
        visible={isModalVisible}
        warning={"Subiendo imágenes espere..."}
      />
    </ScrollView>
  );
};

export default TakeImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'pink',
    width: "100%",
    //height: '40%',
    marginVertical: 5,
    flexDirection: "row",
  },
  imageContainer: {
    //backgroundColor:'red',
    overflow: "hidden",
    width: 80,
    height: 80,
    marginVertical: 10,
    margin: 4,
    borderRadius: 15,
    borderWidth: 2,
  },
  image: {
    width: 70,
    height: 60,
    marginHorizontal: 3,
    marginVertical: 9,
    resizeMode: "stretch",
  },
  deleteButton: {
    zIndex: 1,
    position: "absolute",
    width: 35,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
