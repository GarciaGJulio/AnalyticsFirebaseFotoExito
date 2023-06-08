import { Alert, Image, StatusBar, StyleSheet, Text, View } from "react-native";
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
import ModernaContext from "../../context/ModernaContext";
import { Cli } from "../../azureConfig/graph/GraphManager";
import { useFonts } from "expo-font";
import ModernaHeaderM from "../../components/ModernaHeaderM";
import * as SQLite from "expo-sqlite";
import {
  subidaBaseRemoteTodaAuditoria,
  subidaBaseRemoteTodaAuditoria2,
} from "../../services/SubidaBaseRemota";
import { getCurrentScreenInformation } from "../../utils/Utils";
import { useNavigation } from "@react-navigation/native";
import {
  borrarBaseDeDatos,
  borrarTablasDeBaseDeDatos,
} from "../../services/SqliteService";
import {
  dataAxiosQuery,
  load_db_config,
  realizarConsulta,
} from "../../common/sqlite_config";
import ConfirmationModal from "../../components/ConfirmationModal";

export const Menu = ({ navigation }) => {
  const { handleScreenInfo } = useContext(ModernaContext);
  // const navigation1 = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  //const { isConnected } = useContext(ModernaContext);

  //const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getCurrentScreenInformation(navigation);
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  const handleOpenModal = async () => {
    setAnimation(SYNC_ANIMATION);

    const auditoriasSinSincronizar = await realizarConsulta(
      "SELECT * FROM auditoria where sincronizada = 0"
    );
    console.log("AUDITORIAS SIN SINCORNIZAR: ", auditoriasSinSincronizar);
    if (auditoriasSinSincronizar.length === 0) {
      Alert.alert(
        "Datos ya sincronizados",
        "No se detectan auditorias que se necesite sincronizar"
      );
    } else {
      setIsModalVisible(true);
      setModalMessage("Sincronizando datos, por favor espere...");
      setTimeout(() => {
        setAnimation(SUCCESS_ANIMATION);
        if (isConnected) {
          setTimeout(() => {
            setIsModalVisible(false);
          }, 2000);
        } else {
          setAnimation(FAILED_ANIMATION);
          setTimeout(() => {
            setIsModalVisible(false);
          }, 4000);
        }
      }, 5000);
    }
  };

  const handleOpenModalAudit = async () => {
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
        console.log("ERROR AL MOMENTO DE BORRAR LOS DATOS DE LA BASE");
        //setIsModalVisible(false);
      }
    } else {
      Alert.alert(
        "Registros sin sincronizar encontrados",
        "Todavía quedan registros que no han sido sincronizados a la base remota"
      );
      //setIsModalVisible(false);
    }

    //setIsModalVisible(false);
  };

  const deleteInsertData = async () => {
    if (isConnected) {
      setIsModalVisible(true);
      console.log("SE PROCEDE A ELIMINAR LAS TABLAS . . . . . ");
      try {
        console.log("ELIMINANDO TABLAS DE LA BASE DE DATOS . . . . . ");
        await borrarTablasDeBaseDeDatos();
        try {
          const dataInsert = await dataAxiosQuery();
          console.log("INSERCION DE DATOS NUEVOS - - - - - - - - -");
          console.log(dataInsert);
          if (dataInsert) {
            console.log(
              "datos insertados satisfactoriaemente- - - - - -- - - - - -- - - - - - - - - - -"
            );

            navigation.navigate("audit");
            setIsModalVisible(false);
          } else {
            console.log(
              "no tiene conexion a internet- - - - - -- - - - - -- - - - - - - - - - -"
            );
            setIsModalVisible(false);

            /*Alert.alert(
            "Registros de auditorias encontrados en la base local",
            "Todavía no se han enviado los datos a la base remota, desea continuar?"
          );*/
          }
        } catch (e) {
          console.log("Error al volver a insertar los datos * - * -* - * ");
        }
      } catch (e) {
        console.log("Error al eliminar la base de datos");
        Alert.alert(
          "Error al eliminar los registros",
          "Se procede a trabajar con datos anteriores"
        );
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
        // console.log("Lista de tablas:", tables);
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
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          setIsModalVisibleClose(false);
          //handleDeleteRegisterLocal();
          navigation.navigate("audit");
        }}
        warning={
          "No se ha encontrado conexión a internet, ¿quieres continuar con datos desactualizados?"
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
        <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <StyledButton
              title={"Sincronizar Datos"}
              buttonColor={theme.colors.modernaYellow}
              onPress={handleOpenModal}
              size={theme.buttonSize.sm}
              iconName={"cloud-sync"}
              iconType={"material-community"}
            />
          </View>
          <View
            style={{
              flex: 1.7,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5, //Detalles de los botones
              borderRadius: 10,
              marginLeft: 20,
              paddingHorizontal: 8,
            }}
          >
            <Text style={styles.text}>
              Revisa y sincroniza las auditorías pendientes de envio.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <StyledButton
              title={"Realizar Auditoría"}
              buttonColor={theme.colors.modernaRed}
              onPress={handleOpenModalAudit}
              size={theme.buttonSize.sm}
              iconName={"clipboard"}
              iconType={"entypo"}
            />
          </View>
          <View
            style={{
              flex: 1.7,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderRadius: 10,
              marginLeft: 20,
              paddingHorizontal: 8,
            }}
          >
            <Text style={styles.text}>Crea una nueva auditoría.</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <StyledButton
              title={"Consultar Auditorias"}
              buttonColor={theme.colors.modernaGreen}
              onPress={() => navigation.navigate("listBranch")}
              size={theme.buttonSize.sm}
              iconName={"select-search"}
              iconType={"material-community"}
            />
          </View>
          <View
            style={{
              flex: 1.7,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderRadius: 10,
              marginLeft: 20,
              paddingHorizontal: 8,
            }}
          >
            <Text style={styles.text}>
              Visualiza los datos de las auditorías registradas.
            </Text>
          </View>
        </View>
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
  headerContainer: {
    flex: 0.5,
    width: "100%",
    //backgroundColor: "blue",
  },
  imageContainer: {
    flex: 3,
    width: theme.dimensions.maxWidth,
    //bottom: '35%',
    //backgroundColor: "blue",
    //alignItems:'center',
    //justifyContent:'center'
  },
  /*contentContainer: {
    width: theme.dimensions.maxWidth,
    //height: 536,
    flex: 3,
    backgroundColor: 'white',
    position: 'absolute',
    //bottom: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },*/
  contentContainer: {
    flex: 2,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //padding:5,
    paddingVertical: 20,
  },
  text: {
    fontWeight: theme.fontWeight.softbold,
    fontSize: 15,
    fontFamily: "Metropolis",
    //textAlign:'justify'
  },
});
