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
import React, { useState, useEffect } from "react";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import theme from "../../theme/theme";
import DoubleStyledButton from "../../components/DoubleStyledButton";
import ScreenInformation from "../../components/ScreenInformation";
import ModernaHeader from "../../components/ModernaHeader";
import FlashListPrices from "../../components/FlashListPrices";
import Dropdown from "../../components/Dropdown";
import ProgressBar from "../../components/ProgressBar";
import FlashListPromos from "../../components/FlashListPromos";
import ConfirmationModal from "../../components/ConfirmationModal";
import SAVE_ANIMATION from "../../../assets/save.json";
import SUCCESS_ANIMATION from "../../../assets/success.json";
import LoaderModal from "../../components/LoaderModal";
import { realizarConsulta } from "../../common/sqlite_config";
import DropdownPromos from "../../components/DropdownPromos";
import ConfirmationModalBranch from "../../components/ConfirmationModalBranch";
import { convertImageUrl } from "../../services/convertUrl";

const Promos = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [animation, setAnimation] = useState("");
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [branch, setBranch] = useState([]);
  const [exhibidor, setExhibidor] = useState([]);
  const [isModalVisibleCloseSucursal, setIsModalVisibleCloseSucursal] =
    useState(false);
  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos
      /*const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM exhibidor_tipo"
      );*/

      const resultadoConsultaExhibidor = await realizarConsulta(
        "SELECT * FROM exhibidor"
      );

      const newArrayExhibidor = resultadoConsultaExhibidor.map((objeto) => {
        return {
          id: objeto.id_exhibidor,
          id_tipo_exhibidor: objeto.id_exhibidor_tipo,
          name: objeto.nombre_tipo_exhibidor,
          client_name: objeto.nombre_cliente,
          sucursal: objeto.sucursal,
          url: convertImageUrl(objeto.url_imagen_exhibidor) + "/exhibidor.jpg",
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });

      const branchSucursal = resultadoConsultaExhibidor.map((objeto) => {
        return {
          key: objeto.id_exhibidor,
          value: objeto.sucursal,
        };
      });

      branchSucursal.push({
        key: "C3V99M",
        value: "Esta sucursal no registra plan",
      });

      setBranch([...branchSucursal]);
      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta),
      //setExhibidorType(newArrayEstado);
      setExhibidor(newArrayExhibidor);
      console.log(
        "Copia de contenido completada con éxito: ",
        newArrayExhibidor
      );
      console.log("BRANCH FORMATEADO: ", branchSucursal);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  const validateSucursal = () => {
    if (selected === "Esta sucursal no registra plan") {
      setIsModalVisibleCloseSucursal(true);
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
  };

  useEffect(() => {});

  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);

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

  const validate = () => {
    console.log("VALIDACION DE DATOS DE PERCHAS: ", exhibidor);
    const isValid = exhibidor.every((item) => {
      if (item.state === null || selected === null) {
        console.log("ESTE ITEM DA PROBLEMAS: ", item);
        return false;
      }
      if (item.state === true) {
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
      console.log("TODO BIEN");
      //navigation.navigate('rack');
      navigation.navigate("begin");
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
      <View style={{ flex: 1, width: "100%", backgroundColor: "blue" }}>
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
            placeholder={"Seleccione una sucursal"}
            setSelected={setSelected}
            data={branch}
          />
        </View>

        <View style={styles.promosContent}>
          <FlashListPromos data={exhibidor} setData={setExhibidor} />
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

export default Promos;

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
