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
import { generateUIDD } from "../../common/utils";
import ModernaContext from "../../context/ModernaContext";
import { ProgressBar } from "../../components/ProgressBar";
import { FlashListPromos } from "../../components/FlashListPromos";
import { DropdownPromos } from "../../components/DropdownPromos";

export const Promos = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [animation, setAnimation] = useState("");
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [branch, setBranch] = useState([]);
  const [exhibidor, setExhibidor] = useState([]);
  const [exhibidorSucursal, setExhibidorSucursal] = useState([]);
  const [exhibidorType, setExhibidorType] = useState([]);
  const [isModalVisibleCloseSucursal, setIsModalVisibleCloseSucursal] =
    useState(false);
  const [idPromocion] = useState(generateUIDD());
  const [idAuditoria] = useState(generateUIDD());
  const { userInfo } = useContext(ModernaContext);

  const consultarYCopiarContenido = async () => {
    const clientName = await AsyncStorage.getItem("clientName");
    try {
      // Realiza la consulta a la base de datos
      /*const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM exhibidor_tipo"
      );*/

      const resultadoConsultaExhibidor = await realizarConsulta(
        "SELECT * FROM exhibidor"
      );

      console.log("NOMBRE DEL CLIENTE: - - - - ", clientName);
      /*const newArrayExhibidor = resultadoConsultaExhibidor.map((objeto) => {
        return {
          id: objeto.id_exhibidor,
          id_tipo_exhibidor: objeto.id_exhibidor_tipo,
          name: objeto.nombre_tipo_exhibidor,
          client_name: objeto.nombre_cliente,
          sucursal: objeto.sucursal,
          url: objeto.url_imagen_exhibidor,
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });*/

      const newArrayExhibidor = resultadoConsultaExhibidor.map((objeto) => {
        return {
          id: objeto.id_exhibidor,
          id_tipo_exhibidor: objeto.id_exhibidor_tipo,
          name: objeto.nombre_tipo_exhibidor,
          client_name: objeto.nombre_cliente,
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
        return objeto.client_name === clientName;
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

      /*const newFormatArrayExhibidor = exhibidorFilter.map((objeto)=> {
        return {
          id: objeto.id_exhibidor,
          id_tipo_exhibidor: objeto.id_exhibidor_tipo,
          name: objeto.nombre_tipo_exhibidor,
          client_name: objeto.nombre_cliente,
          sucursal: objeto.sucursal,
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        }}
      })*/

      branchSucursal.push({
        key: "C3V99M",
        value: "Esta sucursal no registra plan",
      });

      setBranch([...branchSucursal]);
      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta),
      //setExhibidorType(newArrayEstado);
      setExhibidor(exhibidorFilter);
      console.log(
        "Copia de contenido completada con éxito: ",
        newArrayExhibidor
      );
      console.log("BRANCH FORMATEADO: ", branchSucursal);
      console.log("EXHIBIDORES FORMATEADOS: ", exhibidorFilter);
      console.log(
        "ARRAY PARA ALMACENAR DATOS DE EXHIBIDORES : ",
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
      const filteredData = exhibidor.filter(
        (objeto) => objeto.sucursal === selected
      );
      setExhibidorSucursal(filteredData);
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

  const handleOpenModalFinish = () => {
    setAnimation(SAVE_ANIMATION);
    setIsModalVisible(true);
    setTimeout(() => {
      //setAnimation(SUCCESS_ANIMATION);
      setIsModalVisible(false);
      navigation.navigate("begin");
    }, 5000);
  };

  const handleOpenModalFinishWithoutBranch = () => {
    setAnimation(SAVE_ANIMATION);
    setIsModalVisibleCloseSucursal(true);
    setIsModalVisible(true);
    setTimeout(() => {
      setAnimation(SUCCESS_ANIMATION);
      setIsModalVisible(false);
      setIsModalVisibleCloseSucursal(false);
      navigation.navigate("begin");
    }, 3000);
  };

  const saveAudit = async () => {
    let idPercha = await AsyncStorage.getItem("id_percha");
    let idSucursal = await AsyncStorage.getItem("id_sucursal");
    let idCliente = await AsyncStorage.getItem("id_cliente");
    let idPreciador = await AsyncStorage.getItem(
      "id_preciador_portafolio_complementario"
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
      ],
      dataInsert: [
        `'${idAuditoria}'`,
        `'${idPreciador}'`,
        `'${idPercha}'`,
        `'${idPromocion}'`,
        `'${idSucursal}'`,
        `'${idCliente}'`,
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
  };

  /*const savePreciador = async () => {
    let idPreciadorPortafolioComplementario = await AsyncStorage.getItem(
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
  };
  useEffect(() => {
    //savePortafolio();
    //savePreciador();
    //saveAudit();
  }, []);*/

  const validate = async () => {
    console.log("VALIDACION DE DATOS DE PERCHAS: ", exhibidor);
    const isValid = exhibidor.every((item) => {
      if (item.state === null || selected === null) {
        console.log("ESTE ITEM DA PROBLEMAS: ", item);
        return false;
      }
      if (item.state === "1") {
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
      console.log("CONTENIDO DE PERCHAS: ", JSON.stringify(exhibidor));
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
          console.log(
            "---------------------- imagenes",
            JSON.stringify(images)
          );
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
          navigation.navigate("begin");
        });
      } catch (e) {
        Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
      }
      console.log("TODO BIEN");
    }
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
            <FlashListPromos data={exhibidorSucursal} setData={setExhibidor} />
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
      <DoubleStyledButton
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
