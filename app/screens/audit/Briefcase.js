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
import ModernaHeader from "../../components/ModernaHeader";
import BriefcaseList from "../../components/BriefcaseList";
import { ScrollView } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import LOADER_ANIMATION from "../../../assets/loader.json";
import LoaderModal from "../../components/LoaderModal";
import ProgressBar from "../../components/ProgressBar";
import MultiSelectList from "../../components/MultiSelectList";
import FlashListC from "../../components/FlashListC";
import FlashListPortfolio from "../../components/FlashListPortfolio";
import ConfirmationModal from "../../components/ConfirmationModal";
import { realizarConsulta } from "../../common/sqlite_config";
import ModernaContext from "../../context/ModernaContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db_insertGlobalDataAudit } from "../../services/SqliteService";
import { generateUIDD } from "../../services/GenerateID";

const Briefcase = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idealPortfolioProducts, setIdealPortfolioProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [complementaryPortfolioProducts, setComplementaryPortfolioProducts] =
    useState([]);
  const [auxiliarArray, setAuxiliarArray] = useState([]);
  const [idealProducts, setIdealProducts] = useState([]);
  const [currentStep] = useState(0);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const { idClientGroup } = useContext(ModernaContext);
  const idPortafolioComplementario = generateUIDD();

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);

  const handleOpenModal = () => {
    //setIsModalVisible(true);
    //console.log("SUMA DE PRODUCTOS MENORES A 5 - - - - - -")
    //console.log("PORTAFOLIO IDEAL: ",JSON.stringify(idealPortfolioProducts));
    validateProduct();
    /*setTimeout(() => {
      //setIsModalVisible(false);
      //navigation.navigate('prices', { currentStep });
    }, 2000);*/
  };

  const consultarYCopiarContenido = async () => {
    let idGroupClient = await AsyncStorage.getItem("idGroupClient");
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM producto"
      );

      const verificacionInsercionSucursal = await realizarConsulta(
        "SELECT * FROM sucursal"
      );

      const resultadoConsultaIdeal = await realizarConsulta(
        "SELECT * FROM portafolio_ideal"
      );

      const resultadoConsultaCategorias = await realizarConsulta(
        "SELECT * FROM categoria"
      );

      const newAuxiliarArray = resultadoConsulta.map((objeto) => {
        return {
          id: objeto.id_producto,
          name: objeto.nombre_producto,
          url: objeto.url_imagen_producto,
          price: null,
          state: false,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });

      setAuxiliarArray([...newAuxiliarArray]);

      const newArrayEstado = resultadoConsulta.map((objeto) => {
        return {
          id: objeto.id_producto,
          name: objeto.nombre_producto,
          url: objeto.imagen_producto,
          /*price: null,
          state: false,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },*/
        };
      });

      console.log("- - - - - - ", idGroupClient);

      const productosIdealFiltro = resultadoConsultaIdeal.filter((objeto) => {
        return objeto.id_grupo_cliente === idGroupClient;
      });
      const products = resultadoConsulta.map((objeto) => {
        return {
          key: objeto.id_producto,
          value: objeto.nombre_producto + "-" + objeto.id_producto,
        };
      });

      const categorias = resultadoConsultaCategorias.map((item) => {
        return { id: item.id_categoria, category: item.nombre_categoria };
      });

      const resultado = categorias.map((categoria) => {
        const productosCategoria = productosIdealFiltro.filter(
          (producto) => producto.id_categoria === categoria.id
        );
        const productosInfo = productosCategoria.map((producto) => ({
          id: producto.id_producto,
          name: producto.nombre_producto,
          url: producto.url_imagen_producto,
          //price: producto.precio,
        }));

        return {
          categoria: categoria.category,
          productos: productosInfo,
        };
      });

      setIdealProducts([...resultado]);

      const uniqueArray = products.filter(
        (obj1) =>
          !productosIdealFiltro.some((obj2) => obj2.id_producto === obj1.key)
      );

      console.log("PRODUCTOS QUE VAN AL COMPLEMENTARIO: ", uniqueArray);

      setAllProducts([...uniqueArray]);
      //setCategory(newArrayEstado);
      console.log(
        "Copia de contenido completada con éxito - PRODUCTOS: ",
        resultadoConsulta
      );
      console.log(
        "\nCopia de contenido completada con éxito - PORTAFOLIO IDEAL: ",
        resultadoConsultaIdeal
      );
      console.log(
        "\nCopia de contenido completada con éxito - PORTAFOLIO IDEAL: ",
        categorias
      );

      console.log(
        "DATOS DE LA SUCURSAL- - - - - - - : ",
        verificacionInsercionSucursal
      );

      console.log(
        "\nARRAY FORMATEADO DE PORTAFOLIO IDEAL: ",
        productosIdealFiltro
      );
      console.log("\nARRAY DE CATEGORIAS : ", resultado);
      console.log("VALOR RECUPERADO DE GRUPO DEL CLIENTE:", idGroupClient);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);
  const validateProduct = async () => {
    console.log(
      "SUMA DE TAMAÑOS DE ARRAYS PORTAFOLIO: " +
        (idealPortfolioProducts.length + complementaryPortfolioProducts.length)
    );
    if (
      idealPortfolioProducts.length + complementaryPortfolioProducts.length <
      5
    ) {
      Alert.alert(
        "No se puede realizar la auditoria sin productos: ",
        "Debe selecionar al menos 5 productos entre ambos portafolios"
      );
      console.log("SUMA DE PRODUCTOS MENORES A 5 - - - - - -");
      console.log("PORTAFOLIO IDEAL: ", JSON.stringify(idealPortfolioProducts));
      console.log(
        "PORTAFOLIO COMPLEMENTARIO: ",
        JSON.stringify(complementaryPortfolioProducts)
      );
    } else {
      if (complementaryPortfolioProducts.length > 0) {
        await AsyncStorage.setItem(
          "id_portafolio_complementario",
          idPortafolioComplementario
        );
        console.log(
          "PRODUCTOS QUE VAN A SER GUARDADOS: ",
          JSON.stringify(complementaryPortfolioProducts)
        );
        complementaryPortfolioProducts.map((productos) => {
          const { id_portafolio_complementario, id } = productos;
          console.log(
            "PRODUCTO ACTAUL A INSERTAR EN BASE: ",
            id_portafolio_complementario + " " + id
          );
          let dataSave = {
            tableName: "portafolio_complementario",
            dataInsertType: [
              "id_portafolio_complementario",
              "id_producto",
              "estado_portafolio_complementario",
            ],
            dataInsert: [`'${id_portafolio_complementario}'`, `'${id}'`, "1"],
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
          Alert.alert(
            "Productos validados: ",
            "Redirigiendo a la siguiente pantalla"
          );
          navigation.navigate("prices", {
            currentStep,
            complementaryPortfolioProducts,
            idealPortfolioProducts,
            setComplementaryPortfolioProducts,
          });
        });
      }

      //db_insertGlobalDataAudit(dataSave);
      /*navigation.navigate("prices", {
        currentStep,
        complementaryPortfolioProducts,
        idealPortfolioProducts,
        setComplementaryPortfolioProducts,
      });*/
    }

    //alert("PORTAFOLIO IDEAL: "+JSON.stringify(idealPortfolioProducts))
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
      <LoaderModal
        animation={LOADER_ANIMATION}
        visible={isModalVisible}
        warning={"Almacenando datos, por favor espere..."}
      />
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={currentStep} />
        <ScreenInformation
          title={"Portafolio"}
          text={
            "Selecciona los productos del portafolio ideal o del portafolio complementario"
          }
        />
        <View
          style={{
            flex: 4,
            width: "100%",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={styles.text}>Portafolio Ideal</Text>
          <FlashListPortfolio
            idealPortfolioProducts={idealPortfolioProducts}
            setIdealPortfolioProducts={setIdealPortfolioProducts}
            idealProducts={idealProducts}
          />
        </View>
        <View style={{ flex: 3 }}>
          <MultiSelectList
            setComplementaryPortfolioProducts={
              setComplementaryPortfolioProducts
            }
            idPortafolioComplementario={idPortafolioComplementario}
            auxiliarArray={auxiliarArray}
            products={allProducts}
            complementaryPortfolioProducts={complementaryPortfolioProducts}
          />
        </View>
        <View style={{ flex: 0.8, justifyContent: "center", width: "100%" }}>
          <DoubleStyledButton
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
            onPressRigth={handleOpenModal}
          />
        </View>
      </View>
    </View>
  );
};

export default Briefcase;

const styles = StyleSheet.create({
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
  text: {
    fontWeight: theme.fontWeight.bold,
    right: 130,
  },
  scrollView: {
    //flex:7,
    backgroundColor: "blue",
    width: theme.dimensions.maxWidth,
    //height:'30%',
    marginBottom: 5,
  },
});
