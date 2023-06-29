import { ScrollView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { pickImages } from "../services/CameraM";
import { Icon } from "@rneui/base";
import { useEffect } from "react";
import LoaderModal from "./LoaderModal";
import LOCATION_ANIMATION from "../../assets/camera.json";
import CAMERA from "../../assets/resources/camera.png";
import theme from "../theme/theme";
import { GlobalContext } from "../context/GlobalContext";

const TakeImage = ({ setProducts, item, isUserScreen, disabled }) => {
  const [allImages, setAllImages] = useState([])
  const [image] = useState(CAMERA);
  const { setImageModal } = useContext(GlobalContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    let newItemTemp = Object.assign({}, item)
    let itemKyes = Object.keys(newItemTemp.images)
    for (let x = 0; x < itemKyes.length; x++) {
      if (allImages.length <= itemKyes.length && allImages[x]) {
        newItemTemp.images[itemKyes[x]] = allImages[x]
      } else {
        newItemTemp.images[itemKyes[x]] = null
      }
    }

    setProducts((products) => {
      const productosActualizados = [...products];
      const producto = productosActualizados.find((p) => p.id === item.id);
      if (producto) {
        producto.images = newItemTemp.images
      }
      return productosActualizados;
    });
  }, [allImages])
  useEffect(() => {
    if (isUserScreen) {
      let itemTemps = []
      let tempKeys = Object.keys(item.images)
      for (const item of tempKeys) {
        if (item.images[item]) {
          itemTemps.push(item.images[item]);
        }
      }
      setAllImages(itemTemps)
    }
  }, []);
  const handleOpenModal = async () => {
    setIsModalVisible(true);
    try {
      pickImages((image) => {
        setAllImages([...allImages, image])
      })
    } catch (error) {
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleDeleteImageItem = (index) => {
    const newImages = allImages.filter((item, ind) => ind != index)
    setAllImages(newImages)
  }
  return (
    <ScrollView horizontal style={styles.container}>

      {
        allImages.length > 0 && (allImages.map((image, index) => {
          return <TouchableOpacity
            key={index}
            disabled={disabled}
            onPress={() => {
           //   setImageModal(image)
            }}
            style={styles.imageContainer}
          >
            <Image
              source={image.startsWith("http") ? image : { uri: image }}
              style={styles.image}
            />
            <TouchableOpacity
              disabled={disabled}
              style={styles.deleteButton}
              onPress={() => {
                handleDeleteImageItem(index)
              }}
            >
              <Icon name="remove-circle" type="ionicon" size={25} color={"red"} />
            </TouchableOpacity>
          </TouchableOpacity>
        }))
      }
      {
        allImages.length < Object.keys(item.images).length && <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            handleOpenModal(
            );
          }}
          style={styles.imageContainer}
        >
          <Image
            source={image}
            style={styles.image}
          />
        </TouchableOpacity>
      }

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
    //marginVertical: 5,
    flexDirection: "row",
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
  imageContainer: {
    //backgroundColor:'red',
    overflow: "hidden",
    width: 80,
    height: 80,
    //marginVertical: 10,
    marginHorizontal: 4,
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
