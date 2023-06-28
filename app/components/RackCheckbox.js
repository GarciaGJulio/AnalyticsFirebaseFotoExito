import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import theme from "../theme/theme";
import { CheckBox, Divider, Icon, Input } from "@rneui/base";
import TakeImage from "./TakeImage";
import { FlashList } from "@shopify/flash-list";
import { useFonts } from "expo-font";
import StyledInput from "./StyledInput";
import { validatePercha } from "../utils/helpers";
import { verifyUrlImage } from "../services/onedrive";
import { GlobalContext } from "../context/GlobalContext";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const RackCheckbox = ({
  isUserScreen,
  categoryName,
  item,
  setData,
  setErrorPerchaG,
  errorPerchaG,
  setErrorPerchaM,
  errorPerchaM,
  setValueGeneralValidate,
 
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
  const [extraImages, setExtraImages] = useState([]);
  const { hadSaveRack, setHadSaveRack } = useContext(GlobalContext);

  // useEffect(() => {
  //   // //console.log("------isUserScreen----------",isUserScreen)
  //   if (isUserScreen) {
  //     setCateGeneral(item.carasGeneral + "");
  //     setCateModerna(item.carasModerna + "");
  //     if (item.state == 1) {
  //       setCheck1(true);
  //       setOpenCamera(true);
  //     } else {
  //       setCheck2(true);
  //     }

  //     // //console.log("----------------",item)
  //   }
  // }, [isUserScreen]);

  // useEffect(() => {
  //   if (CateGeneral < CateModerna) {
  //     setverificacionCategoria("La cantidad de caras de Categoria Moderna alimentos no puede ser superior al total de caras de la Categoria General");
  //     //console.log("es mayor el de moderna", CateGeneral);
  //   } else if (CateGeneral >= CateModerna) {
  //     setverificacionCategoria(false);
  //   }
  // }, [CateModerna, CateGeneral]);

  // useEffect(() => {
  //   if (CateGeneral < CateModerna) {
  //     setverificacionCategoria("La cantidad de caras de Categoria Moderna alimentos no puede ser superior al total de caras de la Categoria General");
  //     //console.log("es mayor el de moderna", CateGeneral);
  //   } else if (CateGeneral >= CateModerna) {
  //     setverificacionCategoria(false);
  //   }
  // }, [CateModerna]);

  // useEffect(() => {
  //   if (CateGeneral < CateModerna) {
  //     setverificacionCategoria("La cantidad de caras de Categoria Moderna alimentos no puede ser superior al total de caras de la Categoria General");
  //     //console.log("es mayor el de moderna", CateGeneral);
  //   } else if (CateGeneral >= CateModerna) {
  //     setverificacionCategoria(false);
  //   }
  // }, [ CateGeneral]);

  /*const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };*/

  /*const acceptModal = () => {
    setCheck1(!check1);
    actualizarEstado(item, check2);
    setCheck2(!check2);
    setIsModalVisible(false);
    setDisabled1(!disabled1);
    setDisabled2(!disabled2);
  };*/

  const validateExtraImages = async (objeto) => {
    //console.log("****** esto llega de objeto********", objeto);
    setExtraImages([]);

    if (
      objeto.imagesPlanograma.url_imagen1 !== null &&
      objeto.imagesPlanograma.url_imagen1 !== undefined &&
      objeto.imagesPlanograma.url_imagen1 !== "null" &&
      objeto.imagesPlanograma.url_imagen1 !== "undefined"
    ) {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen1,
        `${objeto.id_planograma}1`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
    }

    if (
      objeto.imagesPlanograma.url_imagen2 !== null &&
      objeto.imagesPlanograma.url_imagen2 !== undefined &&
      objeto.imagesPlanograma.url_imagen2 !== "null" &&
      objeto.imagesPlanograma.url_imagen2F !== "undefined"
    ) {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen2,
        `${objeto.id_planograma}2`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
    }

    if (
      objeto.imagesPlanograma.url_imagen3 !== null &&
      objeto.imagesPlanograma.url_imagen3 !== undefined &&
      objeto.imagesPlanograma.url_imagen3 !== "null" &&
      objeto.imagesPlanograma.url_imagen3 !== "undefined"
    ) {
      const imagenVerificada = await verifyUrlImage(
        objeto.url_imagen3,
        `${objeto.id_planograma}3`
      );
      setExtraImages((prevImagenes) => [...prevImagenes, imagenVerificada]);
    }

    let img = extraImages.join(",");
    //console.log("IMAGENES EXTRAS: - - - - ", img);
  };

  useEffect(() => {
    validateExtraImages(item);
    ////console.log("ITEM QUE LLEGA DE PERCHAS: -----", rack);
  }, [item]);

  const validateNumbers = (num1, num2) => {
    if (num1 === "" || num2 === "") {
      //console.log("Por favor, ingrese ambos números");
      // Puedes mostrar un mensaje de error indicando que se deben ingresar ambos números
      return;
    }

    if (num1 < 0 || num2 < 0) {
      //console.log("Por favor, ingrese ambos números");
      setverificacionCategoria(" Ingrese numero mayores a 0");
      // Puedes mostrar un mensaje de error indicando que se deben ingresar ambos números
      return;
    }

    if (parseInt(num1) < parseInt(num2)) {
      // //console.log(
      //   "El número de caras de la categoría Moderna no puedes ser mayor que el número de caras de la Categoría General"
      // );
      setverificacionCategoria(
        "El número de caras de la categoría Moderna Alimentos no puede ser mayor que el número de caras de la Categoría General"
      );
      // setValueGeneralValidate(
      //   "El número de caras de la categoría Moderna Alimentos no puede ser mayor que el número de caras de la Categoría General"
      // );
      // Puedes mostrar un mensaje de error o realizar otra acción en caso de validación incorrecta
    } else if (parseInt(num1) >= parseInt(num2)) {
      //console.log("Validación exitosa");
      setverificacionCategoria("");
      setValueGeneralValidate("");
      // Puedes realizar alguna acción cuando la validación sea exitosa
    }
  };

  const actualizarEstado = (item, state) => {
    //console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    //console.log("PERCHA: ", item);
    //console.log("ESTADO: ", state);
    setData((perchas) => {
      // Obtén una copia del array actual
      const perchaActualizados = [...perchas];

      // Encuentra el objeto con el ID correspondiente
      const percha = perchaActualizados.find((p) => p.id === item.id);
      ////console.log("ID PERCHA A ACRUALIZAR:", p.id_categoria);
      // Actualiza la propiedad del objeto
      if (percha) {
        if (state) {
          percha.state = 1;
        } else {
          percha.state = 0;
          /*(percha.images.image1 = null),
            (percha.images.image2 = null),
            (percha.images.image3 = null);*/
        }

        //console.log("PARAMETRO ACTUALIZADO: ", percha);
      }

      // Devuelve el array actualizado como el nuevo estado
      return perchaActualizados;
    });
  };

  const actualizarCantidad = (item, variant, txt) => {
    //console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ");
    //console.log("PERCHA: ", item);
    //console.log("PRECIO: ", txt);
    setData((perchas) => {
      // Obtén una copia del array actual
      const perchaActualizados = [...perchas];

      // Encuentra el objeto con el ID correspondiente
      const percha = perchaActualizados.find((p) => p.id === item.id);

      // Actualiza la propiedad del objeto
      if (percha) {
        percha["" + variant + ""] = parseInt(txt);
        //console.log("PERCHA ACTUALIZADA", percha);
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
      {/*<ConfirmationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPress={acceptModal}
        warning={
          "Al presionar el botón Aceptar se va a eliminar el registro ingresado."
        }
      />*/}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
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
        </View>
        <View
          style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            disabled={hadSaveRack}
            onPress={() => setOpenCamera(!openCamera)}
          >
            <Icon name="camera" type="evilicon" size={40} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <Divider
          width={1}
          color={theme.colors.lightgray}
          style={{ borderColor: theme.colors.lightgray }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.categoryContainer}>
            <View style={  styles.category}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <StyledInput
                  onChangeText={(txt) => {
                    setCateGeneral(txt);
                    actualizarCantidad(item, "carasGeneral", txt);
                    validateNumbers(txt, item.carasModerna);
                    validatePercha(txt, setErrorPerchaG);
                  }}
                  label="Categoría General"
                  placeholder="Caras"
                  maxLength={6}
                  keyboard="numeric"
                  editable={!hadSaveRack}
                  value={CateGeneral}
                  width={"100%"}
                  error={errorPerchaG}
                  information={"Número de caras"}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.category}>
              <StyledInput
                onChangeText={(txt) => {
                  setCateModerna(txt);
                  actualizarCantidad(item, "carasModerna", txt);
                  validateNumbers(item.carasGeneral, txt);
                  validatePercha(txt, setErrorPerchaM);
                }}
                label="Categoría Moderna"
                placeholder="Caras"
                maxLength={3}
                keyboard="numeric"
                editable={!hadSaveRack}
                value={CateModerna}
                width={"100%"}
                error={errorPerchaM}
                information={"Número de caras"}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{ flexDirection: "row" }}>
        {verificacionCategorias ? (
          <Text
            style={{
              padding: 5,
              textAlign: "justify",
              color: "red",
              fontSize: theme.fontSize.error,
              fontFamily: "Metropolis",
            }}
          >
            {verificacionCategorias}
          </Text>
        ) : (
          <></>
        )}
      </View>
      {openCamera || hadSaveRack ? (
        <View>
          <View style={styles.imageContainer}>
            <Text
              style={{
                fontWeight: theme.fontWeight.softbold,
                fontFamily: "Metropolis",
              }}
            >
              Indique si la percha de la categoría cumple o no con lo esperado
            </Text>
            <Text
              style={{
                fontWeight: theme.fontWeight.softbold,
                fontFamily: "Metropolis",
                marginVertical: 15,
              }}
            >
              Planograma Ideal
            </Text>

            <View style={{ flexDirection: "row" }}>
              {extraImages.map((prodImages, index) => {
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
              disabled={hadSaveRack ? hadSaveRack : disabled1}
            />
            <Text style={{ fontFamily: "Metropolis" }}>Cumple</Text>
            <CheckBox
              checked={check2}
              onPress={() => {
                check1
                  ? (setCheck2(!check2),
                    setCheck1(!check1),
                    actualizarEstado(item, check2),
                    setDisabled2(!disabled2),
                    setDisabled1(!disabled1))
                  : (setCheck2(!check2),
                    actualizarEstado(item, check2),
                    setDisabled2(!disabled2));
              }}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={theme.colors.modernaRed}
              containerStyle={{ backgroundColor: "transparent" }}
              disabled={hadSaveRack ? hadSaveRack : disabled2}
            />
            <Text style={{ fontFamily: "Metropolis" }}>No cumple</Text>
          </View>
          {check1 || check2 ? (
            <View
              style={{
                paddingHorizontal: 25,
                flex: 1,
                marginBottom: 10,
                //backgroundColor: "blue",
              }}
            >
              <Text
                style={{
                  fontWeight: theme.fontWeight.softbold,
                  fontFamily: "Metropolis",
                  marginVertical: 10,
                }}
              >
                Planograma Real
              </Text>
              <TakeImage
                isUserScreen={isUserScreen}
                setProducts={setData}
                item={item}
                disabled={hadSaveRack}
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
    width: theme.dimensions.maxWidth / 1.09,
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
    flexDirection: "row",
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
    paddingBottom:TecPresent? 1:3,
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
    marginTop: 10,
  },
});
