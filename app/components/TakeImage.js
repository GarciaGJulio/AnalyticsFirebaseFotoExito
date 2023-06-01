import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import { TouchableOpacity } from "react-native";
import { pickImages } from "../services/CameraM";
import { Icon } from "@rneui/base";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log("Id dsde Taker:", item.id);
    setidItem(item.id);
  }, []);

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

  const borrarImagen = (item, imagesNumber) => {
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
          pickImages((image1) => {
            setImage1(image1);
            actualizarImagen(item, image1, "image1");
          }, item);
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
            pickImages((image2) => {
              setImage2(image2);
              actualizarImagen(item, image2, "image2");
            }, item);
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
              borrarImagen(item, "image2");
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
            pickImages((image3) => {
              setImage3(image3);
              actualizarImagen(item, image3, "image3");
            }, item);
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
              borrarImagen(item, "image3");
              setImage3("");
            }}
          >
            <Icon name="remove-circle" type="ionicon" size={25} color={"red"} />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
    // marginVertical: 5,
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
