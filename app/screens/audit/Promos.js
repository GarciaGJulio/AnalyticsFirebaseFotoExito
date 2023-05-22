import {
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
import LoaderModal from "../../components/LoaderModal";
import { realizarConsulta } from "../../common/sqlite_config";

const Promos = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [animation, setAnimation] = useState("");
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [exhibidorType, setExhibidorType] = useState([]);
  const [exhibidor, setExhibidor] = useState([]);
  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM exhibidor_tipo"
      );

      const resultadoConsultaExhibidor = await realizarConsulta(
        "SELECT * FROM exhibidor"
      );

      const newArrayEstado = resultadoConsulta.map((objeto) => {
        return {
          id: objeto.id_exhibidor_tipo,
          name: objeto.nombre_tipo_exhibidor,
          url: objeto.url_imagen_exhibidor,
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });

      const newArrayExhibidor = resultadoConsultaExhibidor.map((objeto) => {
        return {
          id: objeto.id_exhibidor,
          id_tipo_exhibidor: objeto.id_exhibidor_tipo,
          url: objeto.url_imagen_exhibidor,
          state: null,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });
      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta),
      setExhibidorType(newArrayEstado);
      console.log("Copia de contenido completada con éxito: ", newArrayEstado);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

  let datos = [
    {
      id: "I001",
      name: "Exhibidor 1",
      state: null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      id: "I002",
      name: "Exhibidor 2",
      state: null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      id: "I003",
      name: "Exhibidor 3",
      state: null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      id: "I004",
      name: "Exhibidor 4",
      state: null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
  ];
  const [data, setData] = useState([...datos]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
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
          <Dropdown
            placeholder={"Seleccione una sucursal"}
            setSelected={setSelected}
          />
        </View>

        <View style={styles.promosContent}>
          <FlashListPromos data={data} setData={setData} />
        </View>
      </View>
      <DoubleStyledButton
        titleLeft={"Cancelar"}
        sizeLeft={theme.buttonSize.df}
        colorLeft={theme.colors.modernaYellow}
        iconLeft={"cancel"}
        typeLeft={"material-icon"}
        onPressLeft={() => setIsModalVisibleClose(true)}
        titleRigth={"Finalizar"}
        sizeRigth={theme.buttonSize.df}
        iconRigth={"arrow-right-circle"}
        typeRigth={"feather"}
        colorRigth={theme.colors.modernaRed}
        onPressRigth={handleOpenModalFinish}
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
