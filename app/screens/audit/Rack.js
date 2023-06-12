import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LOCATION_ANIMATION from "../../../assets/gps.json";
import React, { useContext, useEffect, useState } from "react";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import theme from "../../theme/theme";
import DoubleStyledButton from "../../components/DoubleStyledButton";
import ScreenInformation from "../../components/ScreenInformation";
import ModernaHeader from "../../components/ModernaHeader";
import RackCheckbox from "../../components/RackCheckbox";
import {
  db_insertGlobalDataAudit,
  db_insertPercha,
} from "../../services/SqliteService";
import { lookForPerchas } from "../../services/SeleccionesService";
import ConfirmationModal from "../../components/ConfirmationModal";
import { realizarConsulta } from "../../common/sqlite_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataTime, generateUIDD } from "../../services/GenerateID";
import ModernaContext from "../../context/ModernaContext";
import SAVE_ANIMATION from "../../../assets/save.json";
import { ProgressBar } from "../../components/ProgressBar";
import { TarjPercha } from "../../components/TarjetaPercha";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import LoaderModal from "../../components/LoaderModal";
import {
  deleteRegisterAudit,
  getCurrentScreenInformation,
  getCurrentScreenInformationLocal,
  saveCurrentScreenUser,
} from "../../utils/Utils";
import { RecuperarToken } from "../../services/onedrive";
import { useIsFocused } from "@react-navigation/native";
import { useFonts } from "expo-font";

export const Racks = ({ navigation }) => {
  const [valueGeneralValidate, setValueGeneralValidate] = useState();
  const [valueModerna, setValueModerna] = useState();
  const [category, setCategory] = useState([]);
  const [rack, setRack] = useState([]);
  const [checked, setChecked] = useState(false);
  const [errorPercha, setErrorPercha] = useState();
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [idPercha] = useState(generateUIDD());
  const { userInfo } = useContext(ModernaContext);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infoScreen, setInfoScreen] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const initDataLocal = async () => {
      await getCurrentScreenInformation();
      getInfoDatBaseScreen();
    };
    initDataLocal();
    setTimeout(() => {
      initDataLocal();
    }, 2000);
  }, [isFocused]);

  const getInfoDatBaseScreen = () => {
    try {
      if (global.userInfoScreen.userInfo.nombre_pantalla != "rack") {
        return;
      }

      const tmpInfoExtra = JSON.parse(
        global.userInfoScreen.userInfo.extra_info
      );
      const tmpPantalla = tmpInfoExtra.pantallas.rack;
      const infoExtra = tmpPantalla.extra_info;
      const newObj = {
        ...infoExtra,
        ...global.userInfoScreen.infoScreen,
      };

      let tempItems = infoExtra.category.split("**");
      // console.log("tempItems SPOPLIT-------------", tempItems)
      tempItems = tempItems.filter((item) => item.length > 0 && item != ",");
      // console.log("tempItems FILTER-------------", tempItems)
      tempItems = tempItems.map((item) => {
        return JSON.parse(item);
      });
      // console.log("tempItems-------------", tempItems)
      setCategory(Object.assign([], tempItems));
      setInfoScreen(Object.assign({}, newObj));
      setShowButton2(true);
      setShowButton1(false);
      AsyncStorage.setItem("id_cliente", infoExtra.auditorias_id.id_cliente);
      AsyncStorage.setItem(
        "nombre_cliente",
        infoExtra.auditorias_id.nombre_cliente
      );
      AsyncStorage.setItem("id_sucursal", infoExtra.auditorias_id.id_sucursal);
      AsyncStorage.setItem(
        "nombre_sucursal",
        infoExtra.auditorias_id.nombre_sucursal
      );
      AsyncStorage.setItem(
        "id_portafolio_auditoria",
        infoExtra.auditorias_id.id_portafolio_auditoria
      );
      AsyncStorage.setItem(
        "id_preciador",
        infoExtra.auditorias_id.id_preciador
      );
      AsyncStorage.setItem("id_percha", infoExtra.auditorias_id.id_percha);
    } catch (error) {
      setCategory([]);
      setInfoScreen(null);
      setShowButton2(false);
      setShowButton1(true);
      console.log(error);
    }
  };

  useEffect(() => {
    //RecuperarToken();
    console.log("IDPERCHA", idPercha);
  }, []);

  const handleOpenModal = async () => {
    try {
      await validate();
      //setIsModalVisible(false);
      //setShowButton2(true)
      //setShowButton1(false)
    } catch (error) {
      // setIsModalVisible(false)
    }
  };
  const consultarYCopiarContenido = async () => {
    const idGroupClient = await AsyncStorage.getItem("idGroupClient");
    try {
      // Realiza la consulta a la base de datos
      /*const resultadoConsulta = await realizarConsulta("SELECT * FROM percha");
      console.log("percha llanda:", resultadoConsulta);*/

      const resultadoConsultaPlanograma = await realizarConsulta(
        "SELECT * FROM planograma"
      );
      const planogramaFiltro = resultadoConsultaPlanograma
        .filter((objeto) => objeto.id_grupo_cliente === idGroupClient)
        .map((objeto) => {
          return {
            id: objeto.id_categoria,
            name: objeto.nombre_categoria,
            images: {
              url_imagen1: objeto.url_imagen1,
              url_imagen2: objeto.url_imagen2,
              url_imagen3: objeto.url_imagen3,
            },
          };
        });

      const newArrayEstado = planogramaFiltro.map((objeto) => {
        console.log("idQva:", objeto.id_percha);
        return {
          id: objeto.id,
          id_percha: idPercha,
          name: objeto.name,
          carasGeneral: 0,
          carasModerna: 0,
          imagesPlanograma: objeto.images,
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });

      /*const newArray = resultadoConsulta.reduce((uniqueArray, obj) => {
        if (!uniqueArray.some((item) => item.categoria === obj.categoria)) {
          uniqueArray.push(obj);
        }
        return uniqueArray;
      }, []);*/
      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta),

      if (global.userInfoScreen.userInfo.nombre_pantalla != "rack") {
        setCategory(newArrayEstado);
        setRack(planogramaFiltro);
      }

      // console.log(
      //   "CATEGORIAS EN EXISTENCIA:  -      ---------------------------",
      //   resultadoConsulta
      // );

      // console.log(
      //   "ESTO ME TRAE DE LOS PLANOGRAMAS:-  -- - - :  -      ---------------------------",
      //   resultadoConsultaPlanograma
      // );
      // console.log("Copia de contenido completada con éxito: ", newArrayEstado);
      // console.log("ARRAY DE PLANOGRAMA: ", planogramaFiltro);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

  /*useEffect(() => {
    console.log("CATEGORIAS DISPONIBLES: ", category);
  }, []);*/
  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  const validate = async () => {
    console.log("VALIDACION DE DATOS DE PERCHAS: ", category);
    if (errorPercha !== "") {
      setErrorPercha("* Los campos número de caras no pueden estar vacios");
      //setValidatePass(false)
    }
    if (category.length === 0) {
      await AsyncStorage.setItem("id_percha", "null");
      setIsModalVisible(false);
      navigation.navigate("promos");
    } else {
      const isValid = category.every((item) => {
        console.log("ItemModerna:", item);
        if (
          item.state === null ||
          item.carasGeneral === null ||
          item.carasModerna === null
        ) {
          console.log("ESTE ITEM DA PROBLEMAS: ", item);
          return false;
        }
        if (item.state === 1) {
          if (!item.images || item.images.image1 === null) {
            console.log("ESTE ITEM DA PROBLEMAS DE VALORES O IMAGEN: ", item);
            return false;
          }
        }
        return true;
      });

      if (!isValid) {
        //setErrorPercha("* Los campos número de caras no pueden estar vacios");
        //setErrorPercha("* Los campos número de caras no pueden estar vacios");
        Alert.alert(
          "Error al completar los datos",
          "Necesita marcar el valor respectivo de cada una de las perchas indicadas y tomar la fotografía."
        );
        //navigation.navigate('rack');
        console.log("\nCONTENIDO DE PERCHAS: ", JSON.stringify(category));
      } else {
        if (errorPercha === "" && valueGeneralValidate === "") {
          setIsModalVisible(true);
          try {
            console.log("IDPERCHA21", idPercha);

            await AsyncStorage.setItem("id_percha", idPercha);
            let x = await AsyncStorage.getItem("id_percha");
            console.log("IDPERCHA2", x);
            console.log(
              "PERCHAS QUE VAN A SER GUARDADOS: ",
              JSON.stringify(category)
            );
            console.log("RACKS:", category);
            category.map((productos) => {
              const { id_percha, id, state, carasGeneral, carasModerna, images } =
                productos;
              console.log("carasGenerales:", carasGeneral);
              console.log("carasmODERNA:", carasModerna);

              const { image1, image2, image3 } = images;
              console.log(
                "---------------------- imagenes",
                JSON.stringify(images)
              );
              console.log("PRODUC:", productos);
              let dataSave = {
                tableName: "percha",
                dataInsertType: [
                  "id_percha",
                  "id_categoria",
                  "estado_percha",
                  "categoria_general",
                  "categoria_moderna",
                  "url_imagen1",
                  "url_imagen2",
                  "url_imagen3",
                  "usuario_creacion",
                  "fecha_creacion",
                  "fecha_modificacion",
                ],
                dataInsert: [
                  `'${idPercha}'`,
                  `'${id}'`,
                  `'${state}'`,
                  `'${parseInt(carasGeneral)}'`,
                  `'${parseInt(carasModerna)}'`,
                  `'${image1}'`,
                  `'${image2}'`,
                  `'${image3}'`,
                  `'${userInfo.givenName}'`,
                  `'${dataTime()}'`,
                  `'${dataTime()}'`,
                ],
              };
              const sentence =
                "INSERT INTO " +
                dataSave.tableName +
                " (" +
                dataSave.dataInsertType.join() +
                ") VALUES(" +
                dataSave.dataInsert.join() +
                ")";
              console.log("SENTENCIA A EJECUTAR: ", sentence);

              console.log("TODO BIEN");
              // navigation.navigate("promos");rrrrrrrrrr
              try {
                db_insertGlobalDataAudit(dataSave);
                setIsModalVisible(false);
                setShowButton1(false);
                setShowButton2(true);
              } catch (error) {
                Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
                setIsModalVisible(false);
              }
            });
            let tempDataScreen = category.map((item) => {
              return `**${JSON.stringify(item)}**`;
            });
            let objUserInfo = {};

            try {
              // objUserInfo =  JSON.parse(global.userInfoScreen.userInfo.extra_info.pantallas.rack)
              // const tmpInfoExtra = JSON.parse(global.userInfoScreen.userInfo.extra_info)
              // const tmpPantalla = tmpInfoExtra.pantallas.rack
              // const infoExtra = tmpPantalla.extra_info
              // objUserInfo = infoExtra
              const tmpInfoExtra = JSON.parse(
                global.userInfoScreen.userInfo.extra_info
              );
              const tmpPantalla = tmpInfoExtra.pantallas.prices;
              const infoExtra = tmpPantalla.extra_info;
              objUserInfo = infoExtra;
              objUserInfo = {
                ...objUserInfo,
                ...{
                  pantallas: tmpInfoExtra.pantallas,
                },
              };
            } catch (e) {
              try {
                // const userInfoScreenTmp = await getCurrentScreenInformationLocal()
                // const tempPantalla = JSON.parse(userInfoScreenTmp.userInfo.extra_info)
                // objUserInfo = tempPantalla
                // // objUserInfo = JSON.parse(userInfoScreenTmp.userInfo.extra_info)
                const userInfoScreenTmp =
                  await getCurrentScreenInformationLocal();
                const tempPantalla = JSON.parse(
                  userInfoScreenTmp.userInfo.extra_info
                );
                objUserInfo = tempPantalla.pantallas.prices.extra_info;
                objUserInfo = {
                  ...objUserInfo,
                  ...{
                    pantallas: tempPantalla.pantallas,
                  },
                };
              } catch (error) {
                objUserInfo = {};
                console.log(e);
              }
            }
            saveCurrentScreenUser(
              {
                screenName: `rack`,
                tableName: `percha`,
                itemId: `id_percha`,
                columnId: `id_percha`,
              },
              {
                // category: tempDataScreen.toString(),
                // auditorias_id: {
                //   ...objUserInfo.auditorias_id ? objUserInfo.auditorias_id : {}, ...{
                //     id_percha: idPercha
                //   }
                // },
                pantallas: {
                  ...(objUserInfo.pantallas ? objUserInfo.pantallas : {}),
                  ...{
                    rack: {
                      principal: {
                        screenName: `rack`,
                        tableName: `percha`,
                        itemId: `id_percha`,
                        columnId: `id_percha`,
                      },
                      extra_info: {
                        category: tempDataScreen.toString(),
                        auditorias_id: {
                          ...(objUserInfo.auditorias_id
                            ? objUserInfo.auditorias_id
                            : {}),
                          ...{
                            id_percha: idPercha,
                          },
                        },
                        pantallas: {
                          ...(objUserInfo.pantallas ? objUserInfo.pantallas : {}),
                          rack: null,
                        },
                      },
                    },
                  },
                },
              }
            );
          } catch (e) {
            Alert.alert(
              "Error antes de  insertar los datos",
              "Vuelva a intentarlo"
            );
            setIsModalVisible(false);
            //setShowButton1(true);
            //setShowButton2(false);
          }
          console.log("TODO BIEN");
          //navigation.navigate('rack');
          //navigation.navigate("promos");
        }
      }
    }
  };
  const handleDeleteRegisterLocal = async () => {
    const id_percha = await AsyncStorage.getItem("id_percha");
    // console.log("=========================================================================================================idPreciador.auditorias_id.id_preciador----idPreciador----",idPreciador)
    if (infoScreen) {
      saveCurrentScreenUser(infoScreen.pantallas.prices.principal, infoScreen);
    } else {
      const userInfoScreenTmp = await getCurrentScreenInformationLocal();
      const objUserInfo = JSON.parse(userInfoScreenTmp.userInfo.extra_info);
      saveCurrentScreenUser(
        objUserInfo.pantallas.prices.principal,
        objUserInfo
      );
    }

    // newComplementaryPortfolio.map((productos) => {

    deleteRegisterAudit({
      tableName: "percha",
      objectId: "id_percha",
      valueId: id_percha,
    });

    //})
  };

  const [fontLoaded] = useFonts({
    Metropolis: require("../../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          navigation.navigate("prices");
          handleDeleteRegisterLocal();
        }}
        warning={"¿Está seguro de querer cancelar el progreso actual?"}
      />
      <View style={{ flex: 1, width: "100%" }}>
        <ModernaHeader />
      </View>
      <LoaderModal
        animation={SAVE_ANIMATION}
        visible={isModalVisible}
        warning={"subiendo datos"}
      />
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={2} />
        <ScreenInformation
          title={"Perchas"}
          text={
            "Selecciona las perchas de los productos disponibles en el punto de venta actual"
          }
        />
        <View style={styles.cardContainer}>
          {category.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontFamily: "Metropolis" }}>
                No hay perchas asignadas para este grupo de cliente
              </Text>
            </View>
          ) : (
            <TarjPercha
              //data={category}
              isUserScreen={infoScreen ? true : false}
              data={category}
              rack={rack}
              setValueGeneralValidate={setValueGeneralValidate}
              // setRack={rsetRack}
              errorPercha={errorPercha}
              setErrorPercha={setErrorPercha}
              setData={setCategory}
              view={"audit"}
            />
          )}

          {/* {
            !infoScreen && <TarjPercha
              //data={category}
              isUserScreen={ false}
              data={category}
              rack={rack}
              // setRack={rsetRack}
              setData={setCategory}
              view={"audit"}
            />
          } */}
        </View>
      </View>
      <DoubleDualStyledButton
        titleLeft={"Cancelar"}
        sizeLeft={theme.buttonSize.df}
        colorLeft={theme.colors.modernaYellow}
        iconLeft={"cancel"}
        typeLeft={"material-icon"}
        onPressLeft={() => setIsModalVisibleClose(true)}
        titleRigth={"Guardar"}
        sizeRigth={theme.buttonSize.df}
        iconRigth={"content-save-all-outline"}
        typeRigth={"material-community"}
        colorRigth={theme.colors.modernaRed}
        onPressRigth={handleOpenModal}
        showButton1={showButton1}
        showButton2={showButton2}
        titleRigthSecond={"Siguiente"}
        sizeRigthSecond={theme.buttonSize.df}
        //iconRigth={"content-save-all-outline"}
        //typeRigth={"material-community"}
        colorRigthSecond={theme.colors.modernaRed}
        onPressRigthSecond={() => navigation.navigate("promos")}
        iconRigthSecond={"arrow-right-circle"}
        typeRigthSecond={"feather"}
        showButton1Second={showButton1}
        showButton2Second={showButton2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 12,
    width: theme.dimensions.maxWidth,
    backgroundColor: "white",
    //borderTopStartRadius: 15,
    //borderTopEndRadius: 15,
    alignItems: "center",
    padding: 20,
  },
  cardContainer: {
    flex: 9,
    //height: 160,
    //borderWidth: 1,
    width: "100%",
    marginVertical: 5,
    //marginHorizontal:10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor:'blue',
  },
});
