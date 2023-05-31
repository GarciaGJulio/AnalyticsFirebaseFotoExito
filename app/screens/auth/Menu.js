import {
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import theme from "../../theme/theme";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import SYNC_BACKGROUND from "../../../assets/resources/sync_background.jpg";
import LoaderModal from "../../components/LoaderModal";
import SYNC_ANIMATION from "../../../assets/sync-data.json";
import SUCCESS_ANIMATION from "../../../assets/success.json";
import FAILED_ANIMATION from "../../../assets/failed.json";
import DOWNLOAD_ANIMATION from "../../../assets/download.json";
import NetInfo from "@react-native-community/netinfo";
import ModernaContext from "../../context/ModernaContext";
import { Cli, GraphInit } from "../../azureConfig/graph/GraphManager";
import { useFonts } from "expo-font";
import ModernaHeader from "../../components/ModernaHeader";
import ModernaHeaderM from "../../components/ModernaHeaderM";
import * as SQLite from "expo-sqlite";

const Menu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  //const { isConnected } = useContext(ModernaContext);

  useEffect(() => {
    let UserOnedrive = Cli;
    console.log("User:", UserOnedrive);
    //onedrive(UserOnedrive);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /*const onedrive = async (UserOnedrive) => {
    try {
      const response2 = await UserOnedrive.api("/me/drive").get()
      console.log("IDDDDDDDDDDDD", response2.id)
      const response = await UserOnedrive.api('/drives').get();
      console.log("Reesss", response);

      const base64Image = 'data:image/png;base64,iVBORw0KGg...'; // Aquí va el string base64 de la imagen
      const response3 = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', base64Image);
      const file = response3.path();


      const fileData = await RNFetchBlob.fs.readFile(file, 'base64');
      const uploadResult = await graphClient
        .api(`/drives/${driveId}/root:${filePath}:/content`)
        .put(fileData);
      console.log('Archivo subido:', uploadResult);



    } catch (error) {
      console.log("Error al subir el archivo:", error);
    }

  }*/

  const handleOpenModal = () => {
    setAnimation(SYNC_ANIMATION);
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
  };

  const handleOpenModalAudit = () => {
    setAnimation(DOWNLOAD_ANIMATION);
    setModalMessage(
      "Descargando variables para la auditoría, por favor espere..."
    );
    setIsModalVisible(true);
    setTimeout(() => {
      //setAnimation(SUCCESS_ANIMATION);
      setIsModalVisible(false);
      navigation.navigate("audit");
    }, 5000);
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
        console.log("Lista de tablas:", tables);
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
              marginHorizontal: 5,
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
              borderWidth: 1,
              borderRadius: 10,
              marginLeft: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.text}>
              Enviar una auditoría que hayas registrado de forma offline
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <StyledButton
              title={"Realizar Auditoria"}
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
              borderWidth: 1,
              borderRadius: 10,
              marginLeft: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.text}>
              Descarga los datos para empezar una nueva auditoría.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
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
              borderWidth: 1,
              borderRadius: 10,
              marginLeft: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.text}>
              Consulta las auditorías que has registrado previamente
            </Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Menu;

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
