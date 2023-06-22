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
import { ModernaContext } from "../../context/ModernaProvider";
import { ProgressBar } from "../../components/ProgressBar";
import { FlashListPromos } from "../../components/FlashListPromos";
import { DropdownPromos } from "../../components/DropdownPromos";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import NetInfo from "@react-native-community/netinfo";
import {
  cleanCurrentScreenUser,
  saveCurrentScreenUser,
} from "../../utils/Utils";
import { subidaBaseRemoteTodaAuditoria } from "../../services/SubidaBaseRemota";
import { GlobalContext } from "../../context/GlobalContext";
import { getActualDate, transfromrActualDateFormat } from "../../common/utils";

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
  const [hasVariable, setHasVariable] = useState(true);

  const {
    setHadSavePreciador,
    setHadSaveBriefCase,
    setHadSaveRack,
    isConnectionActivate,
    handleDoesClientHaveVariable,
    handleClearWorkFlow,
  } = useContext(GlobalContext);

  useEffect(() => {
    const checkForVariable = async () => {
      const response = await handleDoesClientHaveVariable("Promociones");
      setHasVariable(response);
    };
    checkForVariable();
  }, []);

  const consultarYCopiarContenido = async () => {
    const nombre_cliente = await AsyncStorage.getItem("nombre_cliente");
    const clientName = nombre_cliente.split("-")[1].trim();
    console.log(
      "NOMBRE DE LA CONSULTA PARA EXHIBIDOR - - - - - - -",
      clientName
    );
    try {
      const resultadoConsultaExhibidor = await realizarConsulta(
        `SELECT * FROM exhibidor WHERE nombre_cliente='${clientName}'`
      );

      const tablaAuditorias = await realizarConsulta("SELECT * FROM auditoria");

      //console.log("NOMBRE DEL CLIENTE: - - - - ", clientName);

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

  const handleOpenModalFinishWithoutBranch = async () => {
    setAnimation(SAVE_ANIMATION);
    setIsModalVisibleCloseSucursal(true);
    setIsModalVisible(true);
    saveAudit();
    cleanCurrentScreenUser();
    /*setTimeout(() => {
      setAnimation(SUCCESS_ANIMATION);
      setIsModalVisible(false);
      setIsModalVisibleCloseSucursal(false);
      navigation.navigate("begin");
    }, 3000);*/
  };

  const dataId = async () => {
    console.log(
      "\nDESDE PROMOCION *********************************************************\n"
    );
    let idPreciador = await AsyncStorage.getItem("id_preciador"); //si
    let idPercha = await AsyncStorage.getItem("id_percha"); //si
    let idSucursal = await AsyncStorage.getItem("id_sucursal"); //si
    let idCliente = await AsyncStorage.getItem("id_cliente"); //si
    let nombreCliente = await AsyncStorage.getItem("nombre_cliente"); //si
    let nombreSucursal = await AsyncStorage.getItem("nombre_sucursal");
    let idPortafolioAuditoria = await AsyncStorage.getItem(
      "id_portafolio_auditoria"
    ); //si
    console.log(
      "\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n\n"
    );
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
  }, []);

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
    setHadSavePreciador(false),
      setHadSaveBriefCase(false),
      setHadSaveRack(false);
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
        "nombre_cliente",
        "nombre_sucursal",
        "sincronizada",
      ],
      dataInsert: [
        `'${idAuditoria}'`,
        `'${idPreciador}'`,
        `'${idPercha}'`,
        `'${exhibidorSucursal.length == 0 ? null : idPromocion}'`,
        `'${idSucursal}'`,
        `'${idCliente}'`,
        `'${idPortafolioAuditoria}'`,
        `'${userInfo.mail}'`,
        `'${transfromrActualDateFormat(dataTime(), "F")}'`,
        `'${nombreCliente}'`,
        `'${nombreSucursal}'`,
        `${parseInt(0)}`,
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
      //setShowButton1(false);
      //setShowButton2(true);
      if (isConnectionActivate) {
        try {
          await subidaBaseRemoteTodaAuditoria(
            idAuditoria,
            setIsModalVisible,
            setIsModalVisibleCloseSucursal,
            setIsModalVisible,
            isModalVisible
          );
          navigation.navigate("begin");
        } catch (e) {
          console.log("ERROR: ", e);
          setIsModalVisible(false);
          Alert.alert(
            "Error al subir los datos",
            "Ha ocurrido un error inesperado, por favor vuelva a intentarlo"
          );
          navigation.navigate("begin");
        }
      } else {
        setIsModalVisibleCloseSucursal(false);
        setIsModalVisible(false);
        navigation.navigate("begin");
      }
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

    if (selected === null && hasVariable) {
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
        setIsModalVisible(true);
        try {
          //await AsyncStorage.setItem("id_promocion", idPercha);
          console.log(
            "PROMOCIONES QUE VAN A SER GUARDADOS: ",
            JSON.stringify(exhibidorSucursal)
          );
          if (exhibidorSucursal.length > 0) {
            exhibidorSucursal.map((productos) => {
              const { id_promocion, id, state, images } = productos;
              const { image1, image2, image3 } = images;
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
                  `'${parseInt(state)}'`,
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
              navigation.navigate("begin");
              /*setTimeout(() => {
              navigation.navigate("begin");
            }, 1200);*/
            });
          } else {
            console.log("TODO BIEN");
            saveAudit();
            cleanCurrentScreenUser();
            navigation.navigate("begin");
          }
        } catch (e) {
          console.log("errordel drop?::", e);
          Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
        }
        console.log("TODO BIEN  - - - - - - - -- ");
      }
    }
  };

  const validateData = () => {
    const isDataValid = promos.every((item) => {
      if (item.state === null) {
        console.log("ESTE ITEM DA PROBLEMAS: ", item);
        return false;
      }
      if (item.state === 1 || item.state === 0) {
        if (!item.images || item.images.image1 === null) {
          console.log("ESTE ITEM DA PROBLEMAS DE PRECIO O IMAGEN: ", item);
          return false;
        }
      }
      return true;
    });

    return isDataValid;
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
      <LoaderModal
        animation={SAVE_ANIMATION}
        visible={isModalVisible}
        warning={"Guardando datos en la base, por favor espere . . "}
      />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          handleClearWorkFlow();
          navigation.navigate("menu");
        }}
        warning={"¿Está seguro de cancelar el progreso actual?"}
      />
      <ConfirmationModalBranch
        visible={isModalVisibleCloseSucursal}
        onClose={handleCloseModalBranch}
        onPress={handleOpenModalFinishWithoutBranch}
        warning={
          "Al presionar 'Aceptar', el flujo de auditoría terminará ¿Desea confirmar este proceso?"
        }
      />
      <View style={{ flex: 1, width: "100%" }}>
        <ModernaHeader />
      </View>
      {hasVariable ? (
        <View>
          <View style={styles.contentContainer}>
            <ProgressBar currentStep={3} />
            <View style={{ flex: 1 }}>
              <ScreenInformation
                title={"Promociones"}
                text={"Selecciona la sucursal que aplica promociones"}
              />
            </View>

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
            disableAction={!validateData()}
            onPressRigth={validate}
            showButton1={true}
            //showButton2={showButton2}
            //titleRigthSecond={"Siguiente"}
            //sizeRigthSecond={theme.buttonSize.df}
            //colorRigthSecond={theme.colors.modernaRed}
            //onPressRigthSecond={() => navigation.navigate("begin")}
            //showButton1Second={showButton1}
            //showButton2Second={showButton2}
            //iconRigthSecond={"content-save-all-outline"}
            //typeRigthSecond={"material-community"}
          />
        </View>
      ) : (
        <View>
          <View style={styles.contentContainer}>
            <ProgressBar currentStep={3} />
            <View style={{ flex: 1 }}>
              <ScreenInformation
                title={"Promociones"}
                text={`Promociones no está asignado a este cliente`}
              />
            </View>

            <View style={{ flex: 1, marginTop: 10 }}></View>
          </View>
          <DoubleDualStyledButton
            titleLeft={"Cancelar"}
            sizeLeft={theme.buttonSize.df}
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => setIsModalVisibleClose(true)}
            titleRigth={"Continuar"}
            sizeRigth={theme.buttonSize.df}
            iconRigth={"content-save-all-outline"}
            typeRigth={"material-community"}
            colorRigth={theme.colors.modernaRed}
            onPressRigth={validate}
            showButton1={true}
          />
        </View>
      )}
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
