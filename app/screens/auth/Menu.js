import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import theme from "../../theme/theme";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import LoaderModal from "../../components/LoaderModal";
import SYNC_ANIMATION from "../../../assets/sync-data.json";
import SUCCESS_ANIMATION from "../../../assets/success.json";
import FAILED_ANIMATION from "../../../assets/failed.json";
import DOWNLOAD_ANIMATION from "../../../assets/download.json";
import NetInfo from "@react-native-community/netinfo";
import { Cli } from "../../azureConfig/graph/GraphManager";
import { useFonts } from "expo-font";
import ModernaHeaderM from "../../components/ModernaHeaderM";
import * as SQLite from "expo-sqlite";
import { subidaBaseRemoteTodaAuditoria } from "../../services/SubidaBaseRemota";
import { getCurrentScreenInformation } from "../../utils/Utils";
import { PrivateValueStore, useNavigation } from "@react-navigation/native";
import {
  automaticSync,
  borrarBaseDeDatos,
  borrarTablasDeBaseDeDatos,
} from "../../services/SqliteService";
import {
  dataAxiosQuery,
  load_db_config,
  realizarConsulta,
} from "../../common/sqlite_config";
import ConfirmationModal from "../../components/ConfirmationModal";
import { GlobalContext } from "../../context/GlobalContext";
import { ModernaContext } from "../../context/ModernaProvider";
import { showDebug } from "../../common/logs";

export const Menu = ({ navigation }) => {
  // const navigation1 = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [validate, setValidate] = useState(false);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState();
  const {
    globalVariable,
    setGlobalVariable,
    isConnectionActivate,
    fetchVariables,
    refreshSync,
    setRefreshSync,
    setShowModal,
    showModal,
    setModalText,
    setModalTitle,
    setHadSaveBriefCase,
    setHadSavePreciador,
    initVariablesLocalStorage,
    setHadSaveRack,
  } = useContext(GlobalContext);
  global.widthContainer = Dimensions.get("window").width / 1.8;

  const automaticSync = async () => {
    const auditoriasSinSincronizar = await realizarConsulta(
      "SELECT * FROM auditoria where sincronizada = 0"
    );
    // //console.log("AUDITORIAS SIN SINCORNIZAR: ", auditoriasSinSincronizar);
    if (auditoriasSinSincronizar.length === 0) {
      //console.log("NADA QUE SINCRONIZAR POR EL MOMENTO");
    } else if (auditoriasSinSincronizar.length > 0) {
      setIsModalVisible2(!isModalVisible2);
      //console.log("CAMBIANDO EL ESTADO GLOBAL DE LA VARIABLE A TRUE");
      setGlobalVariable(!globalVariable);
      // //console.log(
      //   "ENTRANDO A SINCRONIZAR DATOS DE AUDITORIAS AUTOMATICAMENTE: ",
      //   auditoriasSinSincronizar.length
      // );

      let showAlert = true; // Variable para controlar si se debe mostrar el alert

      for (const auditoria of auditoriasSinSincronizar) {
        // //console.log("ID DE AUDITORIA A SINCRONIZARSE: ", auditoria);
        try {
          await subidaBaseRemoteTodaAuditoria(
            auditoria.id_auditoria,
            setIsModalVisible,
            setRefreshSync,
            refreshSync
          );
        } catch (e) {
          //console.log("ERROR: ", e);
          setIsModalVisible2(false);
          //console.log("CAMBIANDO EL ESTADO GLOBAL DE LA VARIABLE A FALSE");
          setGlobalVariable(false);
          if (showAlert) {
            showAlert = false; // Actualizar la variable para evitar mostrar más de un alert
          }
        }
      }

      // Si aún no se ha mostrado el alert, mostrarlo fuera del bucle
      if (showAlert) {
        // //console.log(
        //   "**************************** ABORTANDO LA SINCRONIZACION AUTOMATICA ************************"
        // );
      }
    } else {
      // //console.log(
      //   "**************************** ABORTANDO LA SINCRONIZACION AUTOMATICA ************************"
      // );
    }
  };

  const verificarSincronizacion = () => {
    //console.log("ESTADO DE LA CONEXION ACTUAL: ", isConnectionActivate);
    if (isConnectionActivate) {
      automaticSync();
    } else {
      //console.log("NO HAY CONEXION PARA SINCRONIZAR LOS DATOS");
    }
  };

  useEffect(() => {
    console.log(
      "initVariablesLocalStorage-----------",
      initVariablesLocalStorage
    );
    getCurrentScreenInformation(navigation, initVariablesLocalStorage);
  }, []);

  useEffect(() => {
    verificarSincronizacion();
  }, [isConnectionActivate]);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  const handleOpenModal = async () => {
    setAnimation(SYNC_ANIMATION);
    const auditoriasSinSincronizar = await realizarConsulta(
      "SELECT * FROM auditoria where sincronizada = 0"
    );
    // //console.log("AUDITORIAS SIN SINCORNIZAR: ", auditoriasSinSincronizar);
    if (auditoriasSinSincronizar.length === 0) {
      setShowModal(!showModal);
      setModalTitle("Datos sincronizados");
      setModalText("No se detectan auditorías pendientes de enviar");
      /*Alert.alert(
        "Datos sincronizados",
        "No se detectan auditorías pendientes de enviar"
      );*/
    } else if (auditoriasSinSincronizar.length > 0 && isConnectionActivate) {
      setIsModalVisible(!isModalVisible);
      setModalMessage("Sincronizando datos, por favor espere...");
      // //console.log(
      //   "----------------ENTRANDO A SINCRONIZAR DATOS DE AUTIROIAS: ",
      //   auditoriasSinSincronizar.length
      // );

      auditoriasSinSincronizar.forEach(async (auditoria) => {
        // //console.log("ID DE AUDITORIA A SINCRONIZARSE: ", auditoria);
        try {
          await subidaBaseRemoteTodaAuditoria(
            auditoria.id_auditoria,
            setIsModalVisible,
            setValidate,
            validate
            //setIsModalVisible,
            //isModalVisible
          );
        } catch (e) {
          //console.log("ERROR DESDE EL MENU: ", e);
          setIsModalVisible(false);
          setShowModal(!showModal);
          setModalTitle("Error al subir los datos");
          setModalText(
            "Ha ocurrido un error inesperado, por favor vuelva a intentarlo."
          );
          /*Alert.alert(
            "Error al subir los datos",
            "Ha ocurrido un error inesperado, por favor vuelva a intentarlo"
          );*/
        }
      });
      //setIsModalVisible(false);
    } else {
      setShowModal(!showModal);
      setModalTitle("No se ha detectado conexión a internet");
      setModalText(
        "Necesitas conectarte a internet para sincronizar las auditorias."
      );
      /*Alert.alert(
        "No se ha detectado conexión a internet",
        "Necesitas conectarte a internet para sincronizar las auditorias"
      );*/
    }
  };

  const handleOpenModalAudit = async () => {
    try {
      setAnimation(DOWNLOAD_ANIMATION);
      setModalMessage(
        "Descargando variables para la auditoría, por favor espere..."
      );
      const validateAuditInBase = await realizarConsulta(
        "SELECT * FROM auditoria WHERE sincronizada = 0"
      );

      if (validateAuditInBase.length == 0) {
        try {
          await deleteInsertData(); // <--- Corregir aquí
          //navigation.navigate("audit");
        } catch {
          //console.log("ERROR AL MOMENTO DE BORRAR LOS DATOS DE LA BASE");
          //setIsModalVisible(false);
        }
      } else if (!isConnectionActivate) {
        setIsModalVisibleClose(true);
      } else {
        setShowModal(!showModal);
        setModalTitle("Registros sin sincronizar encontrados");
        setModalText(
          "Todavía quedan registros que no han sido sincronizados a la base remota."
        );
        /*Alert.alert(
          "Registros sin sincronizar encontrados",
          "Todavía quedan registros que no han sido sincronizados a la base remota"
        );*/
        //setIsModalVisible(false);
      }
    } catch (e) {
      //console.log("ERROR EN EL MENU DE BAJA DE DATOS: - - - - -", e);
      showDebug("Error al presentar los datos del menu", e);
      setIsModalVisibleClose(false);
    }
    fetchVariables();
    //setIsModalVisible(false);
  };

  const deleteInsertData = async () => {
    if (isConnectionActivate) {
      setIsModalVisible(true);
      //console.log("SE PROCEDE A ELIMINAR LAS TABLAS . . . . . ");
      try {
        setHadSaveBriefCase(false);
        setHadSavePreciador(false);
        setHadSaveRack(false);
        //console.log("ELIMINANDO TABLAS DE LA BASE DE DATOS . . . . . ");
        await borrarTablasDeBaseDeDatos();
        try {
          const dataInsert = await dataAxiosQuery();
          //console.log("INSERCION DE DATOS NUEVOS - - - - - - - - -");
          //console.log(dataInsert);
          if (dataInsert) {
            // //console.log(
            //   "datos insertados satisfactoriaemente- - - - - -- - - - - -- - - - - - - - - - -"
            // );

            navigation.navigate("audit");
            setIsModalVisible(false);
          } else {
            // //console.log(
            //   "no tiene conexion a internet- - - - - -- - - - - -- - - - - - - - - - -"
            // );
            setIsModalVisible(false);

            /*Alert.alert(
            "Registros de auditorias encontrados en la base local",
            "Todavía no se han enviado los datos a la base remota, desea continuar?"
          );*/
          }
        } catch (e) {
          //console.log("Error al volver a insertar los datos * - * -* - * ");
          showDebug(
            "Error al descargar todos los datos de la funcion remota",
            e
          );
        }
      } catch (e) {
        //console.log("Error al eliminar la base de datos");
        setShowModal(!showModal);
        setModalTitle("Error al eliminar los registros");
        setModalText("Se procede a trabajar con datos anteriores.");
        /*Alert.alert(
          "Error al eliminar los registros",
          "Se procede a trabajar con datos anteriores"
        );*/
      }
    } else {
      setIsModalVisibleClose(true);
    }
  };

  const db = SQLite.openDatabase("MODERNAAPPMOBILEDB");

  // Obtener lista de tablas
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table'`,
      [],
      (_, result) => {
        const tables = [];
        for (let i = 0; i < result.rows.length; i++) {
          tables.push(result.rows.item(i).name);
        }
        // //console.log("Lista de tablas:", tables);
        const tablas = tables.join(",\n ");
        //Alert.alert("Lista de las tablas de las bases de datos: ", tablas);
      },
      (_, error) => {
        console.error("Error al obtener la lista de tablas:", error);
        //Alert.alert("Error al consultar base de datos interna: ", tablas);
      }
    );
  });

  const [fontLoaded] = useFonts({
    Metropolis: require("../../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          setIsModalVisibleClose(false);
          //handleDeleteRegisterLocal();
          navigation.navigate("audit");
        }}
        warning={
          "No se ha encontrado conexión a internet, ¿quieres continuar con variables desactualizadas?"
        }
      />
      <LoaderModal
        animation={animation}
        visible={isModalVisible}
        warning={modalMessage}
      />
      <View style={styles.headerContainer}>
        <ModernaHeaderM />
      </View>
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image} />
      </View>

      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        {/* <View
          style={{
            // paddingHorizontal: 20,
            width: 500,
            height: 250,
            backgroundColor: "orange",
            // marginHorizontal: 14,
            // display: "flex",
          }}
        > */}
        {/* ------------------------------------------------------------- */}
        {/* boton 1 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            // marginHorizontal: "4%",
            // margin: 5,

            // backgroundColor: "brown",
          }}
        >
          <View
            style={{
              flex: 1,
              // width: 250,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "black",
              marginRight: 10,
            }}
          >
            <StyledButton
              title={"Sincronizar Datos"}
              buttonColor={theme.colors.modernaYellow}
              onPress={handleOpenModal}
              size={"100%"}
              iconName={"cloud-sync"}
              iconType={"material-community"}
              icon
              // newstyle
            />
          </View>
          {/* styles.secondContainerText */}
          <View style={styles.secondContainerText}>
            {/* <View style={{ left: 0 }}> */}
            <Text style={[styles.text]}>
              Sincroniza las auditorías pendientes por enviar.
            </Text>
            {/* </View> */}
          </View>
        </View>
        {/* boton 2 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginTop: 5,
            // margin: 5,
            // marginHorizontal: "6%",
            // backgroundColor:"red"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor:"black"
              //marginLeft: 10,
              marginRight: 10,
            }}
          >
            <StyledButton
              title={"Realizar Auditoría"}
              buttonColor={theme.colors.modernaRed}
              onPress={handleOpenModalAudit}
              size={"100%"}
              iconName={"clipboard"}
              iconType={"entypo"}
              icon
            />
          </View>
          <View style={styles.secondContainerText}>
            <Text style={styles.text}>Crea una nueva auditoría.</Text>
          </View>
        </View>
        {/* boton 3 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginTop: 5,
            // margin: 5,
            // marginHorizontal: "7%",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <StyledButton
              title={"Consultar Auditorías"}
              buttonColor={theme.colors.modernaGreen}
              onPress={() => navigation.navigate("listBranch")}
              size={"100%"}
              iconName={"select-search"}
              iconType={"material-community"}
              icon
            />
          </View>
          <View style={styles.secondContainerText}>
            <Text style={styles.text}>
              Visualiza los datos de las auditorías
            </Text>
          </View>
        </View>
        {/* ------------------------------------------------------------- */}
        {/* </View> */}
      </Animatable.View>
    </View>
  );
};

// export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  secondContainerText: {
    flex: 1.2,
    justifyContent: "center",
    //alignItems: "center",
    // padding: 0,
    borderWidth: 0.5, //Detalles de los botones
    borderRadius: 10,
    // marginLeft: 5,
    paddingHorizontal: 15,
    // width: 150,
    // width: global.widthContainer,
  },
  headerContainer: {
    flex: 0.5,
    width: "100%",
    //backgroundColor: "blue",
  },
  imageContainer: {
    flex: 3,
    width: theme.dimensions.maxWidth,
  },
  contentContainer: {
    flex: 2,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
    // borderRadius:100
  },
  text: {
    fontWeight: theme.fontWeight.softbold,
    fontSize: 15,
    fontFamily: "Metropolis",
    textAlign: "justify",
    //flex: 1,
  },
});
