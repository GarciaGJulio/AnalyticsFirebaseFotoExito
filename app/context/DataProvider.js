import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [datosCompartidos, setDatosCompartidos] = useState();
  const [userDataInformation, setUserDataInformation] = useState();

  return (
    <DataContext.Provider
      value={{ datosCompartidos, setDatosCompartidos, setUserDataInformation }}
    >
      {children}
    </DataContext.Provider>
  );
};
