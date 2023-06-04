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
import { useFonts } from "expo-font";
import StyledInput from "./StyledInput";

export const RackCheckbox = ({
  isUserScreen,
  categoryName,
  item,
  setData,
  planograma,
}) => {
  const [CateGeneral, setCateGeneral] = useState();
  const [CateModerna, setCateModerna] = useState();
  const [verificacionCategorias, setverificacionCategoria] = useState();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  useEffect(() => {
    // console.log("------isUserScreen----------",isUserScreen)
    if (isUserScreen) {
      setCateGeneral(item.carasGeneral + "");
      setCateModerna(item.carasModerna + "");
      if (item.state == "1") {
        setCheck1(true);
        setOpenCamera(true);
      } else {
        setCheck2(true);
      }

      // console.log("----------------",item)
    }
  }, [isUserScreen]);
  //const [objPercha, setObjPercha] = useState(itemCom)

  /* useEffect(() => {
     if (CateGeneral < CateModerna) {
       setverificacionCategoria(true);
       console.log("es mayor el de moderna", CateGeneral);
     } else if (CateGeneral >= CateModerna) {
       setverificacionCategoria(false);
     }
   }, [CateModerna]);
 
   useEffect(() => {
     if (CateGeneral < CateModerna) {
       setverificacionCategoria(true);
       console.log("es mayor el de moderna", CateGeneral);
     } else if (CateGeneral >= CateModerna) {
       setverificacionCategoria(false);
     }
   }, [CateGeneral]);
 
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

  const validateNumbers = (num1, num2) => {
    if (num1 === "" || num2 === "") {
      console.log("Por favor, ingrese ambos números");
      // Puedes mostrar un mensaje de error indicando que se deben ingresar ambos números
      return;
    }

    if (num1 < 0 || num2 < 0) {
      console.log("Por favor, ingrese ambos números");
      setverificacionCategoria(" Ingrese numero mayores a 0");
      // Puedes mostrar un mensaje de error indicando que se deben ingresar ambos números
      return;
    }

    if (parseInt(num1) < parseInt(num2)) {
      console.log(
        "El número de caras de la categoría Moderna no puedes ser mayor que el número de caras de la Categoría General"
      );
      setverificacionCategoria(
        "El número de caras de la categoría Moderna Alimentos no puede ser mayor que el número de caras de la Categoría General"
      );
      // Puedes mostrar un mensaje de error o realizar otra acción en caso de validación incorrecta
    } else if (parseInt(num1) >= parseInt(num2)) {
      console.log("Validación exitosa");
      setverificacionCategoria("");
      // Puedes realizar alguna acción cuando la validación sea exitosa
    }
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
        if (state) {
          percha.state = "1";
        } else {
          percha.state = "0";
        }

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

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

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
            fontWeight: theme.fontWeight.softbold,
            fontSize: theme.fontSize.subtitle,
            left: 10,
            borderColor: theme.colors.lightgray,
            fontFamily: "Metropolis",
            color: "white",
          }}
        >
          {categoryName}
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 5 }}
          onPress={() => setOpenCamera(!openCamera)}
        >
          <Icon name="camerao" type="antdesign" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <Divider
          width={1}
          color={theme.colors.lightgray}
          style={{ borderColor: theme.colors.lightgray }}
        />
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.category}>
          <View style={{ flex: 1 }}>
            <StyledInput
              onChangeText={(txt) => {
                setCateGeneral(txt);
                actualizarCantidad(item, "carasGeneral", txt);
                validateNumbers(txt, item.carasModerna);
                /*setObjPercha({...objPercha,
                              CarasGeneral:txt
                          })*/
                //onchangeObjPercha(objPercha)
              }}
              label="Categoria General"
              placeholder="Caras"
              maxLength={6}
              keyboard="numeric"
              editable={true}
              value={CateGeneral}
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
          <StyledInput
            onChangeText={(txt) => {
              setCateModerna(txt);
              actualizarCantidad(item, "carasModerna", txt);
              validateNumbers(item.carasGeneral, txt);
              /*setObjPercha({...objPercha,
                                CarasModerna:txt
                            })
                            onchangeObjPercha(objPercha)*/
            }}
            label="Categoría Moderna"
            placeholder="Caras"
            maxLength={6}
            keyboard="numeric"
            editable={true}
            value={CateModerna}
            width={"100%"}
            // error={errorPrice}
            // information={"* Este campo es obligatorio"}
          />

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
      <View style={{ flexDirection: "row" }}>
        {verificacionCategorias ? (
          <Text
            style={{
              // flex: 1,
              padding: 5,
              textAlign: "justify",
              color: "red",
              fontFamily: "Metropolis",
            }}
          >
            {verificacionCategorias}
          </Text>
        ) : (
          <></>
        )}
      </View>

      {openCamera ? (
        <View>
          <View style={styles.imageContainer}>
            <Text
              style={{
                fontWeight: theme.fontWeight.softbold,
                fontFamily: "Metropolis",
              }}
            >
              Indique si la percha de la categoria cumple o no con lo esperado
            </Text>
            <Text
              style={{
                fontWeight: theme.fontWeight.softbold,
                fontFamily: "Metropolis",
              }}
            >
              Planograma Ideal
            </Text>

            <View style={{ flexDirection: "row" }}>
              {item.imagesPlanograma.map((prodImages, index) => {
                if (prodImages) {
                  return (
                    <Image
                      key={index}
                      source={{ uri: prodImages }}
                      style={{
                        flex: 1,
                        width: "100%",
                        height: 150,
                        marginTop: 10,
                        resizeMode: "stretch",
                      }}
                      resizeMode="cover"
                    />
                  );
                }
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
              <Text
                style={{
                  fontWeight: theme.fontWeight.softbold,
                  fontFamily: "Metropolis",
                }}
              >
                Planograma Real
              </Text>
              <TakeImage
                isUserScreen={isUserScreen}
                setProducts={setData}
                item={item}
              />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: theme.colors.lightgray,
    //height:200,
    width: "100%",
    alignContent: "center",
    //backgroundColor: "red",
    shadowColor: "#000",
    //marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 2,
  },
  header: {
    backgroundColor: theme.colors.modernaYellow,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    justifyContent: "center",
    alignItems: "flex-start",
    //left:10,
    paddingVertical: 5,
  },
  categoryContainer: {
    //backgroundColor: "orange",
    flexDirection: "row",
    flex: 1,
  },
  category: {
    // backgroundColor: "purple",
    flex: 1,
    padding: 10,
    paddingBottom: 1,
  },
  input: {
    fontWeight: theme.fontWeight.normal,
    textAlign: "center",
  },
  imageContainer: {
    //backgroundColor: "yellow",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
