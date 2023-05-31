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
import React, { useContext, useEffect, useState } from "react";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import theme from "../../theme/theme";
import DoubleStyledButton from "../../components/DoubleStyledButton";
import ScreenInformation from "../../components/ScreenInformation";
import ModernaHeader from "../../components/ModernaHeader";
import ProgressBar from "../../components/ProgressBar";
import TarjPercha from "../../components/TarjetaPercha";
import RackCheckbox from "../../components/RackCheckbox";
import {
  db_insertGlobalDataAudit,
  db_insertPercha,
} from "../../services/SqliteService";
import { lookForPerchas } from "../../services/SeleccionesService";
import ConfirmationModal from "../../components/ConfirmationModal";
import { realizarConsulta } from "../../common/sqlite_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataTime, generateUIDD } from "../../services/GenerateID";
import ModernaContext from "../../context/ModernaContext";

const Racks = ({ navigation }) => {
  const [valueGeneral, setValueGeneral] = useState();
  const [valueModerna, setValueModerna] = useState();
  const [category, setCategory] = useState([]);
  const [rack, setRack] = useState([]);
  const [checked, setChecked] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [idPercha] = useState(generateUIDD());
  const { userInfo } = useContext(ModernaContext);
  /*const EnviaDatosLocal = async () => {
    db_insertPercha(1, checked, valueGeneral, valueModerna);
    await lookForPerchas(setPedidos);
    console.log("Pedidos desde Screen:", pedidos);
  };*/

  const consultarYCopiarContenido = async () => {
    const idGroupClient = await AsyncStorage.getItem("idGroupClient");
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM categoria"
      );

      const resultadoConsultaPlanograma = await realizarConsulta(
        "SELECT * FROM planograma"
      );
      const planogramaFiltro = resultadoConsultaPlanograma
        .filter((objeto) => objeto.id_grupo_cliente === idGroupClient)
        .map((objeto) => {
          return {
            id: objeto.id_categoria,
            name: objeto.nombre_categoria,
            images: [
              objeto.url_imagen1,
              objeto.url_imagen2,
              objeto.url_imagen3,
            ],
          };
        });

      const newArrayEstado = planogramaFiltro.map((objeto) => {
        return {
          id: objeto.id,
          id_percha: idPercha,
          name: objeto.name,
          carasGeneral: null,
          carasModerna: null,
          imagesPlanograma: objeto.images,
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
      setCategory(newArrayEstado);
      setRack(planogramaFiltro);
      console.log("Copia de contenido completada con éxito: ", newArrayEstado);
      console.log("ARRAY DE PLANOGRAMA: ", planogramaFiltro);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

  /*useEffect(() => {
    console.log("CATEGORIAS DISPONIBLES: ", category);
  }, []);*/
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

  const validate = async () => {
    console.log("VALIDACION DE DATOS DE PERCHAS: ", rack);
    const isValid = category.every((item) => {
      if (
        item.state === null ||
        item.carasGeneral === null ||
        item.carasModerna === null
      ) {
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
        "Necesita marcar el valor de las perchas de cada producto"
      );
      //navigation.navigate('rack');
      console.log("CONTENIDO DE PERCHAS: ", JSON.stringify(category));
    } else {
      try {
        await AsyncStorage.setItem("id_percha", idPercha);
        console.log("PERCHAS QUE VAN A SER GUARDADOS: ", JSON.stringify(rack));
        rack.map((productos) => {
          const { id_percha, id, state, carasGeneral, carasModerna, images } =
            productos;
          const { image1, image2, image3 } = images;
          console.log(
            "---------------------- imagenes",
            JSON.stringify(images)
          );
          let dataSave = {
            tableName: "percha",
            dataInsertType: [
              "id_percha",
              "id_categoria",
              "estado_percha",
              "categoria_general",
              "categoria_moderna",
              "url_imagen1",
              "url_imagen2",
              "url_imagen3",
              "usuario_creacion",
              "fecha_creacion",
              "fecha_modificacion",
            ],
            dataInsert: [
              `'${id_percha}'`,
              `'${id}'`,
              `'${state}'`,
              `'${carasGeneral}'`,
              `'${carasModerna}'`,
              `'${image1}'`,
              `'${image2}'`,
              `'${image3}'`,
              `'${userInfo.givenName}'`,
              `'${dataTime()}'`,
              `'${dataTime()}'`,
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
          navigation.navigate("promos");
        });
      } catch (e) {
        Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
      }
      console.log("TODO BIEN");
      //navigation.navigate('rack');
      //navigation.navigate("promos");
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
      <View style={{ flex: 1, width: "100%" }}>
        <ModernaHeader />
      </View>

      <View style={styles.contentContainer}>
        <ProgressBar currentStep={2} />
        <ScreenInformation
          title={"Perchas"}
          text={
            "Selecciona las perchas de los productos disponibles en el punto de venta actual"
          }
        />
        <View style={styles.cardContainer}>
          <TarjPercha
            //data={category}
            data={category}
            rack={rack}
            setRack={setRack}
            setData={setCategory}
            view={"audit"}
          />
        </View>
      </View>
      <DoubleStyledButton
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
        onPressRigth={validate}
      />
    </View>
  );
};

export default Racks;

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
    //borderTopStartRadius: 15,
    //borderTopEndRadius: 15,
    alignItems: "center",
    padding: 20,
  },
  cardContainer: {
    flex: 9,
    //height: 160,
    //borderWidth: 1,
    width: "100%",
    marginVertical: 5,
    //marginHorizontal:10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor:'blue',
  },
});
