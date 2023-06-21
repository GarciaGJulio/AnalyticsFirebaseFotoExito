import {
  Alert,
  BackHandler,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import theme from "../../theme/theme";
import ScreenInformation from "../../components/ScreenInformation";
import ModernaHeader from "../../components/ModernaHeader";
import LoaderModal from "../../components/LoaderModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { realizarConsulta } from "../../common/sqlite_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUIDD } from "../../services/GenerateID";
import { db_insertGlobalDataAudit } from "../../services/SqliteService";
import { FlashListPortfolio } from "../../components/FlashListPortfolio";
import { ProgressBar } from "../../components/ProgressBar";
import { MultiSelectListV2 } from "../../components/MultiSelectListV2";
import { Divider } from "@rneui/base";
import SAVE_ANIMATION from "../../../assets/save.json";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import {
  deleteRegisterAudit,
  getCurrentScreenInformation,
  getCurrentScreenInformationLocal,
  saveCurrentScreenUser,
} from "../../utils/Utils";
import { useIsFocused } from "@react-navigation/native";
import { GlobalContext } from "../../context/GlobalContext";

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
  ///const { idClientGroup } = useContext(ModernaContext);
  //const [idPortafolio] = useState(generateUIDD());
  const [idPortafolioComplementario] = useState(generateUIDD());
  const [idPortafolioIdeal, setPortafolioIdeal] = useState(null);
  const [idPortafolioAuditoria] = useState(generateUIDD());
  const [portafolioTipoIdeal] = useState("I");
  const [portafolioTipoComplementario] = useState("C");
  const [idGrupoCliente, setidGrupoCliente] = useState(null);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [infoScreen, setInfoScreen] = useState(null);
  const [hadSave, setHadSave] = useState(false);
  const isFocused = useIsFocused();

  const { hadSaveBriefCase, setHadSaveBriefCase } = useContext(GlobalContext);
  useEffect(() => {
    const initDataLocal = async () => {
      await getCurrentScreenInformation();
      getInfoDatBaseScreen();
    };
    initDataLocal();
    setTimeout(() => {
      initDataLocal();
    }, 2000);
  }, [isFocused]);

  /*useEffect(() => {
    console.log(
      "*****************************idealPortfolioProducts================",
      idealPortfolioProducts
    );
  }, [idealPortfolioProducts]);*/

  const dataId = async () => {
    console.log(
      "\nDESDE PORTAFOLIO *********************************************************\n"
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
      "\n////////////////////////////////////////////////////////////////////////\n\n"
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

  const getInfoDatBaseScreen = () => {
    try {
      if (global.userInfoScreen.userInfo.nombre_pantalla != "briefcase") {
        return;
      }
      const tmpInfoExtra = JSON.parse(
        global.userInfoScreen.userInfo.extra_info
      );
      const tmpPantalla = tmpInfoExtra.pantallas.briefcase;
      const infoExtra = tmpPantalla.extra_info;
      const newObj = {
        ...infoExtra,
        ...global.userInfoScreen.infoScreen,
      };
      let tempItems = infoExtra.complementaryPortfolioProducts.split("**");
      tempItems = tempItems.filter((item) => item.length > 0 && item != ",");
      tempItems = tempItems.map((item) => {
        return JSON.parse(item);
      });

      let tempItemsIdeal = infoExtra.idealPortfolioProducts.split("**");
      tempItemsIdeal = tempItemsIdeal.filter(
        (item) => item.length > 0 && item != ","
      );
      tempItemsIdeal = tempItemsIdeal.map((item) => {
        return JSON.parse(item);
      });

      setIdealPortfolioProducts(tempItemsIdeal);
      setComplementaryPortfolioProducts(tempItems);
      setInfoScreen(newObj);
      setShowButton2(true);
      setShowButton1(false);
      setHadSave(true);
      setHadSaveBriefCase(true);
      AsyncStorage.setItem("id_cliente", infoExtra.auditorias_id.id_cliente);
      AsyncStorage.setItem(
        "nombre_cliente",
        infoExtra.auditorias_id.nombre_cliente
      );
      AsyncStorage.setItem("id_sucursal", infoExtra.auditorias_id.id_sucursal);
      AsyncStorage.setItem(
        "nombre_sucursal",
        infoExtra.auditorias_id.nombre_sucursal
      );
      AsyncStorage.setItem(
        "id_portafolio_auditoria",
        infoExtra.auditorias_id.id_portafolio_auditoria
      );
      AsyncStorage.setItem(
        "nombre_sucursal",
        infoExtra.auditorias_id.nombre_sucursal
      );
      AsyncStorage.setItem(
        "id_portafolio_auditoria",
        infoExtra.auditorias_id.id_portafolio_auditoria
      );
    } catch (error) {
      setIdealPortfolioProducts([]);
      setComplementaryPortfolioProducts([]);
      setInfoScreen(null);
      setShowButton2(false);
      setShowButton1(true);
      console.log(error);
    }
  };
  //const [fullDataProducts, setFullDataProducts] = useState([]);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  const consultarDatosDeIDs = async () => {
    let idGroupClient = await AsyncStorage.getItem("idGroupClient");
    setidGrupoCliente(idGroupClient);
    console.log(
      " - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - "
    );
    console.log("*******************************************************");
    console.log("ID DEL GRUPO DE CLIENTE: ", idGroupClient);
    //console.log("ID DEL PORTAFOLIO: ", idPortafolio);
    console.log("ID DEL PORTAFOLIO IDEAL: ", idPortafolioIdeal);
    console.log(
      "ID DEL PORTAFOLIO COMPLEMENTARIO: ",
      idPortafolioComplementario
    );
    console.log("*******************************************************");
  };
  useEffect(() => {
    consultarDatosDeIDs();
  }, []);

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
    setIsModalVisible(true);
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

      const resultadoConsultaCategorias = await realizarConsulta(
        "SELECT * FROM categoria"
      );

      const productosIdeal = await realizarConsulta(
        `SELECT DISTINCT producto.*,portafolio.id_portafolio,portafolio.tipo FROM producto INNER JOIN portafolio ON producto.id_producto = portafolio.id_producto  WHERE portafolio.tipo = 'I' AND portafolio.id_portafolio='${idGroupClient}' AND portafolio.estado=true`
      );

      const productosIdealFiltro = productosIdeal.map((objeto) => {
        setPortafolioIdeal(objeto.id_portafolio);
        //console.log("IDEAL SIN FORMATEAR: ----", objeto);
        return {
          id: objeto.id_producto,
          name: objeto.nombre_producto,
          url: objeto.url_imagen_producto,
          id_categoria: objeto.id_categoria,
          id_portafolio: objeto.id_portafolio,
          tipo_portafolio: objeto.tipo,
          price: 0.0,
          state: 0,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      });

      setAuxiliarArray([...productosIdealFiltro]);

      console.log("- - - - - - ", idGroupClient);

      /*const productosIdealFiltro = newAuxiliarArray.filter((objeto) => {
        return objeto.id_grupo_cliente === idGroupClient;
      });*/

      const categorias = resultadoConsultaCategorias.map((item) => {
        return { id: item.id_categoria, category: item.nombre_categoria };
      });

      const resultado = categorias.reduce((acumulador, categoria) => {
        const productosCategoria = productosIdealFiltro.filter(
          (producto) => producto.id_categoria === categoria.id
        );

        // Verificar si existen productos de la categoría
        if (productosCategoria.length > 0) {
          acumulador.push({
            id_categoria: productosCategoria[0].id_categoria,
            categoria: categoria.category,
            productos: productosCategoria,
          });
        }

        return acumulador;
      }, []);

      setIdealProducts([...resultado]);

      console.log(
        "PRODUCTOS PARA PORTAFOLIO IDEAL CON FILTRO NULO. . . . . .",
        resultado
      );

      const filtroProductosNoIdeales = resultadoConsulta.filter(
        (obj1) =>
          !productosIdealFiltro.some((obj2) => obj1.id_producto === obj2.id)
      );

      console.log(
        "FILTRO DE PRODUCTOS SIN CONSIDERARA ALOS IDEALES - - - - - : ",
        filtroProductosNoIdeales
      );
      const nuevaListaCategorias = resultadoConsultaCategorias.map(
        (categoria) => {
          const productosCategoria = filtroProductosNoIdeales.filter(
            (producto) => {
              console.log(
                "CATEGORIA: " +
                  categoria.id_categoria +
                  " PRODUCTO: " +
                  producto.id_categoria
              );
              return producto.id_categoria === categoria.id_categoria;
            }
          );
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
                  tipo_portafolio: "C",
                };
              }),
            ],
          };
        }
      );

      console.log(
        "NUEVO ARRAY DE CATEGORIAS Y PRODUCTOS- - - - - - - : ",
        nuevaListaCategorias
      );

      setAllProducts([...nuevaListaCategorias]);
      console.log("PRODUCTOS IDEALES DE BASE: ", productosIdeal);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

  const onlyNavigation = () => {
    navigation.navigate("prices", {
      currentStep,
      complementaryPortfolioProducts,
      idealPortfolioProducts,
      setComplementaryPortfolioProducts,
    });
  };

  const validateProduct = async () => {
    console.log(
      "SUMA DE TAMAÑOS DE ARRAYS PORTAFOLIO: " +
        (idealPortfolioProducts.length + complementaryPortfolioProducts.length)
    );

    if (
      idealPortfolioProducts.length + complementaryPortfolioProducts.length ==
      0
    ) {
      setIsModalVisible(false);
      await AsyncStorage.setItem("id_portafolio_auditoria", "null");
      setHadSaveBriefCase(true);
      navigation.navigate("rack");
      console.log("NINGUN PORTAFOLIO TIENE PRODUCTOS");
    } else {
      await AsyncStorage.setItem(
        "id_portafolio_auditoria",
        idPortafolioAuditoria
      );
      console.log(
        "\n***************** DESACTIVANDO CHECKS *****************************\n"
      );
      setHadSaveBriefCase(true);
      console.log(
        "PRODUCTOS DEL PORTAFOLIO IDEAL: ",
        JSON.stringify(idealPortfolioProducts)
      );
      console.log(
        "PRODUCTOS DEL PORTAFOLIO COMPLEMENTARIO: ",
        JSON.stringify(complementaryPortfolioProducts)
      );

      try {
        const fullDataProducts = idealPortfolioProducts.concat(
          complementaryPortfolioProducts
        );

        for (const producto of fullDataProducts) {
          const { id_portafolio, id, tipo_portafolio } = producto;

          if (tipo_portafolio === "C") {
            console.log(
              "PRODUCTO ACTUAL PARA GUARDAR EN LA TABLA PORTAFOLIO - -- - - - - - - : ",
              "ID DEL PORTAFOLIO: " +
                id_portafolio +
                " ID DEL PRODUCTO: " +
                id +
                " TIPO DE PORTAFOLIO:" +
                tipo_portafolio
            );

            let dataSave = {
              tableName: "portafolio",
              dataInsertType: [
                "id_portafolio",
                "id_producto",
                "id_grupo_cliente",
                "estado",
                "tipo",
              ],
              dataInsert: [
                `'${id_portafolio}'`,
                `'${id}'`,
                `'${idGrupoCliente}'`,
                true,
                `'${tipo_portafolio}'`,
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
              console.log(
                "TODO BIEN EN EL PRIMER INSERT  * * * * * * * * * * * * "
              );
              console.log(
                "ID DEL PORTAFOLIO QUE SE VA A GUARDRA: ",
                id_portafolio
              );

              let dataSave2 = {
                tableName: "portafolio_auditoria",
                dataInsertType: [
                  "id_portafolio_auditoria",
                  "id_portafolio",
                  "id_producto",
                ],
                dataInsert: [
                  `'${idPortafolioAuditoria}'`,
                  `'${id_portafolio}'`,
                  `'${id}'`,
                ],
              };
              const sentence2 =
                "INSERT INTO " +
                dataSave2.tableName +
                " (" +
                dataSave2.dataInsertType.join() +
                ") VALUES(" +
                dataSave2.dataInsert.join() +
                ")";
              console.log("SENTENCIA A EJECUTAR: ", sentence2);

              try {
                db_insertGlobalDataAudit(dataSave2);
                console.log("TODO BIEN");
                //setShowButton1(false);
                //setShowButton2(true);
                setIsModalVisible(false);
              } catch (e) {
                Alert.alert(
                  "Error al insertar los datos en la tabla portafolio_auditoria",
                  "Vuelva a intentarlo"
                );
              }
            } catch (e) {
              console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", e);
              Alert.alert("Error al insertar los datos", "Vuelva a intentarlo");
              setIsModalVisible(false);
            }
          } else {
            console.log("PRODUCTO IDEAL - - - - - - - - - : ", producto);
            console.log(
              "----------------- SALTANDO INSERCION  - - - - - - - - - : ",
              producto
            );

            let portafolioSave = {
              tableName: "portafolio_auditoria",
              dataInsertType: [
                "id_portafolio_auditoria",
                "id_portafolio",
                "id_producto",
              ],
              dataInsert: [
                `'${idPortafolioAuditoria}'`,
                `'${id_portafolio}'`,
                `'${id}'`,
              ],
            };

            const sentence =
              "INSERT INTO " +
              portafolioSave.tableName +
              " (" +
              portafolioSave.dataInsertType.join() +
              ") VALUES(" +
              portafolioSave.dataInsert.join() +
              ")";
            console.log("SENTENCIA A EJECUTAR: ", sentence);

            try {
              db_insertGlobalDataAudit(portafolioSave);
              console.log("TODO BIEN");
              navigation.navigate("prices", {
                currentStep,
                complementaryPortfolioProducts,
                idealPortfolioProducts,
                setComplementaryPortfolioProducts,
              });
              setIsModalVisible(false);
              setShowButton1(false);
              setShowButton2(true);
            } catch (e) {
              Alert.alert(
                "Error al insertar los datos en la tabla portafolio_auditoria",
                "Vuelva a intentarlo"
              );
            }
          }
        }
        let tempDataScreen = complementaryPortfolioProducts.map((item) => {
          return `**${JSON.stringify(item)}**`;
        });
        let tempDataScreenIdeal = idealPortfolioProducts.map((item) => {
          return `**${JSON.stringify(item)}**`;
        });

        let objUserInfo = {};
        try {
          const tmpInfoExtra = JSON.parse(
            global.userInfoScreen.userInfo.extra_info
          );
          const tmpPantalla = tmpInfoExtra.pantallas.cliente_informacion;
          const infoExtra = tmpPantalla.extra_info;
          objUserInfo = infoExtra;
          objUserInfo = {
            ...objUserInfo,
            ...{
              pantallas: tmpInfoExtra.pantallas,
            },
          };
        } catch (e) {
          try {
            const userInfoScreenTmp = await getCurrentScreenInformationLocal();
            const tempPantalla = JSON.parse(
              userInfoScreenTmp.userInfo.extra_info
            );
            objUserInfo = tempPantalla.pantallas.cliente_informacion.extra_info;
            objUserInfo = {
              ...objUserInfo,
              ...{
                pantallas: tempPantalla.pantallas,
              },
            };
          } catch (error) {
            objUserInfo = {};
            console.log(e);
          }
        }
        saveCurrentScreenUser(
          {
            screenName: `briefcase`,
            tableName: `portafolio`,
            itemId: `id_portafolio`,
            columnId: `id_portafolio`,
          },
          {
            // complementaryPortfolioProducts: tempDataScreen.toString(),
            // auditorias_id: {
            //   ...objUserInfo.auditorias_id ? objUserInfo.auditorias_id : {}, ...{
            //     id_portafolio_auditoria: idPortafolioAuditoria
            //   }
            // },
            pantallas: {
              ...(objUserInfo.pantallas ? objUserInfo.pantallas : {}),
              ...{
                briefcase: {
                  principal: {
                    screenName: `briefcase`,
                    tableName: `portafolio`,
                    itemId: `id_portafolio`,
                    columnId: `id_portafolio`,
                  },
                  extra_info: {
                    complementaryPortfolioProducts: tempDataScreen.toString(),
                    idealPortfolioProducts: tempDataScreenIdeal.toString(),
                    auditorias_id: {
                      ...(objUserInfo.auditorias_id
                        ? objUserInfo.auditorias_id
                        : {}),
                      ...{
                        id_portafolio_auditoria: idPortafolioAuditoria,
                      },
                    },
                    pantallas: {
                      ...(objUserInfo.pantallas ? objUserInfo.pantallas : {}),
                      briefcase: null,
                    },
                  },
                },
              },
            },
          }
        );
      } catch (e) {
        Alert.alert("Error antes de enviar los datos", "Vuelva a intentarlo");
        setIsModalVisible(false);
      }
    }
  };

  const handleDeleteRegisterLocal = async () => {
    setHadSaveBriefCase(false);
    if (infoScreen) {
      saveCurrentScreenUser(
        infoScreen.pantallas.cliente_informacion.principal,
        infoScreen
      );
    } else {
      const userInfoScreenTmp = await getCurrentScreenInformationLocal();
      const objUserInfo = JSON.parse(userInfoScreenTmp.userInfo.extra_info);
      saveCurrentScreenUser(
        objUserInfo.pantallas.cliente_informacion.principal,
        objUserInfo
      );
    }
    let tmpDataDelete = idealPortfolioProducts.concat(
      complementaryPortfolioProducts
    );
    tmpDataDelete.map((productos) => {
      const { id_portafolio, id, tipo_portafolio } = productos;
      console.log("*******************************************************");
      console.log(
        "******************ENTRANDO AL CICLO DE ELIMINADO DEL PORTAFOLIO***********************"
      );
      console.log("*******************************************************");
      console.log("PRODUCTO A ANALIZAR: - - - - - ", productos);
      if (id_portafolio !== "12" && id_portafolio !== "56") {
        console.log(
          " - - - - - - - - - - - ENTRANDO A ELIMINAR LOS DATOS DEL PORTAFOLIO - - - - - - - - - -- "
        );
        deleteRegisterAudit({
          tableName: "portafolio",
          objectId: "id_portafolio",
          valueId: id_portafolio,
        });
      }
      deleteRegisterAudit({
        tableName: "portafolio_auditoria",
        objectId: "id_portafolio_auditoria",
        valueId: `${
          infoScreen
            ? infoScreen.id_portafolio_auditoria
            : idPortafolioAuditoria
        }`,
      });
    });
  };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          handleDeleteRegisterLocal();
          setHadSaveBriefCase(false);
          setHadSave(false);
          navigation.navigate("audit");
        }}
        warning={"¿Está seguro de cancelar el progreso actual?"}
      />
      <View style={styles.headerContainer}>
        <ModernaHeader />
      </View>
      <LoaderModal
        animation={SAVE_ANIMATION}
        visible={isModalVisible}
        warning={"Almacenando datos, por favor espere..."}
      />
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={currentStep} />
        <View style={{ flex: 2 }}>
          <ScreenInformation
            title={"Portafolio"}
            text={
              "Selecciona los productos del portafolio ideal o del portafolio complementario"
            }
          />
        </View>
        <View
          style={{
            flex: 3,
            width: "100%",
            alignItems: "center",
            marginTop: -8,
          }}
        >
          <View style={{ flex: 0.1, width: "90%" }}>
            <Text style={styles.text}>Portafolio Ideal</Text>
          </View>
          <FlashListPortfolio
            //idPortafolio={idPortafolioIdeal}
            idealPortfolioProducts={idealPortfolioProducts}
            setIdealPortfolioProducts={setIdealPortfolioProducts}
            idealProducts={idealProducts}
            tipo={portafolioTipoIdeal}
            hadSave={hadSave}
            isUserScreen={infoScreen ? true : false}
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
            tipo={portafolioTipoComplementario}
            idPortafolio={idPortafolioComplementario}
            auxiliarArray={auxiliarArray}
            products={allProducts}
            complementaryPortfolioProducts={complementaryPortfolioProducts}
            isUserScreen={infoScreen ? true : false}
            selectItemsId={complementaryPortfolioProducts.map((item) => {
              return item.id;
            })}
          />
        </View>
        <View style={{ flex: 0.7, justifyContent: "center", width: "100%" }}>
          <DoubleDualStyledButton
            titleLeft={"Cancelar"}
            sizeLeft={theme.buttonSize.df}
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => {
              setIsModalVisibleClose(true), console.log("REGRESANDO  . . . ");
            }}
            titleRigth={"Guardar"}
            sizeRigth={theme.buttonSize.df}
            colorRigth={theme.colors.modernaRed}
            iconRigth={"content-save-all-outline"}
            typeRigth={"material-community"}
            onPressRigth={hadSave ? onlyNavigation : handleOpenModal}
            showButton1={showButton1}
            showButton2={showButton2}
            titleRigthSecond={"Siguiente"}
            sizeRigthSecond={theme.buttonSize.df}
            colorRigthSecond={theme.colors.modernaRed}
            showButton1Second={showButton1}
            showButton2Second={showButton2}
            onPressRigthSecond={() => {
              navigation.navigate("prices", {
                currentStep,
                complementaryPortfolioProducts,
                idealPortfolioProducts,
                setComplementaryPortfolioProducts,
              });
            }}
            iconRigthSecond={"arrow-right-circle"}
            typeRigthSecond={"feather"}
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
    //right: 130,
    fontSize: 14,
    //padding: 10,
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
