import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  ScrollView,
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
import ModernaHeader from "../../components/ModernaHeader";
import FlashListPrices from "../../components/FlashListPrices";
import Dropdown from "../../components/Dropdown";
import ConfirmationModal from "../../components/ConfirmationModal";
import SAVE_ANIMATION from "../../../assets/save.json";
import SUCCESS_ANIMATION from "../../../assets/success.json";
import LoaderModal from "../../components/LoaderModal";
import { realizarConsulta } from "../../common/sqlite_config";
import ConfirmationModalBranch from "../../components/ConfirmationModalBranch";
import { convertImageUrl } from "../../services/convertUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db_insertGlobalDataAudit } from "../../services/SqliteService";
import { dataTime, generateUIDD } from "../../services/GenerateID";
import ModernaContext from "../../context/ModernaContext";
import { ProgressBar } from "../../components/ProgressBar";
import { FlashListPromos } from "../../components/FlashListPromos";
import { DropdownPromos } from "../../components/DropdownPromos";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import {
  cleanCurrentScreenUser,
  saveCurrentScreenUser,
} from "../../utils/Utils";
import { subidaBaseRemoteTodaAuditoria } from "../../services/SubidaBaseRemota";

export const Promos = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [animation, setAnimation] = useState("");
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [branch, setBranch] = useState([]);
  const [exhibidor, setExhibidor] = useState([]);
  const [promos, setPromos] = useState([]);
  const [exhibidorSucursal, setExhibidorSucursal] = useState([]);
  const [exhibidorType, setExhibidorType] = useState([]);
  const [isModalVisibleCloseSucursal, setIsModalVisibleCloseSucursal] =
    useState(false);
  const [idPromocion] = useState(generateUIDD());
  const [idAuditoria] = useState(generateUIDD());
  const { userInfo } = useContext(ModernaContext);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);

  const consultarYCopiarContenido = async () => {
    const clientName = await AsyncStorage.getItem("nombre_cliente");
    try {
      const resultadoConsultaExhibidor = await realizarConsulta(
        `SELECT * FROM exhibidor WHERE nombre_cliente='${clientName}'`
      );

      const tablaAuditorias = await realizarConsulta("SELECT * FROM auditoria");

      console.log("NOMBRE DEL CLIENTE: - - - - ", clientName);

      console.log(
        "DATOS DE TABLA AUDITORIA * * * * * * *: - - - - ",
        tablaAuditorias
      );

      const newArrayExhibidor = resultadoConsultaExhibidor.map((objeto) => {
        return {
          id: objeto.id_exhibidor,
          id_tipo_exhibidor: objeto.id_exhibidor_tipo,
          name: objeto.nombre_tipo_exhibidor,
          nombre_cliente: objeto.nombre_cliente,
          sucursal: objeto.sucursal,
          id_promocion: idPromocion,
          url: objeto.url_imagen_exhibidor,
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });

      const exhibidorFilter = newArrayExhibidor.filter((objeto) => {
        return objeto.nombre_cliente === clientName;
      });
      setExhibidorType(exhibidorFilter);
      const branchSucursal = [];
      const existingNames = [];

      exhibidorFilter.forEach((objeto) => {
        // Verificar si el nombre ya existe en el array existingNames
        if (!existingNames.includes(objeto.sucursal)) {
          branchSucursal.push({
            key: objeto.id,
            value: objeto.sucursal,
          });
          existingNames.push(objeto.sucursal);
        }
      });

      branchSucursal.push({
        key: "C3V99M",
        value: "Esta sucursal no registra plan",
      });

      setBranch([...branchSucursal]);

      console.log(
        "Copia de contenido completada con éxito: ",
        newArrayExhibidor
      );
      console.log("BRANCH FORMATEADO: ", branchSucursal);
      console.log("EXHIBIDORES FORMATEADOS: ", exhibidorFilter);
      console.log(
        "DATOS DE EXHIBIDORES * * * * * * * / / / / / /: - - - - ",
        resultadoConsultaExhibidor
      );
      console.log(
        "ARRAY PARA ALMACENAR DATOS DE EXHIBIDORES  * * * * * * * * * * * * * * **: ",
        exhibidorFilter
      );
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  const validateSucursal = () => {
    if (selected === "Esta sucursal no registra plan") {
      setIsModalVisibleCloseSucursal(true);
    } else {
      console.log("EXHIBIDORES ENCONTRADOS TOTALES: ", exhibidorType);
      const filteredData = exhibidorType.filter((objeto) => {
        console.log(
          "NOMBRE DE LA SUCURSAL: " +
            objeto.sucursal +
            " SUC A COMPARAR: " +
            selected
        );
        return objeto.sucursal === selected; // Retorna true si el nombre de sucursal coincide
      });

      setExhibidorSucursal(filteredData);
      setPromos(filteredData);
      console.log(
        "////////////////////////////////////////////////////////////////////////////"
      );
      console.log(
        "EXHIBIDORES POR NOMBRE DE LA SUCURSAL - - - - - - - - - - - : ",
        filteredData
      );
      console.log(
        "////////////////////////////////////////////////////////////////////////////"
      );
    }
  };

  useEffect(() => {
    console.log("SUCURSAL SELECCIONADA: - - - - ", selected);
    validateSucursal();
  }, [selected]);

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };
  const handleCloseModalBranch = () => {
    setIsModalVisibleCloseSucursal(false);
    setSelected(null);
  };

  useEffect(() => {});

  /*useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);*/

  // const handleOpenModalFinish = () => {
  //   setAnimation(SAVE_ANIMATION);
  //   setIsModalVisible(true);
  //   setTimeout(() => {
  //     //setAnimation(SUCCESS_ANIMATION);
  //     setIsModalVisible(false);
  //     navigation.navigate("begin");
  //   }, 5000);
  // };

  const handleOpenModalFinishWithoutBranch = () => {
    setAnimation(SAVE_ANIMATION);
    setIsModalVisibleCloseSucursal(true);
    setIsModalVisible(true);
    saveAudit();
    cleanCurrentScreenUser();
    setTimeout(() => {
      setAnimation(SUCCESS_ANIMATION);
      setIsModalVisible(false);
      setIsModalVisibleCloseSucursal(false);
      navigation.navigate("begin");
    }, 3000);
  };

  const dataId = async () => {
    let idPreciador = await AsyncStorage.getItem("id_preciador"); //si
    let idPercha = await AsyncStorage.getItem("id_percha"); //si
    let idSucursal = await AsyncStorage.getItem("id_sucursal"); //si
    let idCliente = await AsyncStorage.getItem("id_cliente"); //si
    let nombreCliente = await AsyncStorage.getItem("nombre_cliente"); //si
    let nombreSucursal = await AsyncStorage.getItem("nombre_sucursal");
    let idPortafolioAuditoria = await AsyncStorage.getItem(
      "id_portafolio_auditoria"
    ); //si
    console.log("ID DE PRECIADOR: ", idPreciador);
    console.log("ID DE PERCHA: ", idPercha);
    console.log("ID DE SUCURSAL: ", idSucursal);
    console.log("ID DE CLIENTE: ", idCliente);
    console.log("NOMBRE CLIENTE: ", nombreCliente);
    console.log("NOMBRE SUCURSAL: ", nombreSucursal);
    console.log("ID DEL PORTAFOLIO AUDITORIA: ", idPortafolioAuditoria);
  };

  useEffect(() => {
    dataId();
  });
  const saveAudit = async () => {
    let idPreciador = await AsyncStorage.getItem("id_preciador");
    let idPercha = await AsyncStorage.getItem("id_percha");
    let idSucursal = await AsyncStorage.getItem("id_sucursal");
    let idCliente = await AsyncStorage.getItem("id_cliente");
    let nombreCliente = await AsyncStorage.getItem("nombre_cliente");
    let nombreSucursal = await AsyncStorage.getItem("nombre_sucursal");
    let idPortafolioAuditoria = await AsyncStorage.getItem(
      "id_portafolio_auditoria"
    );
    console.log(
      "***********************************************************************************"
    );
    console.log("ID DE PRECIADOR: ", idPreciador);
    console.log("ID DE PERCHA: ", idPercha);
    console.log("ID DE SUCURSAL: ", idSucursal);
    console.log("ID DE CLIENTE: ", idCliente);
    console.log("NOMBRE CLIENTE: ", nombreCliente);
    console.log("NOMBRE SUCURSAL: ", nombreSucursal);
    console.log("ID DEL PORTAFOLIO AUDITORIA: ", idPortafolioAuditoria);
    console.log(
      "***********************************************************************************"
    );

    let dataSave = {
      tableName: "auditoria",
      dataInsertType: [
        "id_auditoria",
        "id_preciador",
        "id_percha",
        "id_promocion",
        "id_sucursal",
        "id_cliente",
        "id_portafolio_auditoria",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
        "nombre_cliente",
        "nombre_sucursal",
        "sincronizada",
      ],
      dataInsert: [
        `'${idAuditoria}'`,
        `'${idPreciador}'`,
        `'${idPercha}'`,
        `'${idPromocion}'`,
        `'${idSucursal}'`,
        `'${idCliente}'`,
        `'${idPortafolioAuditoria}'`,
        `'${userInfo.givenName}'`,
        `'${dataTime()}'`,
        `'${dataTime()}'`,
        `'${nombreCliente}'`,
        `'${nombreSucursal}'`,
        `'${false}'`,
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
      db_insertGlobalDataAudit(dataSave);

      subidaBaseRemoteTodaAuditoria(`'${idAuditoria}'`);
      const promocionData = await realizarConsulta(
        "UPDATE auditoria SET <SINCRONIZADA> =trueWHERE id_auditoria=" +
          idAuditoria +
          ";"
      );
      console.log("resultado de la actualizacion:", promocionData);

      setShowButton1(false);
      setShowButton2(true);
    } catch (e) {
      // Alert.alert(
      //   "Error al insertar los datos en la tabla auditoria",
      //   "Vuelva a intentarlo"
      // );
    }
  };

  useEffect(() => {
    console.log();
  });

  const validate = async () => {
    console.log("VALIDACION DE DATOS DE PROMOCIONES 2: ", promos);
    if (selected === null) {
      console.log("SUCURSAL NO ELEGIDA - - - - - - - - - - - - - -");
      Alert.alert(
        "Tiene que escoger una sucursal del campo desplegable",
        "Para finalizar la auditoria, debe seleccionar una de las opciones listadas en el campo sucursal"
      );
    } else {
      const isValid = promos.every((item) => {
        if (item.state === null || selected === null) {
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
        Alert.alert(
          "Error al completar los datos",
          "Necesita marcar el valor de las promociones de cada exhibidor"
        );
        //navigation.navigate('rack');
        console.log("CONTENIDO DE PROMOCIONES: ", JSON.stringify(promos));
      } else {
        try {
          //await AsyncStorage.setItem("id_promocion", idPercha);
          console.log(
            "PROMOCIONES QUE VAN A SER GUARDADOS: ",
            JSON.stringify(exhibidorSucursal)
          );
          exhibidorSucursal.map((productos) => {
            const { id_promocion, id, state, images } = productos;
            const { image1, image2, image3 } = images;
            // console.log("Prod;", productos);
            // console.log(
            //   "---------------------- imagenes",
            //   JSON.stringify(images)
            // );
            let dataSave = {
              tableName: "promocion",
              dataInsertType: [
                "id_promocion",
                "id_exhibidor",
                "estado_promocion",
                "url_imagen1",
                "url_imagen2",
                "url_imagen3",
              ],
              dataInsert: [
                `'${id_promocion}'`,
                `'${id}'`,
                `'${state}'`,
                `'${image1}'`,
                `'${image2}'`,
                `'${image3}'`,
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
            db_insertGlobalDataAudit(dataSave);
            console.log("TODO BIEN");

            saveAudit();
            cleanCurrentScreenUser();
            setTimeout(() => {
              navigation.navigate("begin");
            }, 1200);
          });
        } catch (e) {
          Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
        }
        console.log("TODO BIEN  - - - - - - - -- ");
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
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <LoaderModal
        animation={animation}
        visible={isModalVisible}
        warning={"Guardando datos en la base, por favor espere . . "}
      />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => navigation.goBack()}
        warning={"¿Está seguro de querer cancelar el progreso actual?"}
      />
      <ConfirmationModalBranch
        visible={isModalVisibleCloseSucursal}
        onClose={handleCloseModalBranch}
        onPress={handleOpenModalFinishWithoutBranch}
        warning={
          "¿Al presionar la opción 'Aceptar', el flujo de la auditoria terminará, quiere confirmar este proceso?"
        }
      />
      <View style={{ flex: 1, width: "100%" }}>
        <ModernaHeader />
      </View>
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={3} />
        <ScreenInformation
          title={"Promociones"}
          text={"Selecciona la sucursal que aplica promociones"}
        />
        <View style={{ flex: 1, marginTop: 10 }}>
          <DropdownPromos
            nameTitle={"Sucursal"}
            placeholder={"Seleccione una sucursal"}
            setSelected={setSelected}
            data={branch}
          />
        </View>

        <View style={styles.promosContent}>
          {exhibidorSucursal.length > 0 ? (
            <FlashListPromos data={exhibidorSucursal} setData={setPromos} />
          ) : (
            <Text
              style={{
                padding: 20,
                textAlign: "justify",
                fontFamily: "Metropolis",
              }}
            >
              Escoge una sucursal para revisar los exhibidores que aplican
              promoción
            </Text>
          )}
        </View>
      </View>
      {/*<DoubleStyledButton
        titleLeft={"Cancelar"}
        sizeLeft={theme.buttonSize.df}
        colorLeft={theme.colors.modernaYellow}
        iconLeft={"cancel"}
        typeLeft={"material-icon"}
        onPressLeft={() => {
          //setText("¿Está seguro de querer cancelar el progreso actual?")
          setIsModalVisibleClose(true);
        }}
        titleRigth={"Finalizar"}
        sizeRigth={theme.buttonSize.df}
        iconRigth={"arrow-right-circle"}
        typeRigth={"feather"}
        colorRigth={theme.colors.modernaRed}
        onPressRigth={validate}
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
        onPressRigth={validate}
        showButton1={showButton1}
        showButton2={showButton2}
        titleRigthSecond={"Siguiente"}
        sizeRigthSecond={theme.buttonSize.df}
        colorRigthSecond={theme.colors.modernaRed}
        onPressRigthSecond={() => navigation.navigate("begin")}
        showButton1Second={showButton1}
        showButton2Second={showButton2}
        iconRigthSecond={"content-save-all-outline"}
        typeRigthSecond={"material-community"}
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
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    flex: 2,
    width: theme.dimensions.maxWidth,
    //height:'100%',
    marginBottom: 5,
    //backgroundColor:'blue'
  },
  promosContent: {
    flex: 2,
    width: theme.dimensions.maxWidth,
    //height:'100%',
    //marginBottom: 5,
    //backgroundColor:'blue',
    alignItems: "center",
  },
});
