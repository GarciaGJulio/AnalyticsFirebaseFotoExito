import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [datosCompartidos, setDatosCompartidos] = useState();

  return (
    <DataContext.Provider value={{ datosCompartidos, setDatosCompartidos }}>
      {children}
    </DataContext.Provider>
  );
};
