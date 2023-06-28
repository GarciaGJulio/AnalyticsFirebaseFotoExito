import React, { createContext, useCallback, useEffect, useState } from "react";
import { lookForVariable } from "../services/SeleccionesService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { realizarConsulta } from "../common/sqlite_config";
import { PERSISTENCIA, VARIABLE } from "../common/table_columns";
import { ModernaModal } from "../components/ModernaModal";
import { generateUIDD, transfromrActualDateFormat } from "../common/utils";
import { dataTime } from "../services/GenerateID";
import { db_insertGlobalDataAudit } from "../services/SqliteService";
import { subidaBaseRemoteTodaAuditoria } from "../services/SubidaBaseRemota";
import { cleanCurrentScreenUser } from "../utils/Utils";
import { Alert } from "react-native";

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
  /*const [productsIdealPreciador, setProductsIdealPreciador] = useState([]);
  const [productsComplementaryPreciador, setProductsComplementaryPreciador] =
    useState([]);*/
  // const fetchVariables = () => {
  //   lookForVariable(setVariables);
  // };

  useEffect(() => {
    console.log("currentScreenPoscurrentScreenPos", currentScreenPos);
  }, [currentScreenPos]);
  useEffect(() => {
    // fetchVariables();
    initVariablesLocalStorage();
  }, []);
  const initVariablesLocalStorage = async (isPersistencia) => {
    console.log("isPersistencia", isPersistencia);
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
    const variables = await realizarConsulta(`SELECT * from ${VARIABLE.NAME}`);
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
    console.clear();
    console.warn("DELETED START");
    //console.log(global?.userInfoScreen?.userInfo?.nombre_pantalla);
    let response = await realizarConsulta(
      `SELECT * FROM ${PERSISTENCIA.NAME} WHERE ${PERSISTENCIA.SCREEN_NAME} = '${global.userInfoScreen?.userInfo?.nombre_pantalla}'`
    );

    if (Array.isArray(response) && response.length > 0) {
      response = response[0];
    }

    const nombre_pantalla = response?.nombre_pantalla;
    setHadSaveBriefCase(false);
    setHadSavePreciador(false);
    setHadSaveRack(false);
    switch (nombre_pantalla?.toUpperCase()) {
      case "BRIEFCASE": {
        setHadSaveBriefCase(false);
        break;
      }
      case "AUDIT": {
        const request = await realizarConsulta(
          `DELETE FROM ${response.nombre_tabla} WHERE ${response.campo_id} = '${response.id_registro}'`
        );
        break;
      }
    }
    await realizarConsulta(
      `DELETE FROM ${PERSISTENCIA.NAME} WHERE ${PERSISTENCIA.SCREEN_NAME} = '${global.userInfoScreen.userInfo.nombre_pantalla}'`
    );
    global.userInfoScreen.userInfo = {};
    console.warn("DELETED");
  };

  const handleClearWorkFlow = () => {
    clearWorkFlow();
    handleCleanPosScreen();
  };
  const handleCleanPosScreen = async () => {
    console.log("limpiando las pos de las pantallas");
    await AsyncStorage.setItem("currentScreenPos", "0");
    await AsyncStorage.setItem("currentScreenPosPer", "0");
    initVariablesLocalStorage();
  };
  const handleCheckCanSaveAllDataLocal = useCallback(
    async (onFinish, onContinue, canFinsih) => {
      try {
        const variablesStrange = ["Precio", "Portafolio"];

        const variables = await CountClientVariable(true);
        const posScreen = await AsyncStorage.getItem("currentScreenPos");
        console.log("can finish*******", canFinsih);
        let canSaveSpecial = false;
        if (variables.length == 2 && canFinsih) {
          if (
            variablesStrange.includes(variables[0].nombre_variable) &&
            variablesStrange.includes(variables[1].nombre_variable)
          ) {
            if (posScreen >= variables.length) {
              canSaveSpecial = true;
            } else {
              canSaveSpecial = false;
            }
          }
        }

        if (posScreen >= variables.length || canSaveSpecial) {
          onFinish();
          cleanCurrentScreenUser();
          handleCleanPosScreen();
          console.log("********ya est+a al final de la pantalla/*******");
        } else {
          onContinue();
          console.log("********aun no está al final de la pantalla/*******");
        }
        //onsole.log("totalVariables", totalVariables);
        console.log("posScreen", posScreen);
      } catch (e) {
        console.error(e);
      }
    },
    []
  );
  const handleCurrentScreenPos = useCallback(async (pos, screenPos) => {
    const posScreen = await AsyncStorage.getItem("currentScreenPos");
    console.log("posScreen******************", posScreen);
    console.log("posScreen type of******************", typeof posScreen);
    console.log("screenPos ******************", screenPos);
    console.log("pos ******************", pos);

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
        console.log("insertand");
        console.log(
          "**********************************************************"
        );
        console.log(dataSave);
        console.log(
          "***********************************************************"
        );
        db_insertGlobalDataAudit(dataSave);
        Alert.alert("Auditoria registrada", "Auditoría registrada con éxito");
        if (isConnectionActivate) {
          try {
            await subidaBaseRemoteTodaAuditoria(
              idAuditoria,
              () => {},
              setGlobalVariable,
              globalVariable
            );
            navigation.navigate("begin");
          } catch (e) {
            navigation.navigate("begin");
          }
        } else {
          navigation.navigate("begin");
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log("error al guardar la auditoría", e);
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
        initVariablesLocalStorage,
      }}
    >
      <ModernaModal
        text={modalText}
        visible={showModal}
        title={modalTitle}
        onClose={() => setShowModal(!showModal)}
      />
      {children}
    </GlobalContext.Provider>
  );
};
