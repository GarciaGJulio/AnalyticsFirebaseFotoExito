import React, { createContext, useCallback, useEffect, useState } from "react";
import { lookForVariable } from "../services/SeleccionesService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { realizarConsulta } from "../common/sqlite_config";
import { PERSISTENCIA, VARIABLE } from "../common/table_columns";
import { ModernaModal } from "../components/ModernaModal";

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
  const [currentScreenPos, setCurrentScreenPos] = useState(1)
  /*const [productsIdealPreciador, setProductsIdealPreciador] = useState([]);
  const [productsComplementaryPreciador, setProductsComplementaryPreciador] =
    useState([]);*/
  // const fetchVariables = () => {
  //   lookForVariable(setVariables);
  // };

  useEffect(() => {
    // fetchVariables();
    initVariablesLocalStorage()
  }, []);
  const initVariablesLocalStorage = async (isPersistencia) => {
    console.log("isPersistencia", isPersistencia)
    const currentPos = await AsyncStorage.getItem('currentScreenPos');
    const currentPosPer = await AsyncStorage.getItem('currentScreenPosPer');

    if (!currentPos) {
      await AsyncStorage.setItem('currentScreenPos', "1");
      await AsyncStorage.setItem('currentScreenPosPer', "1");
    } else {
      if (isPersistencia) {
        setCurrentScreenPos(parseInt(currentPosPer))
        console.log("(currentPos - 1)*********", currentPos)
        console.log("(currentPosPer - 1)*********", currentPosPer)

        AsyncStorage.setItem('currentScreenPos', `${currentPosPer}`);
      } else {
        setCurrentScreenPos(parseInt(currentPos))

      }
    }

  }

  const handleDoesClientHaveVariable = async (nombre_variable) => {
    const id_grupo_cliente = await AsyncStorage.getItem("idGroupClient");
    const variables = await realizarConsulta(`SELECT * from ${VARIABLE.NAME}`)
    console.log("Variables---------------------",variables)
    const index = variables.findIndex((variable) => {
      return (
        variable.id_grupo_cliente.toUpperCase() ===
        id_grupo_cliente?.toString().toUpperCase() &&
        variable?.nombre_variable?.toUpperCase() ===
        nombre_variable?.toUpperCase() &&
        variable?.estado_variable ===1

      );
    });
    return index !== -1;
  };

  const CountClientVariable = async () => {
    try {
      const variables = await realizarConsulta(`SELECT * from ${VARIABLE.NAME}  where estado_variable=1`)
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
      const total = Variables2.length
      return total;
    } catch (e) {
      console.error(e)
      return 0

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
  };

  const handleCheckCanSaveAllDataLocal = useCallback(async (onFinish,onContinue) => {
    try {
      const totalVariables = await CountClientVariable()
      const posScreen = await AsyncStorage.getItem('currentScreenPos')
      if (posScreen > totalVariables) {
        onFinish()
        //console.log("*********************ya est+a al final de la pantalla*/*****************")
      } else {
        onContinue()
        //console.log("*********************aun no está al final de la pantalla*/*****************")
      }
     // console.log("totalVariables", totalVariables)
     // console.log("posScreen", posScreen)
    } catch (e) {
      console.error(e)
    }
  }, [])
  const handleCurrentScreenPos = useCallback(async (pos, screenPos) => {
    const posScreen = await AsyncStorage.getItem('currentScreenPos')
    if (!posScreen) {
      await AsyncStorage.setItem('currentScreenPos', "1")
      await AsyncStorage.setItem('currentScreenPosPer', "1")

    } else if (screenPos) {
      await AsyncStorage.setItem('currentScreenPos', `${screenPos}`)
      await AsyncStorage.setItem('currentScreenPosPer', `${(screenPos - 1) > 0 ? (screenPos - 1) : 1}`)
    } else {
      await AsyncStorage.setItem('currentScreenPos', `${parseInt(posScreen) + (pos ? pos : 1)}`)
      await AsyncStorage.setItem('currentScreenPosPer', `${posScreen}`)

    }
    initVariablesLocalStorage()
    return
  }, [])
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

        handleClearWorkFlow,
        CountClientVariable,
        handleCheckCanSaveAllDataLocal,
        currentScreenPos,
        handleCurrentScreenPos,
        initVariablesLocalStorage
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
