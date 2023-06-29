import React, { createContext, useCallback, useEffect, useState } from "react";
import { lookForVariable } from "../services/SeleccionesService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { realizarConsulta } from "../common/sqlite_config";
import { PERSISTENCIA, VARIABLE } from "../common/table_columns";
import { ModernaModal } from "../components/ModernaModal";
import { generateUIDD, transfromrActualDateFormat } from "../common/utils";
import { dataTime } from "../services/GenerateID";
import SAVE_ANIMATION from "../../assets/save.json";

import { db_insertGlobalDataAudit } from "../services/SqliteService";
import { subidaBaseRemoteTodaAuditoria } from "../services/SubidaBaseRemota";
import { cleanCurrentScreenUser } from "../utils/Utils";
import { Alert, Text, Modal, View, Dimensions } from "react-native";
import LoaderModal from "../components/LoaderModal";
import ImageModal from "react-native-image-modal";
import theme from "../theme/theme";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(false);
  const [isConnectionActivate, setIsConnectionActivate] = useState(false);
  const [hadSaveBriefCase, setHadSaveBriefCase] = useState(false);
  const [hadSavePreciador, setHadSavePreciador] = useState(false);
  const [hadSaveRack, setHadSaveRack] = useState(false);
  const [productsPreciador, setProductsPreciador] = useState([]);
  const [refreshSync, setRefreshSync] = useState(false);
  // const [variables, setVariables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Texto del modal");
  const [modalTitle, setModalTitle] = useState("Título del modal");
  const [currentScreenPos, setCurrentScreenPos] = useState(0);
  const [isModalSaveVisible, setIsModalSaveVisible] = useState(false);
  const [messageModalSave, setMessageModalSave] = useState("Almacenando datos, por favor espere...");
  const [imageModal, setImageModal] = useState(null);


  /*const [productsIdealPreciador, setProductsIdealPreciador] = useState([]);
  const [productsComplementaryPreciador, setProductsComplementaryPreciador] =
    useState([]);*/
  // const fetchVariables = () => {
  //   lookForVariable(setVariables);
  // };

  useEffect(() => {
    //console.log("currentScreenPoscurrentScreenPos", currentScreenPos);
  }, [currentScreenPos]);
  useEffect(() => {
    // fetchVariables();
    initVariablesLocalStorage();
  }, []);
  const initVariablesLocalStorage = async (isPersistencia) => {
    //console.log("isPersistencia", isPersistencia);
    const currentPos = await AsyncStorage.getItem("currentScreenPos");
    const currentPosPer = await AsyncStorage.getItem("currentScreenPosPer");

    if (!currentPos) {
      await AsyncStorage.setItem("currentScreenPos", "0");
      await AsyncStorage.setItem("currentScreenPosPer", "0");
    } else {
      if (isPersistencia) {
        setCurrentScreenPos(parseInt(currentPosPer));
        AsyncStorage.setItem("currentScreenPos", `${currentPosPer}`);
      } else {
        setCurrentScreenPos(parseInt(currentPos));
      }
    }
  };

  const handleDoesClientHaveVariable = async (nombre_variable) => {
    const id_grupo_cliente = await AsyncStorage.getItem("idGroupClient");
    const variables = await realizarConsulta(`SELECT * from ${VARIABLE.NAME}  where estado_variable=1`);
    const index = variables.findIndex((variable) => {
      return (
        variable.id_grupo_cliente.toUpperCase() ===
        id_grupo_cliente?.toString().toUpperCase() &&
        variable?.nombre_variable?.toUpperCase() ===
        nombre_variable?.toUpperCase() &&
        variable?.estado_variable === 1
      );
    });
    return index !== -1;
  };

  const CountClientVariable = async (returnData) => {
    try {
      const variables = await realizarConsulta(
        `SELECT * from ${VARIABLE.NAME}  where estado_variable=1`
      );
      const id_grupo_cliente = await AsyncStorage.getItem("idGroupClient");
      let Variables2 = [];
      variables.forEach((variable) => {
        if (
          variable.id_grupo_cliente.toString().toUpperCase() ==
          id_grupo_cliente?.toString().toUpperCase()
        ) {
          Variables2.push(variable);
        }
      });
      const total = Variables2.length;
      return returnData ? Variables2 : total;
    } catch (e) {
      console.error(e);
      return 0;
    }
  };

  const clearWorkFlow = async () => {
    console.warn("DELETED START");
    cleanCurrentScreenUser();
    handleCleanStorage()
    handleCleanPosScreen();
    setHadSaveBriefCase(false);
    setHadSavePreciador(false);
    setHadSaveRack(false);
  
  };

  const handleClearWorkFlow = () => {
    clearWorkFlow();
    handleCleanPosScreen();
  };
  const handleCleanPosScreen = async () => {
    //console.log("limpiando las pos de las pantallas");
    await AsyncStorage.setItem("currentScreenPos", "0");
    await AsyncStorage.setItem("currentScreenPosPer", "0");
    initVariablesLocalStorage();
  };
  const handleCheckCanSaveAllDataLocal = useCallback(
    async (onFinish, onContinue, canFinsih, item) => {
      console.log("llamda para finalizar desde --------------", item)
      try {
        const variablesStrange = ["Precio", "Portafolio"];

        const variables = await CountClientVariable(true);
        const posScreen = await AsyncStorage.getItem("currentScreenPos");
        //console.log("variables *******", variables);
        let canSaveSpecial = false;
        if (variables.length == 2) {
          if (
            variablesStrange.includes(variables[0].nombre_variable) &&
            variablesStrange.includes(variables[1].nombre_variable)
          ) {
            if (posScreen >= variables.length || canFinsih) {
              canSaveSpecial = true;
            } else {
              canSaveSpecial = false;
            }
          }
        }

        if (posScreen >= variables.length || canSaveSpecial) {
          cleanCurrentScreenUser();
          handleCleanPosScreen();
          onFinish();
          // handleCleanStorage()
          //  if(canSaveSpecial){
          // setIsModalSaveVisible(false)
          //}

          console.log("********ya est+a al final de la pantalla/*******");
        } else {
          onContinue();
          console.log("********aun no está al final de la pantalla/*******");
        }


        //console.log("totalVariables", totalVariables);
        console.log("posScreen", posScreen);
      } catch (e) {
        console.error(e);
      }
    },
    []
  );
  const handleCurrentScreenPos = useCallback(async (pos, screenPos) => {
    const posScreen = await AsyncStorage.getItem("currentScreenPos");
    if (!posScreen) {
      await AsyncStorage.setItem("currentScreenPos", "0");
      await AsyncStorage.setItem("currentScreenPosPer", "0");
    } else if (screenPos) {
      await AsyncStorage.setItem("currentScreenPos", `${screenPos}`);
      await AsyncStorage.setItem(
        "currentScreenPosPer",
        `${screenPos - 1 >= 0 ? screenPos - 1 : 0}`
      );
    } else {
      await AsyncStorage.setItem(
        "currentScreenPos",
        `${parseInt(posScreen) + (pos ? pos : 1)}`
      );
      await AsyncStorage.setItem("currentScreenPosPer", `${posScreen}`);
    }
    initVariablesLocalStorage();
    return;
  }, []);

  const handleCleanStorage = async () => {
    await AsyncStorage.removeItem("idPromocion");
    await AsyncStorage.removeItem("id_preciador");
    await AsyncStorage.removeItem("id_percha");
    await AsyncStorage.removeItem("id_sucursal");
    await AsyncStorage.removeItem("id_cliente");
    await AsyncStorage.removeItem("nombre_cliente");
    await AsyncStorage.removeItem("nombre_sucursal");
    await AsyncStorage.removeItem("idGroupClient");
    await AsyncStorage.removeItem(
      "id_portafolio_auditoria"
    );
  }

  const handleSaveAudit = async (userInfo, navigation) => {
    try {
      const idAuditoria = generateUIDD();
      const idPromocion = await AsyncStorage.getItem("idPromocion");
      let idPreciador = await AsyncStorage.getItem("id_preciador");
      let idPercha = await AsyncStorage.getItem("id_percha");
      let idSucursal = await AsyncStorage.getItem("id_sucursal");
      let idCliente = await AsyncStorage.getItem("id_cliente");
      let nombreCliente = await AsyncStorage.getItem("nombre_cliente");
      let nombreSucursal = await AsyncStorage.getItem("nombre_sucursal");
      let idGroupClient = await AsyncStorage.getItem("idGroupClient");
      let idPortafolioAuditoria = await AsyncStorage.getItem(
        "id_portafolio_auditoria"
      );
      try {
        if (nombreCliente.includes("-")) {
          nombreCliente = nombreCliente.split("-")
          nombreCliente = nombreCliente[nombreCliente.length - 1]
          nombreCliente = nombreCliente.trim()
        }
      } catch (e) {
        nombreCliente = await AsyncStorage.getItem("nombre_cliente");
      }
      //console.log("------------------------------------nombreCliente------------------------", nombreCliente)
      let dataSave = {
        tableName: "auditoria",
        dataInsertType: [
          "id_auditoria",
          "id_preciador",
          "id_percha",
          "id_promocion",
          "id_sucursal",
          "id_cliente",
          "id_grupo_cliente",
          "id_portafolio_auditoria",
          "usuario_creacion",
          "fecha_creacion",
          "nombre_cliente",
          "nombre_sucursal",
          "sincronizada",
        ],
        dataInsert: [
          `'${idAuditoria}'`,
          idPreciador ? `'${idPreciador}'` : "null",
          idPercha ? `'${idPercha}'` : "null",
          idPromocion ? `'${idPromocion}'` : "null",
          idSucursal ? `'${idSucursal}'` : "null",
          idCliente ? `'${idCliente}'` : "null",
          idGroupClient ? `'${idGroupClient}'` : "null",
          idPortafolioAuditoria ? `'${idPortafolioAuditoria}'` : "null",
          `'${userInfo.mail}'`,
          `'${transfromrActualDateFormat(dataTime(), "F")}'`,
          `'${nombreCliente}'`,
          `'${nombreSucursal}'`,
          `${parseInt(0)}`,
        ],
      };
      try {
        // //console.log("insertand");
        // //console.log(
        //   "**********************************************************"
        // );
        // //console.log(dataSave);
        // //console.log(
        //   "***********************************************************"
        // );
        cleanCurrentScreenUser();
        db_insertGlobalDataAudit(dataSave);
     
        handleCleanPosScreen();
        handleCleanStorage()



        if (isConnectionActivate) {
          try {
            setIsModalSaveVisible(true)
            setMessageModalSave("Subiendo datos a la nube, por favor espere...")
            await subidaBaseRemoteTodaAuditoria(
              idAuditoria,
              () => {
                setIsModalSaveVisible(false)
                navigation.navigate("begin");
                Alert.alert("Auditoria registrada", "Auditoría registrada con éxito");
              },
              setGlobalVariable,
              globalVariable
            );

          } catch (e) {
            navigation.navigate("begin");
          }
          setMessageModalSave("Almacenando datos, por favor espere...")

        } else {
          setIsModalSaveVisible(false)
          navigation.navigate("begin");
        }
      } catch (e) {
        //console.log(e);
      }
    } catch (e) {
      //console.log("error al guardar la auditoría", e);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        globalVariable,
        setGlobalVariable,
        isConnectionActivate,
        setIsConnectionActivate,
        hadSaveBriefCase,
        setHadSaveBriefCase,
        hadSavePreciador,
        setHadSavePreciador,
        hadSaveRack,
        setHadSaveRack,
        productsPreciador,
        refreshSync,
        setRefreshSync,
        showModal,
        setShowModal,
        modalText,
        setModalText,
        modalTitle,
        setModalTitle,
        setProductsPreciador,
        handleDoesClientHaveVariable,
        handleSaveAudit,
        handleClearWorkFlow,
        CountClientVariable,
        handleCheckCanSaveAllDataLocal,
        currentScreenPos,
        handleCurrentScreenPos,
        handleCleanPosScreen,
        setIsModalSaveVisible,
        initVariablesLocalStorage,
        setImageModal
      }}
    >
      <ModernaModal
        text={modalText}
        visible={showModal}
        title={modalTitle}
        onClose={() => setShowModal(!showModal)}
      />



      <Modal
        visible={imageModal ? true : false}
        //visible={true}
        animationType="fade"
        transparent={true}
        style={{ flex: 1 }}
        onDismiss={() => {
          setImageModal(null)
        }}
        onClose={() => {
          setImageModal(null)
        }}

      >
        <View style={
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }
        }>
          {
            imageModal && <ImageModal
              key={imageModal}
              source={{ uri: imageModal }}
              style={{
                width: 250,
                height: 180,
                borderRadius: 10,
                borderWidth: 1,
                margin: 5,
                borderColor: theme.colors.black,
                padding: 1,
                resizeMode: "stretch",
              }}
              resizeMode="stretch"
            />
          }
        </View>


      </Modal>
      <LoaderModal
        animation={SAVE_ANIMATION}
        visible={isModalSaveVisible}
        warning={messageModalSave}
      />
      {children}
    </GlobalContext.Provider>
  );
};
