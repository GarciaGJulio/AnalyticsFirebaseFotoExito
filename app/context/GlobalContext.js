import React, { createContext, useCallback, useEffect, useState } from "react";
import { lookForVariable } from "../services/SeleccionesService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { realizarConsulta } from "../common/sqlite_config";
import { PERSISTENCIA } from "../common/table_columns";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(false);
  const [isConnectionActivate, setIsConnectionActivate] = useState(false);
  const [hadSaveBriefCase, setHadSaveBriefCase] = useState(false);
  const [hadSavePreciador, setHadSavePreciador] = useState(false);
  const [hadSaveRack, setHadSaveRack] = useState(false);
  const [productsPreciador, setProductsPreciador] = useState([]);
  const [refreshSync, setRefreshSync] = useState(false);
  const [variables, setVariables] = useState([]);
  /*const [productsIdealPreciador, setProductsIdealPreciador] = useState([]);
  const [productsComplementaryPreciador, setProductsComplementaryPreciador] =
    useState([]);*/
  const fetchVariables = () => {
    lookForVariable(setVariables);
  };

  useEffect(() => {
    fetchVariables();
  }, []);

  const handleDoesClientHaveVariable = async (nombre_variable) => {
    const id_grupo_cliente = await AsyncStorage.getItem("idGroupClient");
    const index = variables.findIndex((variable) => {
      return (
        variable.id_grupo_cliente.toUpperCase() ===
        id_grupo_cliente?.toString().toUpperCase() &&
        variable?.nombre_variable?.toUpperCase() ===
        nombre_variable?.toUpperCase()
      );
    });
    return index !== -1;
  };

  const CountClientVariable = async () => {

    console.log("--------------------------------eMPIEZA A ACONTAR VARIABLES")
    const id_grupo_cliente = await AsyncStorage.getItem("idGroupClient");
    let Variables2 = [];
    const NumeroVariables = variables.forEach((variable) => {
      console.log("entra?", variable.id_grupo_cliente.toUpperCase() ===
        id_grupo_cliente?.toString().toUpperCase())
      if (
        variable.id_grupo_cliente.toUpperCase() ===
        id_grupo_cliente?.toString().toUpperCase()
      ) {
        Variables2.push(variable);
        console.log("variable vALOR:", variable)
      }




    });
    console.log("arregloVARIABLES", Variables2.length)
    const total = Variables2.length
    // const NumeroVariables= variables.filter(variable => variable.id_grupo_cliente.toUpperCase() ===
    // id_grupo_cliente?.toString().toUpperCase())

    return total;
  };

  const clearWorkFlow = async () => {
    console.clear();
    console.warn("DELETED START");
    console.log(global?.userInfoScreen?.userInfo?.nombre_pantalla);
    let response = await realizarConsulta(
      `SELECT * FROM ${PERSISTENCIA.NAME} WHERE ${PERSISTENCIA.SCREEN_NAME} = '${global.userInfoScreen?.userInfo?.nombre_pantalla}'`
    );
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("response", response);
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("--------------------------------");
    if (Array.isArray(response) && response.length > 0) {
      response = response[0];
    }
    console.log(response);
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log(response);
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log("--------------------------------");

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
        console.log("--------------------------------");
        console.log("DELETED", request);
        console.log("--------------------------------");
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

  const handleCheckCanSaveAllDataLocal = useCallback(async (values) => {
    const totalVariables = await CountClientVariable()
    console.log("datos del total de variables", totalVariables)
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
        setProductsPreciador,
        handleDoesClientHaveVariable,
        fetchVariables,
        handleClearWorkFlow,
        CountClientVariable,
        handleCheckCanSaveAllDataLocal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
