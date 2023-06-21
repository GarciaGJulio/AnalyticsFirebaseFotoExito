import React, { createContext, useEffect, useState } from "react";
import { lookForVariable } from "../services/SeleccionesService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(false);
  const [isConnectionActivate, setIsConnectionActivate] = useState(false);
  const [hadSaveBriefCase, setHadSaveBriefCase] = useState(false);
  const [hadSavePreciador, setHadSavePreciador] = useState(false);
  const [hadSaveRack, setHadSaveRack] = useState(false);
  const [productsPreciador, setProductsPreciador] = useState([]);
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
        setProductsPreciador,
        handleDoesClientHaveVariable,
        fetchVariables,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
