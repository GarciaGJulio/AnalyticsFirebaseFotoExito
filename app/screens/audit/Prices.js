import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import theme from "../../theme/theme";
import DoubleStyledButton from "../../components/DoubleStyledButton";
import ScreenInformation from "../../components/ScreenInformation";
import CheckBoxContainer from "../../components/CheckBoxContainer";
import ModernaHeader from "../../components/ModernaHeader";
import { Divider } from "@rneui/base";
import ConfirmationModal from "../../components/ConfirmationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { realizarConsulta } from "../../common/sqlite_config";
import { dataTime, generateUIDD } from "../../services/GenerateID";
import { ModernaContext } from "../../context/ModernaProvider";
import { db_insertGlobalDataAudit } from "../../services/SqliteService";
import { ProgressBar } from "../../components/ProgressBar";
import { FlashListPrices } from "../../components/FlashListPrices";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import SAVE_ANIMATION from "../../../assets/save.json";

import {
  deleteRegisterAudit,
  getCurrentScreenInformation,
  getCurrentScreenInformationLocal,
  saveCurrentScreenUser,
} from "../../utils/Utils";
import { useIsFocused } from "@react-navigation/native";
import LoaderModal from "../../components/LoaderModal";
import { GlobalContext } from "../../context/GlobalContext";
import { KeyboardAvoidingView } from "react-native";
import { transfromrActualDateFormat } from "../../common/utils";
import { ClientInformation } from "../../components/ClientInformation";
import { SimpleBody } from "../../common/SimpleBody";
import { FlexContainer } from "../../common/FlexContainer";
export const Prices = ({ navigation, route }) => {
  const [newComplementaryPortfolio, setNewComplementaryPortfolio] = useState(
    []
  );
  const [newIdealPortfolio, setNewIdealPortfolio] = useState([]);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [idPreciadorPortafolioComplementario] = useState(generateUIDD());
  const [idPreciador] = useState(generateUIDD());
  const { userInfo } = useContext(ModernaContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorPrice, setErrorPrice] = useState("");
  const isAndroid = Platform.OS === "android";
  const statusBarHeight = 0;
  const navBarHeight = isAndroid ? 44 : 56;
  const headerHeight = statusBarHeight + navBarHeight;

  // let complementaryPortfolioProducts = [];
  // let idealPortfolioProducts = [];

  // try {
  //   complementaryPortfolioProducts = route?.params.complementaryPortfolioProducts
  //   idealPortfolioProducts = route?.params.idealPortfolioProducts
  const { complementaryPortfolioProducts, idealPortfolioProducts } =
    route?.params || {};

  // } catch (error) {
  //   complementaryPortfolioProducts = [];
  //   idealPortfolioProducts = [];
  //   //console.log(error)
  // }
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [infoScreen, setInfoScreen] = useState(null);
  const [hasVariable, setHasVariable] = useState(false);
  const [activo, setActivo] = useState(true);
  const [activo2, setActivo2] = useState(true);

  const isFocused = useIsFocused();
  const {
    hadSavePreciador,
    setHadSavePreciador,
    handleDoesClientHaveVariable,
    handleClearWorkFlow,
    setIsModalSaveVisible,
    handleSaveAudit,
    currentScreenPos,
    handleCurrentScreenPos,
    handleCheckCanSaveAllDataLocal,
  } = useContext(GlobalContext);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Keyboard is active
        // Add your code here to react to the keyboard being activated
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Keyboard is not active
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    setIsModalSaveVisible(false);
    const checkForVariable = async () => {
      const response = await handleDoesClientHaveVariable("Portafolio");
      setHasVariable(response);
    };
    checkForVariable();
  }, []);

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
  useEffect(() => {
    /*//console.log(
      "////////////////////newIdealPortfolio**************",
      newIdealPortfolio
    );*/
  }, [newIdealPortfolio]);
  const getInfoDatBaseScreen = () => {
    try {
      if (
        !global.userInfoScreen ||
        !global.userInfoScreen.userInfo ||
        !global.userInfoScreen.userInfo.nombre_pantalla
      ) {
        return;
      }
      //console.log("global.userInfoScreen en pricess", global.userInfoScreen);
      if (global.userInfoScreen.userInfo.nombre_pantalla != "prices") {
        return;
      }
      // const infoExtra = JSON.parse(global.userInfoScreen.userInfo.extra_info)
      // const infoExtra =  JSON.parse(global.userInfoScreen.userInfo.extra_info.pantallas.prices)

      const tmpInfoExtra = JSON.parse(
        global.userInfoScreen.userInfo.extra_info
      );
      // //console.log("tmpInfoExtra prices-----------------------------", tmpInfoExtra)
      const tmpPantalla = tmpInfoExtra.pantallas.prices;
      const infoExtra = tmpPantalla.extra_info;
      const newObj = {
        ...infoExtra,
        ...global.userInfoScreen.infoScreen,
      };

      let tempItems = infoExtra.fullDataProducts.split("**");
      // //console.log("tempItems SPOPLIT-------------", tempItems)
      tempItems = tempItems.filter((item) => item.length > 0 && item != ",");
      // //console.log("tempItems FILTER-------------", tempItems)
      tempItems = tempItems.map((item) => {
        return JSON.parse(item);
      });

      let tempItemsIdeal = infoExtra.newIdealPortfolio.split("**");
      // //console.log("tempItems SPOPLIT-------------", tempItems)
      tempItemsIdeal = tempItemsIdeal.filter(
        (item) => item.length > 0 && item != ","
      );
      // //console.log("tempItems FILTER-------------", tempItems)
      tempItemsIdeal = tempItemsIdeal.map((item) => {
        return JSON.parse(item);
      });

      // //console.log("tempItems-------------", tempItems)
      //console.log("tempItems en prices", tempItems);
      setNewIdealPortfolio(tempItemsIdeal);
      setNewComplementaryPortfolio(Object.assign([], tempItems));
      setInfoScreen(Object.assign({}, newObj));
      setShowButton2(true);
      setShowButton1(false);
      setHadSavePreciador(true);
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
      // //console.log(
      //   "infoExtra.auditorias_id.id_preciador--------",
      //   infoExtra.auditorias_id.id_preciador
      // );
      AsyncStorage.setItem(
        "id_preciador",
        infoExtra.auditorias_id.id_preciador
      );
    } catch (error) {
      //console.log("errrrorrrrrr en prices", error);
      setNewIdealPortfolio([]);
      setNewComplementaryPortfolio([]);
      setInfoScreen(null);
      setShowButton2(false);
      setShowButton1(true);
    }
  };

  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);

  const HandleNavigationOfVariables = (item) => {
    console.log("llamda desde --------------", item);
    const continueAudit = () => {
      let checkvariables = true;
      const checkForVariable = async () => {
        const response = await handleDoesClientHaveVariable("Percha");
        checkvariables = response;
        //console.log("VARIABLE DE PERCHAS EXISTE:",response)
        if (checkvariables === true) {
          navigation.navigate("rack");
        } else {
          navigation.navigate("promos");
        }
      };
      checkForVariable();
    };
    continueAudit();
  };

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  useEffect(() => {
    const getNewArrays = async () => {
      if (
        global.userInfoScreen &&
        global.userInfoScreen.userInfo &&
        global.userInfoScreen.userInfo.nombre_pantalla
      ) {
        if (
          !global.userInfoScreen ||
          !global.userInfoScreen.userInfo ||
          !global.userInfoScreen.userInfo.nombre_pantalla ||
          global.userInfoScreen.userInfo.nombre_pantalla != "prices"
        ) {
          setNewComplementaryPortfolio([...complementaryPortfolioProducts]);
          setNewIdealPortfolio([...idealPortfolioProducts]);
          ////console.log("NUEVO ARRAY FORMATEADO: ", filteredItems);
          //console.log("ESTO LLEGA A LA PANTALLA PRECIO - - - - - -");
          //console.log("PORTAFOLIO IDEAL: ", JSON.stringify(newIdealPortfolio));
          // //console.log(
          //   "PORTAFOLIO COMPLEMENTARIO: ",
          //   JSON.stringify(newComplementaryPortfolio)
          // );
        }
      }
    };
    if (complementaryPortfolioProducts) {
      getNewArrays();
    }
  }, [complementaryPortfolioProducts]);

  const validateData = () => {
    const fullArrays = [...newIdealPortfolio, ...newComplementaryPortfolio];
    //console.log("LISTA COMPLETA DE ARRAYS:", fullArrays);

    const isDataValid = fullArrays.every((item) => {
      if (item.state === null) {
        //console.log("ESTE ITEM DA PROBLEMAS: ", item);
        return false;
      }
      if (item.state === 1) {
        if (
          item.price === null ||
          item.price === 0.0 ||
          errorPrice !== "" ||
          !item.images ||
          item.images.image1 === null
        ) {
          //console.log("ESTE ITEM DA PROBLEMAS DE PRECIO O IMAGEN: ", item);
          return false;
        }
      }
      return true;
    });

    return isDataValid;
  };

  const dataId = async () => {
    // //console.log(
    //   "\nDESDE PRECIADOR *********************************************************\n"
    // );
    let idPreciador = await AsyncStorage.getItem("id_preciador"); //si
    let idPercha = await AsyncStorage.getItem("id_percha"); //si
    let idSucursal = await AsyncStorage.getItem("id_sucursal"); //si
    let idCliente = await AsyncStorage.getItem("id_cliente"); //si
    let nombreCliente = await AsyncStorage.getItem("nombre_cliente"); //si
    let nombreSucursal = await AsyncStorage.getItem("nombre_sucursal");
    let idPortafolioAuditoria = await AsyncStorage.getItem(
      "id_portafolio_auditoria"
    ); //si
    // //console.log(
    //   "\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n\n"
    // );
    //console.log("ID DE PRECIADOR: ", idPreciador);
    //console.log("ID DE PERCHA: ", idPercha);
    //console.log("ID DE SUCURSAL: ", idSucursal);
    //console.log("ID DE CLIENTE: ", idCliente);
    //console.log("NOMBRE CLIENTE: ", nombreCliente);
    //console.log("NOMBRE SUCURSAL: ", nombreSucursal);
    //console.log("ID DEL PORTAFOLIO AUDITORIA: ", idPortafolioAuditoria);
  };

  useEffect(() => {
    dataId();
  }, []);

  const initValidateArrays = () => {
    validateArrays();
  };

  const validateArrays = async () => {
    const fullArrays = [...newIdealPortfolio, ...newComplementaryPortfolio];
    //console.log("LISTA COMPLETA DE ARRAYS:", fullArrays);
    if (fullArrays.length == 0) {
      console.log(
        "NO TIENES DATOPS - - - - - - - - - - *- *- *- *- -*- *- ",
        fullArrays
      );
      handleCurrentScreenPos();
      handleCheckCanSaveAllDataLocal(
        () => {
          setTimeout(() => handleSaveAudit(userInfo, navigation), 1000);
        },
        () => {
          HandleNavigationOfVariables(1);
        },
        null,
        2
      );
    } else {
      if (errorPrice != "") {
        setErrorPrice("* El campo precio es debe ser llenado correctamente");
        //setValidatePass(false)
      }
      const isValid = fullArrays.every((item) => {
        if (item.state === null) {
          //console.log("ESTE ITEM DA PROBLEMAS: ", item);
          return false;
        }
        if (item.state === 1) {
          if (
            item.price === null ||
            errorPrice != "" ||
            !item.images ||
            item.images.image1 === null
          ) {
            //console.log("ESTE ITEM DA PROBLEMAS DE PRECIO O IMAGEN: ", item);
            return false;
          }
        }
        return true;
      });

      if (!isValid) {
        Alert.alert(
          "Error al registrar los datos",
          "Necesita ingresar el precio y tomar la foto por cada producto seleccionado."
        );
        //navigation.navigate('rack');
        //console.log("PORTAFOLIO IDEAL: ", JSON.stringify(newIdealPortfolio));
        // //console.log(
        //   "PORTAFOLIO COMPLEMENTARIO: ",
        //   JSON.stringify(newComplementaryPortfolio)
        // );
      } else {
        // setIsModalVisible(true);
        setIsModalSaveVisible(true);
        const fullDataProducts = newIdealPortfolio.concat(
          newComplementaryPortfolio
        );
        try {
          await AsyncStorage.setItem("id_preciador", idPreciador);
          // //console.log(
          //   "PRODUCTOS QUE VAN A SER GUARDADOS: ",
          //   JSON.stringify(fullDataProducts)
          // );
          fullDataProducts.map((productos) => {
            const { id_portafolio, id, state, price, images } = productos;
            const { image1, image2, image3 } = images;
            let dataSave = {
              tableName: "preciador",
              dataInsertType: [
                "id_preciador",
                "id_portafolio",
                "id_producto",
                "precio",
                "estado",
                "url_imagen1",
                "url_imagen2",
                "url_imagen3",
                "usuario_creacion",
                "fecha_creacion",
                "fecha_modificacion",
              ],
              dataInsert: [
                `'${idPreciador}'`,
                `'${id_portafolio}'`,
                `'${id}'`,
                `${parseFloat(price)}`,
                `${state ? 1 : 0}`,
                `'${image1}'`,
                `'${image2}'`,
                `'${image3}'`,
                `'${userInfo.mail}'`,
                `'${transfromrActualDateFormat(dataTime(), "F")}'`,
                `'${transfromrActualDateFormat(dataTime(), "F")}'`,
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
            //console.log("SENTENCIA A EJECUTAR: ", sentence);
            try {
              // subidaBaseRemote(dataSave.tableName, dataSave.dataInsertType, dataSave.dataInsertRemote)

              db_insertGlobalDataAudit(dataSave);
              //console.log("TODO BIEN PARA GUARDAR");
              //setShowButton1(false);
              //setShowButton2(true);
              // setIsModalVisible(false);
              //setIsModalSaveVisible(false);

              //savePreciador();
            } catch (e) {
              Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
              //  setIsModalVisible(false);
              setIsModalSaveVisible(false);
            }
          });
          setHadSavePreciador(true);
          handleCurrentScreenPos();
          handleCheckCanSaveAllDataLocal(
            () => {
              setTimeout(() => handleSaveAudit(userInfo, navigation), 1500);
            },
            () => {
              setIsModalSaveVisible(false);
              setShowButton1(false);
              setShowButton2(true);
              HandleNavigationOfVariables(2);
            },
            null,
            3
          );
          let tempDataScreen = newComplementaryPortfolio.map((item) => {
            return `**${JSON.stringify(item)}**`;
          });
          let tempDataScreenIdeal = newIdealPortfolio.map((item) => {
            return `**${JSON.stringify(item)}**`;
          });

          let objUserInfo = {};
          try {
            const tmpInfoExtra = JSON.parse(
              global.userInfoScreen.userInfo.extra_info
            );
            const tmpPantalla = tmpInfoExtra.pantallas.briefcase;
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
              const userInfoScreenTmp =
                await getCurrentScreenInformationLocal();
              const tempPantalla = JSON.parse(
                userInfoScreenTmp.userInfo.extra_info
              );
              objUserInfo = tempPantalla.pantallas.briefcase.extra_info;
              objUserInfo = {
                ...objUserInfo,
                ...{
                  pantallas: tempPantalla.pantallas,
                },
              };
            } catch (error) {
              objUserInfo = {};
              //console.log(e);
            }
          }
          saveCurrentScreenUser(
            {
              screenName: `prices`,
              tableName: `preciador`,
              itemId: `id_preciador`,
              columnId: `id_preciador`,
            },
            {
              // fullDataProducts: tempDataScreen.toString(),
              // auditorias_id: {
              //   ...objUserInfo.auditorias_id ? objUserInfo.auditorias_id : {}, ...{
              //     id_preciador: idPreciador
              //   }
              // },
              pantallas: {
                // ...(objUserInfo.pantallas ? objUserInfo.pantallas : {}),
                // ...{
                prices: {
                  principal: {
                    screenName: `prices`,
                    tableName: `preciador`,
                    itemId: `id_preciador`,
                    columnId: `id_preciador`,
                  },
                  extra_info: {
                    fullDataProducts: tempDataScreen.toString(),
                    newIdealPortfolio: tempDataScreenIdeal.toString(),
                    auditorias_id: {
                      ...(objUserInfo.auditorias_id
                        ? objUserInfo.auditorias_id
                        : {}),
                      ...{
                        id_preciador: idPreciador,
                      },
                    },
                    // pantallas: {
                    //   ...(objUserInfo.pantallas ? objUserInfo.pantallas : {}),
                    //   prices: null,
                    // },
                  },
                },
                // },
              },
            }
          );
        } catch (e) {
          Alert.alert(
            "Error antes de  insertar los datos",
            "Vuelva a intentarlo"
          );
          //setIsModalVisible(false);
          setIsModalSaveVisible(false);

          setHadSavePreciador(false);
        }
      }
    }
  };

  const onlyNavigation = () => {
    handleCurrentScreenPos();
    handleCheckCanSaveAllDataLocal(
      () => {
        handleSaveAudit(userInfo, navigation);
      },
      () => {
        HandleNavigationOfVariables(3);
      },
      null,
      1
    );
  };
  const handleDeleteRegisterLocal = async () => {
    setHadSavePreciador(false);
    const idPreciador = await AsyncStorage.getItem("id_preciador");
    // //console.log("=========================================================================================================idPreciador.auditorias_id.id_preciador----idPreciador----",idPreciador)
    if (infoScreen) {
      saveCurrentScreenUser(
        infoScreen.pantallas.briefcase.principal,
        infoScreen
      );
    } else {
      const userInfoScreenTmp = await getCurrentScreenInformationLocal();
      const objUserInfo = JSON.parse(userInfoScreenTmp.userInfo.extra_info);
      saveCurrentScreenUser(
        objUserInfo.pantallas.briefcase.principal,
        objUserInfo
      );
    }

    // newComplementaryPortfolio.map((productos) => {

    deleteRegisterAudit({
      tableName: "preciador",
      objectId: "id_preciador",
      valueId: idPreciador,
    });

    //})
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.headerContainer}>
        <View style={{ width: "100%", height: 40 }}>
          <ModernaHeader />
        </View>
        <ConfirmationModal
          visible={isModalVisibleClose}
          onClose={handleCloseModal}
          onPress={() => {
            // handleDeleteRegisterLocal();
            handleClearWorkFlow();
            navigation.navigate("menu");
          }}
          warning={"¿Está seguro de cancelar el progreso actual?"}
        />
        <View style={{ height: 800 }}>
          <ClientInformation />
          <ProgressBar currentStep={currentScreenPos} />
          <View style={{ alignItems: "center" }}>
            {hasVariable ? (
              <ScreenInformation
                title={"Preciador"}
                text={
                  "Selecciona los productos que poseen preciador, completando los campos respectivos de cada producto"
                }
              />
            ) : (
              <ScreenInformation
                title={"Preciador"}
                text={
                  "Selecciona los productos que poseen preciador, completando los campos respectivos de cada producto"
                }
                clean
              />
            )}
          </View>
        </View>
      </View>
      <SimpleBody>
        <FlexContainer>
          <View style={styles.contentContainer}>
            {infoScreen && (
              <FlashListPrices
                title={"Portafolio Ideal"}
                products={newIdealPortfolio}
                setProducts={setNewIdealPortfolio}
                isUserScreen={true}
                errorPrice={errorPrice}
                setErrorPrice={setErrorPrice}
                //idPreciador={idPreciadorPortafolioComplementario}
                //idPortafolio={idPortafolioComplementario}
                setActivoItem={setActivo}
              />
            )}
            {!infoScreen && (
              <FlashListPrices
                title={"Portafolio Ideal"}
                products={newIdealPortfolio}
                setProducts={setNewIdealPortfolio}
                isUserScreen={false}
                errorPrice={errorPrice}
                setErrorPrice={setErrorPrice}
                setActivoItem={setActivo}

                //idPreciador={idPreciadorPortafolioComplementario}
                //idPortafolio={idPortafolioComplementario}
              />
            )}
            <View
              style={{
                width: theme.dimensions.maxWidth / 1.1,
                //marginVertical: 5,
              }}
            >
              <Divider
                width={2}
                color={"#D9D9D9"}
                style={{ backgroundColor: "blue" }}
              />
            </View>
            {infoScreen && (
              <FlashListPrices
                title={"Portafolio Complementario"}
                products={newComplementaryPortfolio}
                setProducts={setNewComplementaryPortfolio}
                isUserScreen={true}
                errorPrice={errorPrice}
                setErrorPrice={setErrorPrice}
                setActivoItem={setActivo2}
                //idPreciador={idPreciadorPortafolioComplementario}
                //idPortafolio={idPortafolioComplementario}
              />
            )}
            {!infoScreen && (
              <FlashListPrices
                title={"Portafolio Complementario"}
                products={newComplementaryPortfolio}
                setProducts={setNewComplementaryPortfolio}
                isUserScreen={false}
                errorPrice={errorPrice}
                setErrorPrice={setErrorPrice}
                setActivoItem={setActivo2}
                //idPreciador={idPreciadorPortafolioComplementario}
                //idPortafolio={idPortafolioComplementario}
              />
            )}

            {/* <View
              style={{
                height:
                  activo2 === true && activo == true
                    ? "50%"
                    : activo2 === true && activo == false
                    ? "10%"
                    : activo2 === false && activo == true
                    ? "90%"
                    : "10%",
                width: "100%",
                //backgroundColor: "blue",
                marginVertical: 10,
                alignItems: "center",
              }}
            >
              {infoScreen && (
                <FlashListPrices
                  title={"Portafolio Ideal"}
                  products={newIdealPortfolio}
                  setProducts={setNewIdealPortfolio}
                  isUserScreen={true}
                  errorPrice={errorPrice}
                  setErrorPrice={setErrorPrice}
                  //idPreciador={idPreciadorPortafolioComplementario}
                  //idPortafolio={idPortafolioComplementario}
                  setActivoItem={setActivo}
                />
              )}
              {!infoScreen && (
                <FlashListPrices
                  title={"Portafolio Ideal"}
                  products={newIdealPortfolio}
                  setProducts={setNewIdealPortfolio}
                  isUserScreen={false}
                  errorPrice={errorPrice}
                  setErrorPrice={setErrorPrice}
                  setActivoItem={setActivo}

                  //idPreciador={idPreciadorPortafolioComplementario}
                  //idPortafolio={idPortafolioComplementario}
                />
              )}
            </View>
            <View
              style={{
                width: theme.dimensions.maxWidth / 1.1,
                //marginVertical: 5,
              }}
            >
              <Divider
                width={2}
                color={"#D9D9D9"}
                style={{ backgroundColor: "blue" }}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                // backgroundColor:"red",
                height:
                  activo2 === true && activo == true
                    ? "50%"
                    : activo2 === true && activo == false
                    ? "87%"
                    : activo2 === false && activo == true
                    ? "10%"
                    : "10%",
              }}
            >
              {infoScreen && (
                <FlashListPrices
                  title={"Portafolio Complementario"}
                  products={newComplementaryPortfolio}
                  setProducts={setNewComplementaryPortfolio}
                  isUserScreen={true}
                  errorPrice={errorPrice}
                  setErrorPrice={setErrorPrice}
                  setActivoItem={setActivo2}
                  //idPreciador={idPreciadorPortafolioComplementario}
                  //idPortafolio={idPortafolioComplementario}
                />
              )}
              {!infoScreen && (
                <FlashListPrices
                  title={"Portafolio Complementario"}
                  products={newComplementaryPortfolio}
                  setProducts={setNewComplementaryPortfolio}
                  isUserScreen={false}
                  errorPrice={errorPrice}
                  setErrorPrice={setErrorPrice}
                  setActivoItem={setActivo2}
                  //idPreciador={idPreciadorPortafolioComplementario}
                  //idPortafolio={idPortafolioComplementario}
                />
              )}
            </View> */}
          </View>
        </FlexContainer>
      </SimpleBody>
      <View style={{ height: 50, width: "100%" }}>
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
          onPressRigth={hadSavePreciador ? onlyNavigation : validateArrays}
          // showButton1={false}
          // showButton2={showButton2}
          //titleRigthSecond={"Siguiente"}
          //sizeRigthSecond={theme.buttonSize.df}
          //colorRigthSecond={theme.colors.modernaRed}
          // onPressRigthSecond={() => navigation.navigate("rack")}
          // showButton1Second={showButton1}
          // showButton2Second={showButton2}
          // iconRigthSecond={"arrow-right-circle"}
          // typeRigthSecond={"feather"}
          //cambios del merge
          disableAction={!validateData()}
          showButton1={true}
          // showButton2={showButton2}
          // titleRigthSecond={"Siguiente"}
          // sizeRigthSecond={theme.buttonSize.df}
          // colorRigthSecond={theme.colors.modernaRed}
          // onPressRigthSecond={() => navigation.navigate("rack")}
          // showButton1Second={showButton1}
          // showButton2Second={showButton2}
          // iconRigthSecond={"arrow-right-circle"}
          // typeRigthSecond={"feather"}
        />
      </View>
    </ScrollView>
    // <View style={styles.container}>

    //   <View style={styles.contentContainer}>
    //     <View
    //       style={{
    //         height:
    //           activo2 === true && activo == true
    //             ? "50%"
    //             : activo2 === true && activo == false
    //             ? "10%"
    //             : activo2 === false && activo == true
    //             ? "90%"
    //             : "10%",
    //         width: "100%",
    //         //backgroundColor: "blue",
    //         marginVertical: 10,
    //         alignItems: "center",
    //       }}
    //     >
    //       {infoScreen && (
    //         <FlashListPrices
    //           title={"Portafolio Ideal"}
    //           products={newIdealPortfolio}
    //           setProducts={setNewIdealPortfolio}
    //           isUserScreen={true}
    //           errorPrice={errorPrice}
    //           setErrorPrice={setErrorPrice}
    //           //idPreciador={idPreciadorPortafolioComplementario}
    //           //idPortafolio={idPortafolioComplementario}
    //           setActivoItem={setActivo}
    //         />
    //       )}
    //       {!infoScreen && (
    //         <FlashListPrices
    //           title={"Portafolio Ideal"}
    //           products={newIdealPortfolio}
    //           setProducts={setNewIdealPortfolio}
    //           isUserScreen={false}
    //           errorPrice={errorPrice}
    //           setErrorPrice={setErrorPrice}
    //           setActivoItem={setActivo}

    //           //idPreciador={idPreciadorPortafolioComplementario}
    //           //idPortafolio={idPortafolioComplementario}
    //         />
    //       )}
    //     </View>
    //     <View
    //       style={{
    //         width: theme.dimensions.maxWidth / 1.1,
    //         //marginVertical: 5,
    //       }}
    //     >
    //       <Divider
    //         width={2}
    //         color={"#D9D9D9"}
    //         style={{ backgroundColor: "blue" }}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         width: "100%",
    //         alignItems: "center",
    //         // backgroundColor:"red",
    //         height:
    //           activo2 === true && activo == true
    //             ? "50%"
    //             : activo2 === true && activo == false
    //             ? "87%"
    //             : activo2 === false && activo == true
    //             ? "10%"
    //             : "10%",
    //       }}
    //     >
    //       {infoScreen && (
    //         <FlashListPrices
    //           title={"Portafolio Complementario"}
    //           products={newComplementaryPortfolio}
    //           setProducts={setNewComplementaryPortfolio}
    //           isUserScreen={true}
    //           errorPrice={errorPrice}
    //           setErrorPrice={setErrorPrice}
    //           setActivoItem={setActivo2}
    //           //idPreciador={idPreciadorPortafolioComplementario}
    //           //idPortafolio={idPortafolioComplementario}
    //         />
    //       )}
    //       {!infoScreen && (
    //         <FlashListPrices
    //           title={"Portafolio Complementario"}
    //           products={newComplementaryPortfolio}
    //           setProducts={setNewComplementaryPortfolio}
    //           isUserScreen={false}
    //           errorPrice={errorPrice}
    //           setErrorPrice={setErrorPrice}
    //           setActivoItem={setActivo2}
    //           //idPreciador={idPreciadorPortafolioComplementario}
    //           //idPortafolio={idPortafolioComplementario}
    //         />
    //       )}
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       flex: isKeyboardVisible ? 5 : 3,
    //       width: "100%",
    //       margin: 4,
    //       // backgroundColor:"red"
    //     }}
    //   >
    //     <DoubleDualStyledButton
    //       titleLeft={"Cancelar"}
    //       sizeLeft={theme.buttonSize.df}
    //       colorLeft={theme.colors.modernaYellow}
    //       iconLeft={"cancel"}
    //       typeLeft={"material-icon"}
    //       onPressLeft={() => setIsModalVisibleClose(true)}
    //       titleRigth={"Guardar"}
    //       sizeRigth={theme.buttonSize.df}
    //       iconRigth={"content-save-all-outline"}
    //       typeRigth={"material-community"}
    //       colorRigth={theme.colors.modernaRed}
    //       onPressRigth={hadSavePreciador ? onlyNavigation : validateArrays}
    //       // showButton1={false}
    //       // showButton2={showButton2}
    //       //titleRigthSecond={"Siguiente"}
    //       //sizeRigthSecond={theme.buttonSize.df}
    //       //colorRigthSecond={theme.colors.modernaRed}
    //       // onPressRigthSecond={() => navigation.navigate("rack")}
    //       // showButton1Second={showButton1}
    //       // showButton2Second={showButton2}
    //       // iconRigthSecond={"arrow-right-circle"}
    //       // typeRigthSecond={"feather"}
    //       //cambios del merge
    //       disableAction={!validateData()}
    //       showButton1={true}
    //       // showButton2={showButton2}
    //       // titleRigthSecond={"Siguiente"}
    //       // sizeRigthSecond={theme.buttonSize.df}
    //       // colorRigthSecond={theme.colors.modernaRed}
    //       // onPressRigthSecond={() => navigation.navigate("rack")}
    //       // showButton1Second={showButton1}
    //       // showButton2Second={showButton2}
    //       // iconRigthSecond={"arrow-right-circle"}
    //       // typeRigthSecond={"feather"}
    //     />
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: theme.dimensions.width,
    height: theme.dimensions.heigth,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    //flex: 0.3,
    height: 250,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    //height:500,
    //backgroundColor: "blue",
    width: "100%",
    //height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
