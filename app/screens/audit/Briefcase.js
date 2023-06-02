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
import FlashListC from "../../components/FlashListC";
import ConfirmationModal from "../../components/ConfirmationModal";
import { realizarConsulta } from "../../common/sqlite_config";
import ModernaContext from "../../context/ModernaContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUIDD } from "../../services/GenerateID";
import { db_insertGlobalDataAudit } from "../../services/SqliteService";
import { FlashListPortfolio } from "../../components/FlashListPortfolio";
import { MultiSelectList } from "../../components/MultiSelectList";
import { ProgressBar } from "../../components/ProgressBar";
import { MultiSelectListV2 } from "../../components/MultiSelectListV2";
import { Divider } from "@rneui/base";

export const Briefcase = ({ navigation }) => {
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
  const [idPortafolioComplementario] = useState(generateUIDD());
  const [idPortafolio] = useState(generateUIDD());

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  const savePortafolio = async () => {
    let dataSave = {
      tableName: "portafolio",
      dataInsertType: [
        "id_portafolio",
        "id_portafolio_complementario",
        "id_portafolio_ideal",
      ],
      dataInsert: [
        `'${idPortafolio}'`,
        `'${idPortafolioComplementario}'`,
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
    db_insertGlobalDataAudit(dataSave);
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

      const resultado = categorias
        .map((categoria) => {
          const productosCategoria = productosIdealFiltro.filter(
            (producto) => producto.id_categoria === categoria.id
          );

          // Verificar si existen productos de la categoría
          if (productosCategoria.length === 0) {
            return null; // Salir temprano si no hay productos
          }

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
        })
        .filter(Boolean); // Filtrar categorías nulas

      setIdealProducts([...resultado]);

      console.log(
        "PRODUCTOS PARA PORTAFOLIO IDEAL CON FILTRO ACTUAL. . . . . .",
        productosIdealFiltro
      );

      console.log(
        "PRODUCTOS PARA PORTAFOLIO IDEAL CON FILTRO NULO. . . . . .",
        resultado
      );

      const nuevaListaCategorias = resultadoConsultaCategorias.map(
        (categoria) => {
          const productosCategoria = resultadoConsulta.filter((producto) => {
            console.log(
              "CATEGORIA: " +
                categoria.id_categoria +
                " PRODUCTO: " +
                producto.id_categoria
            );
            return producto.id_categoria === categoria.id_categoria;
          });
          console.log("PRODUCTO ENCONTRADO: ", productosCategoria);
          return {
            id: categoria.id_categoria,
            name: categoria.nombre_categoria,
            children: [
              ...productosCategoria.map((producto) => {
                return {
                  id: producto.id_producto,
                  name: producto.nombre_producto,
                  url: producto.url_imagen_producto,
                };
              }),
            ],
          };
        }
      );

      //console.log(nuevaListaCategorias);

      console.log(
        "NUEVO ARRAY DE CATEGORIAS Y PRODUCTOS- - - - - - - : ",
        nuevaListaCategorias
      );

      setAllProducts([...nuevaListaCategorias]);

      /*console.log(
        "NUEVO ARRAY DE CATEGORIAS Y PRODUCTOS- - - - - - - : ",
        resultadoConsulta
      );*/

      const uniqueArray = nuevaListaCategorias.filter(
        (obj1) =>
          !productosIdealFiltro.some((obj2) => obj2.id_producto === obj1.key)
      );

      console.log("PRODUCTOS QUE VAN AL COMPLEMENTARIO: ", uniqueArray);

      //setAllProducts([...uniqueArray]);
      //setCategory(newArrayEstado);
      console.log(
        "Copia de contenido completada con éxito - PRODUCTOS: ",
        resultadoConsulta
      );
      console.log(
        "\nresultado de la consulta de la tabla ------ PORTAFOLIO IDEAL: ",
        resultadoConsultaIdeal
      );
      console.log(
        "\nARRAY DE CATEGORIAS QUE SON INCLUIDAS EN EL PORTAFOLIO IDEAL POR GRUPO DE CLIENTE: ",
        categorias
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

  const validateProduct = () => {
    console.log(
      "SUMA DE TAMAÑOS DE ARRAYS PORTAFOLIO: " +
        (idealPortfolioProducts.length + complementaryPortfolioProducts.length)
    );

    if (
      idealPortfolioProducts.length + complementaryPortfolioProducts.length ==
      0
    ) {
      navigation.navigate("rack");
      console.log("NINGUN PORTAFOLIO TIENE PRODUCTOS");
    } else {
      /*.alert(
        "Productos validados: ",
        "Redirigiendo a la siguiente pantalla"
      );*/
      console.log(
        "PRODUCTOS DEL PORTAFOLIO IDEAL: ",
        JSON.stringify(idealPortfolioProducts)
      );
      console.log(
        "PRODUCTOS DEL PORTAFOLIO COMPLEMENTARIO: ",
        JSON.stringify(complementaryPortfolioProducts)
      );
      navigation.navigate("prices", {
        currentStep,
        complementaryPortfolioProducts,
        idealPortfolioProducts,
        setComplementaryPortfolioProducts,
      });
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
            flex: 3,
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
        <View
          style={{ width: theme.dimensions.maxWidth / 1.1, marginVertical: 5 }}
        >
          <Divider
            width={2}
            color={"#D9D9D9"}
            style={{ backgroundColor: "blue" }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <MultiSelectListV2
            setComplementaryPortfolioProducts={
              setComplementaryPortfolioProducts
            }
            auxiliarArray={auxiliarArray}
            products={allProducts}
            complementaryPortfolioProducts={complementaryPortfolioProducts}
          />
        </View>
        <View style={{ flex: 0.7, justifyContent: "center", width: "100%" }}>
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
    fontWeight: theme.fontWeight.softbold,
    right: 130,
    fontSize: 14,
    fontFamily: "Metropolis",
  },
  scrollView: {
    //flex:7,
    backgroundColor: "blue",
    width: theme.dimensions.maxWidth,
    //height:'30%',
    marginBottom: 5,
  },
});
