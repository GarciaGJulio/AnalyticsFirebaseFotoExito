import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import theme from "../theme/theme";
import { CheckBox, Divider, Icon, Input } from "@rneui/base";
import TakeImage from "./TakeImage";
import { FlashList } from "@shopify/flash-list";
import StyledInput from "./StyledInput";

const RackCheckbox = ({ categoryName, item, setData }) => {
  const [CateGeneral, setCateGeneral] = useState();
  const [CateModerna, setCateModerna] = useState();
  const [verificacionCategorias, setverificacionCategoria] = useState(false);
  //const [objPercha, setObjPercha] = useState(itemCom)

  useEffect(() => {
    if (CateGeneral < CateModerna) {
      setverificacionCategoria(true);
      console.log("es mayor el de moderna", CateGeneral);
    } else if (CateGeneral >= CateModerna) {
      setverificacionCategoria(false);
    }
  }, [CateModerna, CateGeneral]);

  /*useEffect(() => {
        console.log("itmDentroCompleto",itemCom)
        console.log("itmDentroCompletoPER",objPercha)

    }, []);*/

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const acceptModal = () => {
    setCheck1(!check1);
    actualizarEstado(item, check2);
    setCheck2(!check2);
    setIsModalVisible(false);
    setDisabled1(!disabled1);
    setDisabled2(!disabled2);
  };

  const actualizarEstado = (item, state) => {
    console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    console.log("PERCHA: ", item);
    console.log("ESTADO: ", state);
    setData((perchas) => {
      // Obtén una copia del array actual
      const perchaActualizados = [...perchas];

      // Encuentra el objeto con el ID correspondiente
      const percha = perchaActualizados.find((p) => p.id === item.id);
      //console.log("ID PERCHA A ACRUALIZAR:", p.id_categoria);
      // Actualiza la propiedad del objeto
      if (percha) {
        percha.state = state;
        console.log("PARAMETRO ACTUALIZADO: ", percha);
      }

      // Devuelve el array actualizado como el nuevo estado
      return perchaActualizados;
    });
  };

  const actualizarCantidad = (item, variant, txt) => {
    console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    console.log("PERCHA: ", item);
    console.log("PRECIO: ", txt);
    setData((perchas) => {
      // Obtén una copia del array actual
      const perchaActualizados = [...perchas];

      // Encuentra el objeto con el ID correspondiente
      const percha = perchaActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (percha) {
        percha["" + variant + ""] = parseInt(txt);
        console.log("PERCHA ACTUALIZADA", percha);
      }

      // Devuelve el array actualizado como el nuevo estado
      return perchaActualizados;
    });
  };

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPress={acceptModal}
        warning={
          "Al presionar el boton Aceptar se va a eliminar el registro ingresado."
        }
      />
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: theme.fontWeight.bolder,
            fontSize: theme.fontSize.title,
            left: 10,
            color:"white"
          }}
        >
          {categoryName}
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 5 }}
          onPress={() => setOpenCamera(!openCamera)}
        >
          <Icon name="camerao" type="antdesign" size={30} color={"white"}/>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <Divider
          width={1}
          color={"black"}
          style={{ backgroundColor: "blue" }}
        />
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.category}>

          <StyledInput
            label=" Categoría general"
            keyboardType="numeric"
            keyboard="numeric"
            onChangeText={(txt) => {
              setCateGeneral(txt);
              actualizarCantidad(item, "carasGeneral", txt);
              /*setObjPercha({...objPercha,
                                CarasGeneral:txt
                            })*/
              //onchangeObjPercha(objPercha)
            }}
            value={CateGeneral}
            style={styles.input}

          />

          <Text style={{ bottom: 25, right: 20, textAlign: "center" }}>Número de caras</Text>
        </View>
        <View style={styles.category}>


          <StyledInput
            label=" Categoría general"
            keyboard="numeric"
            onChangeText={(txt) => {
              setCateModerna(txt);
              actualizarCantidad(item, "carasModerna", txt);
              /*setObjPercha({...objPercha,
                                CarasModerna:txt
                            })
                            onchangeObjPercha(objPercha)*/
            }}
            value={CateModerna}
            style={styles.input}
          />

          <Text style={{ bottom: 25, right: 20, textAlign: "center" }}>Número de caras</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ padding: 10, textAlign: "justify", color: "red" }}>
          {verificacionCategorias
            ? "La cantidad de caras de Categoria Moderna alimentos no puede ser superior al total de caras de la Categoria General"
            : ""}
        </Text>
      </View>











      {openCamera ? (
        <View>
          <View style={styles.imageContainer}>
            <Text style={{ fontWeight: theme.fontWeight.softbold }}>
              Indique si la percha de la categoria cumple o no con lo esperado
            </Text>
            <Text style={{ fontWeight: theme.fontWeight.softbold }}>
              Planograma Ideal
            </Text>
            {/* <Text   style={{textAlign: 'left'}}>
              Titulo planograma Ideal
            </Text> */}
            {/*<Image
              style={{
                flex: 1,
                width: "100%",
                height: 150,
                //margin: 10,
                marginTop: 10,
                resizeMode: "stretch",
              }}
              source={{
                uri: "https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531",
              }}
            />*/}

            <View style={{ flexDirection: "row" }}>
              {item.images.map((prodImages) => {
                return (
                  <Image
                    //key={index}
                    source={{ uri: prodImages }}
                    style={{
                      flex: 1,
                      width: "100%",
                      height: 150,
                      //margin: 10,
                      marginTop: 10,
                      resizeMode: "stretch",
                    }}
                    resizeMode="cover"
                  />
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              right: 10,
              justifyContent: "center",
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
            <Text>Cumple</Text>
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
            <Text>No cumple</Text>
          </View>
          {check1 ? (
            <View style={{ paddingHorizontal: 25, flex: 1 }}>
              <Text style={{ fontWeight: theme.fontWeight.softbold }}>
                Planograma Real
              </Text>
              <TakeImage setProducts={setData} item={item} />
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default RackCheckbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:160,
    width: "100%",
    alignContent: "center",
    //backgroundColor: "red",
    shadowColor: "#000",
    //marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    // backgroundColor:"red"
  },
  header: {
    //backgroundColor:'blue',
    justifyContent: "center",
    alignItems: "flex-start",
    //left:10,
    paddingVertical: 5,
    backgroundColor:theme.colors.modernaYellow,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  categoryContainer: {
    //backgroundColor:'orange',
    flexDirection: "row",
    flex: 1,
    
  },
  category: {
    //backgroundColor:'purple',
    flex: 1,
    alignItems: "stretch",
    padding: 15

  },
  input: {
    fontWeight: theme.fontWeight.normal,
    textAlign: "center",
  },
  imageContainer: {
    //backgroundColor:'yellow',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
