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
import ModernaContext from "../../context/ModernaContext";
import { db_insertGlobalDataAudit } from "../../services/SqliteService";
import { ProgressBar } from "../../components/ProgressBar";
import { FlashListPrices } from "../../components/FlashListPrices";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import { subidaBaseRemote } from "../../services/SubidaBaseRemota";
import { saveCurrentScreenUser } from "../../utils/Utils";

export const Prices = ({ navigation, route }) => {
  const [newComplementaryPortfolio, setNewComplementaryPortfolio] = useState(
    []
  );
  const [newIdealPortfolio, setNewIdealPortfolio] = useState([]);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [idPreciadorPortafolioComplementario] = useState(generateUIDD());
  const [idPreciador] = useState(generateUIDD());
  const { userInfo } = useContext(ModernaContext);
  // let complementaryPortfolioProducts = [];
  // let idealPortfolioProducts = [];

  // try {
  //   complementaryPortfolioProducts = route?.params.complementaryPortfolioProducts
  //   idealPortfolioProducts = route?.params.idealPortfolioProducts
  const { complementaryPortfolioProducts, idealPortfolioProducts } = route?.params || {};

  // } catch (error) {
  //   complementaryPortfolioProducts = [];
  //   idealPortfolioProducts = [];
  //   console.log(error)
  // }
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [infoScreen, setInfoScreen] = useState(null);
  useEffect(() => {
    getInfoDatBaseScreen()
  }, [])

  const getInfoDatBaseScreen = () => {
    try {
      console.log("global.userInfoScreen en pricess", global.userInfoScreen)
      if (global.userInfoScreen.userInfo.nombre_pantalla != "prices") {
        return
      }
      const infoExtra = JSON.parse(global.userInfoScreen.userInfo.extra_info)
      const newObj = {
        ...infoExtra,
        ...global.userInfoScreen.infoScreen
      }
      // console.log("newObj-------------", newObj)
      // console.log("newObj-------------", infoExtra.complementaryPortfolioProducts.split("**"))
      let tempItems = infoExtra.fullDataProducts.split("**")
      // console.log("tempItems SPOPLIT-------------", tempItems)
      tempItems = tempItems.filter((item) => item.length > 0 && item != ",")
      // console.log("tempItems FILTER-------------", tempItems)
      tempItems = tempItems.map((item) => { return JSON.parse(item) })
      // console.log("tempItems-------------", tempItems)
      setNewComplementaryPortfolio(tempItems)
      setInfoScreen(newObj)
      setShowButton2(true)
      setShowButton1(false)
      AsyncStorage.setItem("id_cliente", infoExtra.auditorias_id.id_cliente);
      AsyncStorage.setItem("nombre_cliente", infoExtra.auditorias_id.nombre_cliente);
      AsyncStorage.setItem("id_sucursal", infoExtra.auditorias_id.id_sucursal);
      AsyncStorage.setItem("nombre_sucursal", infoExtra.auditorias_id.nombre_sucursal);
      AsyncStorage.setItem("id_portafolio_auditoria", infoExtra.auditorias_id.id_portafolio_auditoria);
      AsyncStorage.setItem("id_preciador", infoExtra.auditorias_id.id_preciador);


      
    } catch (error) {
      console.log(error)
    }
  }
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

  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos

      const resultadoConsultaComp = await realizarConsulta(
        "SELECT * FROM portafolio"
      );

      // console.log(
      //   "Copia de contenido completada con éxito - PRODUCTOS: ",
      //   resultadoConsultaComp
      // );
      //console.log("ID DEL PORTAFOLIO COMP: ", id_portafolio_complementario);
    } catch (e) {
      console.log("Error al consultar o copiar el contenido:", e);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

  /*const savePreciador = async () => {
    /*let idPreciadorPortafolioComplementario = await AsyncStorage.getItem(
      "id_preciador_portafolio_complementario"
    );
    let dataSave = {
      tableName: "preciador",
      dataInsertType: [
        "id_preciador",
        "id_preciador_portafolio_complementario",
        "id_preciador_portafolio_ideal",
      ],
      dataInsert: [
        `'${idPreciador}'`,
        `'${idPreciadorPortafolioComplementario}'`,
        `'${null}'`,
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
    //db_insertGlobalDataAudit(dataSave);
  };*/

  useEffect(() => {
    const getNewArrays = async () => {
      /*let id_portafolio_complementario = await AsyncStorage.getItem(
        "id_portafolio_complementario"
      );
      const addParametersComplementaryP = complementaryPortfolioProducts.map(
        (producto) => {
          return {
            ...producto,
          };
        }
      );
      console.log(
        "ARRAY DE COMPLEMENTARIO FORMATEADO: ",
        addParametersComplementaryP
      );*/
      setNewComplementaryPortfolio([...complementaryPortfolioProducts]);
      setNewIdealPortfolio([...idealPortfolioProducts]);
      //console.log("NUEVO ARRAY FORMATEADO: ", filteredItems);
      console.log("ESTO LLEGA A LA PANTALLA PRECIO - - - - - -");
      console.log("PORTAFOLIO IDEAL: ", JSON.stringify(newIdealPortfolio));
      console.log(
        "PORTAFOLIO COMPLEMENTARIO: ",
        JSON.stringify(newComplementaryPortfolio)
      );
    };
    if (complementaryPortfolioProducts) {
      getNewArrays();
    }

  }, [complementaryPortfolioProducts]);

  const validateArrays = async () => {
    const fullArrays = [...newIdealPortfolio, ...newComplementaryPortfolio];
    console.log("LISTA COMPLETA DE ARRAYS:", fullArrays);
    if (fullArrays.length == 0) {
      console.log("NO TIENES DATOPS - - - - - - - - - *- *- *- *- *-* -*- *- ");
      navigation.navigate("rack");
    } else {
      const isValid = fullArrays.every((item) => {
        if (item.state === null) {
          console.log("ESTE ITEM DA PROBLEMAS: ", item);
          return false;
        }
        if (item.state === "1") {
          if (
            item.price === null ||
            !item.images ||
            item.images.image1 === null
          ) {
            console.log("ESTE ITEM DA PROBLEMAS DE PRECIO O IMAGEN: ", item);
            return false;
          }
        }
        return true;
      });

      if (!isValid) {
        Alert.alert(
          "Error al completar los datos",
          "Necesita marcar el valor de preciador de cada producto"
        );
        //navigation.navigate('rack');
        console.log("PORTAFOLIO IDEAL: ", JSON.stringify(newIdealPortfolio));
        console.log(
          "PORTAFOLIO COMPLEMENTARIO: ",
          JSON.stringify(newComplementaryPortfolio)
        );
      } else {
        const fullDataProducts = newIdealPortfolio.concat(
          newComplementaryPortfolio
        );
        try {
          await AsyncStorage.setItem("id_preciador", idPreciador);
          console.log(
            "PRODUCTOS QUE VAN A SER GUARDADOS: ",
            JSON.stringify(fullDataProducts)
          );
          fullDataProducts.map((productos) => {
            const { id_portafolio, id, state, price, images } = productos;
            const { image1, image2, image3 } = images;
            // console.log(
            //   "---------------------- imagenes",
            //   JSON.stringify(images)
            // );
            // console.log(
            //   "PRODUCTO ACTAUL A INSERTAR EN BASE: ",
            //   id_portafolio + " " + id
            // );
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
                "usuario_creacion ",
                "fecha_creacion",
                "fecha_modificacion"
              ],
              dataInsert: [
                `'${idPreciador}'`,
                `'${id_portafolio}'`,
                `'${id}'`,
                `'${price}'`,
                `'${state ? "1" : "0"}'`,
                `'${image1}'`,
                `'${image2}'`,
                `'${image3}'`,
                `'${userInfo.givenName}'`,
                `'${dataTime()}'`,
                `'${dataTime()}'`,
              ],
              dataInsertRemote: [
                `${idPreciador}`,
                `${id_portafolio}`,
                `${id}`,
                `${price}`,
                `${state ? 1: 0}`,
                `${image1}`,
                `${image2}`,
                `${image3}`,
                `${userInfo.givenName}`,
                `${dataTime()}`,
                `${dataTime()}`,
              
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
            try {
              // subidaBaseRemote(dataSave.tableName, dataSave.dataInsertType, dataSave.dataInsertRemote)

              db_insertGlobalDataAudit(dataSave);
              console.log("TODO BIEN");
              setShowButton1(false);
              setShowButton2(true);
              //savePreciador();
            } catch (e) {
              Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
            }
            /*db_insertGlobalDataAudit(dataSave);
            console.log("TODO BIEN");
            setShowButton1(false);
            setShowButton2(true);
            savePreciador();*/
            //navigation.navigate("rack");
          });
          let tempDataScreen = newComplementaryPortfolio.map((item) => { return `**${JSON.stringify(item)}**` })
          let objUserInfo = {}
          try {
            objUserInfo = JSON.parse(global.userInfoScreen.userInfo.extra_info)
  
          } catch (e) {
            objUserInfo = {}
            console.log(e)
          }
          saveCurrentScreenUser({
            screenName: `prices`,
            tableName: `preciador`,
            itemId: `id_preciador`,
            columnId: `id_preciador`
          },
            {
              fullDataProducts: tempDataScreen.toString(),
              auditorias_id: {
                ...objUserInfo.auditorias_id ? objUserInfo.auditorias_id : {}, ...{
                  id_preciador: idPreciador
                }
              }
            })
        } catch (e) {
          Alert.alert(
            "Error antes de  insertar los datos",
            "Vuelva a intentarlo"
          );
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => navigation.goBack()}
        warning={"¿Está seguro de querer cancelar el progreso actual?"}
      />
      <View style={styles.headerContainer}>
        <ModernaHeader />
      </View>
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={1} />
        <ScreenInformation
          title={"Preciador"}
          text={"Selecciona los productos que poseen preciador"}
        />
        <View style={{ flex: 2, width: "100%", alignItems: "center" }}>
          <FlashListPrices
            title={"Portafolio Ideal"}
            products={newIdealPortfolio}
            setProducts={setNewIdealPortfolio}
          />
        </View>
        <View
          style={{ width: theme.dimensions.maxWidth / 1.1, marginVertical: 5 }}
        >
          <Divider
            width={2}
            color={"#D9D9D9"}
            style={{ backgroundColor: "blue" }}
          />
        </View>
        <View style={{ flex: 2, width: "100%", alignItems: "center" }}>
          <FlashListPrices
            title={"Portafolio Complementario"}
            products={newComplementaryPortfolio}
            setProducts={setNewComplementaryPortfolio}
            isUserScreen={infoScreen ? true : false}
          //idPreciador={idPreciadorPortafolioComplementario}
          //idPortafolio={idPortafolioComplementario}
          />
        </View>
        <View style={{ flex: 0.45, width: "100%" }}>
          {/*<DoubleStyledButton
            titleLeft={"Cancelar"}
            sizeLeft={theme.buttonSize.df}
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => setIsModalVisibleClose(true)}
            titleRigth={"Siguiente"}
            sizeRigth={theme.buttonSize.df}
            iconRigth={"arrow-right-circle"}
            typeRigth={"feather"}
            colorRigth={theme.colors.modernaRed}
            onPressRigth={validateArrays}
  />*/}
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
            onPressRigth={validateArrays}
            showButton1={showButton1}
            showButton2={showButton2}
            titleRigthSecond={"Siguiente"}
            sizeRigthSecond={theme.buttonSize.df}
            colorRigthSecond={theme.colors.modernaRed}
            onPressRigthSecond={() => navigation.navigate("rack")}
            showButton1Second={showButton1}
            showButton2Second={showButton2}
            iconRigthSecond={"content-save-all-outline"}
            typeRigthSecond={"material-community"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    //height:600,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    //backgroundColor: "blue",
  },
  contentContainer: {
    flex: 14,
    width: theme.dimensions.maxWidth,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 5,
  },
});
