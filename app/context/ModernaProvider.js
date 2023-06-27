import React, { createContext, useEffect, useReducer, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AuthManager } from "../azureConfig/auth/AuthManager";
import ModernaReducer from "./ModernaReducer";
import { LOAD_ID_CLIENT_GROUP, LOAD_LOCATIONS } from "./ModernaTypes";
import { GraphManager } from "../azureConfig/graph/GraphManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { useCallback } from "react";
import { ModernaModal } from "../components/ModernaModal";

export const ModernaContext = createContext();

export const ModernaProvider = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({}); // Inicializar con un objeto vacío
  const [displayName, setDisplayName] = useState("Usuario Genérico"); // Inicializar con un objeto vacío
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Texto del modal");
  const [modalTitle, setModalTitle] = useState("Título del modal");

  const isLoggedIn = async () => {
    //console.log("CARGANDO LOS DATOS DE INICIO");
    try {
      let user = await AsyncStorage.getItem("user");
      let userName = await AsyncStorage.getItem("userName");
      let infoSaved = JSON.parse(user);
      if (infoSaved && typeof infoSaved === "object") {
        setUserInfo(infoSaved);
        setDisplayName(userName);
        //console.log("DATO CONSEGUIDO DE ASYNC ---------------");
        //console.log("\nDATOS DE USUARIO:\n");
        //console.log(infoSaved);
        //console.log("\nNOMBRE DE USUARIO:\n");
        //console.log(infoSaved);
      } else {
        //console.log("NO SE HAN ENCONTRADO LOS DATOS DE USUARIO");
        setUserInfo({}); // Establecer userInfo como un objeto vacío
      }
    } catch (e) {
      //console.log(`IS LOGGED ERROR ${e}`);
      setUserInfo({}); // Establecer userInfo como un objeto vacío
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const initialState = {
    location: null,
    idClientGroup: null,
  };

  const handleIdClientGroup = (idClientGroup) => {
    //console.log("actualizando id de grupo de cliente", idClientGroup);
    dispatch({ type: LOAD_ID_CLIENT_GROUP, payload: idClientGroup });
  };

  const [state, dispatch] = useReducer(ModernaReducer, initialState);

  const handleLoginAzure = async (funcionQA, fn) => {
    try {
      await AuthManager.signInAsync();
      const token = await AuthManager.getAccessTokenAsync();
      ////console.log("token de inciios de session", token);
      if (token) {
        let user = await GraphManager.getUserAsync();
        await AsyncStorage.setItem("user", JSON.stringify(user));
        //console.log("user from azure 1: ", JSON.stringify(user));
        if (user.mail != null) {
          await AsyncStorage.setItem("userName", user.displayName);
          setDisplayName(user.displayName);
          // //console.log(
          //   " ** * * * * ** * * * ** *  NOMBRE DE USUARIO: ",
          //   user.displayName
          // );
          //console.log("MAIL DEL USUARIO: ", user.mail);
          user.mail = user.mail.toLowerCase().toString();
          //console.log("MAIL DEL USUARIO: ", user.userPrincipalName);
          user.mail = user.userPrincipalName.toLowerCase().toString();
        } else {
          //console.log("USERPRINCIPAL DEL USUARIO: ", user.userPrincipalName);
          user.userPrincipalName = user.userPrincipalName
            .toLowerCase()
            .toString();
        }
        setUserInfo(user);
        const userDataBase = await makeRequest(
          user.mail,
          user.userPrincipalName
        );

        if (userDataBase.length == 0) {
          //console.log("ESTE USUARIO NO HA SIDO REGISTRADO EN LA BASE- - - - -");
          AuthManager.signOutAsync();
          setShowModal(!showModal);
          setModalTitle("Usuario no encontrado");
          setModalText(
            "Este usuario no está registrado en la base de datos, y no puede acceder a este sistema."
          );
          /*Alert.alert(
            "Usuario no encontrado",
            "Este usuario no está registrado en la base de datos, y no puede acceder a este sistema "
          );*/
          fn(false);
        } else {
          //console.log("RESPUESTA DE CONSULTA USUARIO: ", userDataBase);
          // //console.log(
          //   "ID DEL USUARIO ACTUAL - - - - - : ",
          //   userDataBase[0].id_usuario
          // );
          const userRol = await makeRolRequest(userDataBase[0].id_usuario);
          if (userRol.length == 0) {
            // //console.log(
            //   "ESTE USUARIO NO TIENE ASIGNADO NINGUN ROL: -------",
            //   userRol
            // );
            setShowModal(!showModal);
            setModalTitle("Este usuario no tiene asignado ningún rol");
            setModalText(
              "No puedes acceder a los servicios de esta aplicación."
            );
            /*Alert.alert(
              "Este usuario no tiene asignado ningún rol",
              "No puedes acceder a los servicios de esta aplicación"
            );*/
            ////console.log("ROL DEL USUARIO: -------", haveRol);
            fn(false);
          } else {
            const haveAuditRol = userRol.filter(
              (objeto) => objeto.id_rol == "3"
            );
            if (haveAuditRol) {
              // //console.log(
              //   "DISPOSITIVO DEL USUARIO: ",
              //   userDataBase[0].usuario_dispositivo
              // );
              let deviceMacAdress = await DeviceInfo.getUniqueId();
              if (
                userDataBase[0].usuario_dispositivo === "null" ||
                userDataBase[0].usuario_dispositivo === null
              ) {
                // //console.log(
                //   "El usuario no tiene un dispositivo conectado - - - - - - - -"
                // );
                //console.log("MAC A INSERTAR EN LA BASE: ", deviceMacAdress);
                /*const responseInsertMac = await insertMacCurrentUser(
                  user.mail,
                  user.userPrincipalName,
                  deviceMacAdress
                );*/
                //console.log("INSERTO LA MAC?: ", responseInsertMac);
                await insertMacCurrentUser(
                  user.mail,
                  user.userPrincipalName,
                  deviceMacAdress
                );
                setIsAuthenticated(true);
                fn(false);
              } else {
                // //console.log(
                //   "El usuario ya cuenta con un dispositivo conectado ! ! ! ! !! ! ! ! ! ! "
                // );
                if (userDataBase[0].usuario_dispositivo == deviceMacAdress) {
                  //console.log("MAC SIMILAR ENCONTRADA ---- AUTORIZANDO SESION");
                  setIsAuthenticated(true);
                  fn(false);
                } else {
                  AuthManager.signOutAsync();
                  setShowModal(!showModal);
                  setModalTitle("Error al acceder");
                  setModalText(
                    "Este usuario ya ha iniciado sesión en otro dispositivo y no puedes iniciar sesión en el dispositivo actual."
                  );
                  /*Alert.alert(
                    "Error",
                    "Este usuario ya ha iniciado sesión en otro dispositivo y no puedes iniciar sesión en el dispositivo actual"
                  );*/
                  fn(false);
                }
              }
            } else {
              // //console.log(
              //   "ESTE USUARIO NO TIENE ASIGNADO EL ROL DE AUDITOR: -------",
              //   userRol
              // );
              setShowModal(!showModal);
              setModalTitle("Este usuario no tiene asignado el rol auditor");
              setModalText(
                "No puedes acceder a los servicios de esta aplicación."
              );
              /*Alert.alert(
                "Este usuario no tiene asignado el rol auditor",
                "No puedes acceder a los servicios de esta aplicación"
              );*/
              ////console.log("ROL DEL USUARIO: -------", haveRol);
              fn(false);
            }
          }
        }
      }
    } catch (e) {
      //console.log("flujo cancelado . . . ", e);
      fn(false);
    }
  };

  const makeRequest = async (mail, userPrincipalName) => {
    try {
      const requestBody = {
        typeQuery: "LIKE",
        data: {
          tableName: "usuario",
          fieldType: ["correo"],
          fieldData: [`${mail === null ? userPrincipalName : mail}`],
        },
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const response = await axios.post(
        "https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==",
        requestBody,
        config
      );
      return response.data.data;
    } catch (error) {
      //console.log("Error en la petición:", error);
      return null;
    }
  };

  const makeRolRequest = async (id_user) => {
    try {
      const requestBody = {
        typeQuery: "LIKE",
        data: {
          tableName: "rol_usuario",
          fieldType: ["id_usuario"],
          fieldData: [`${id_user}`],
        },
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const response = await axios.post(
        "https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==",
        requestBody,
        config
      );
      return response.data.data;
    } catch (error) {
      //console.log("Error en la petición:", error);
      return null;
    }
  };

  const insertMacCurrentUser = async (mail, userPrincipalName, deviceMac) => {
    try {
      const requestBody = {
        operation: "C",
        data: {
          sentence: `UPDATE usuario SET usuario_dispositivo='${deviceMac}'  WHERE correo='${
            mail === null ? userPrincipalName : mail
          }'`,
        },
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const response = await axios.post(
        "https://fotoexito1.azurewebsites.net/api/queryInsert?code=Pd_oqC3bfYtub9E13hybiElqLCtsPgO9FErzdxdzL-ISAzFuhWl7ug==",
        requestBody,
        config
      );
      return response.data.data;
    } catch (error) {
      //console.log("Error en la petición:", error);
    }
  };

  const handleLogoutAzure = async () => {
    let mail = null;
    let userPrincipalName = null;
    try {
      //console.log("CERRANDO SESION---------------");
      if (userInfo.mail != null) {
        mail = userInfo.mail.toLowerCase();
        userPrincipalName = userInfo.userPrincipalName.toLowerCase();
      } else {
        userPrincipalName = userInfo.userPrincipalName.toLowerCase();
      }
      const responseInsertMac = await insertMacCurrentUser(
        mail,
        userPrincipalName,
        null
      );
      //console.log("ELIMINANDO MAC: ", responseInsertMac);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userToken");
      await AuthManager.signOutAsync();
      setIsAuthenticated(false);
    } catch (e) {
      //console.log("datos al moemtno de cerrar la sesion", e);
    }
    setIsAuthenticated(false);
  };
  return (
    <ModernaContext.Provider
      value={{
        isLogging,
        isConnected,
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setDisplayName,
        displayName,
        location: state.location,
        idClientGroup: state.idClientGroup,
        setIsLogging,
        setIsConnected,
        handleIdClientGroup,
        handleLoginAzure,
        handleLogoutAzure,
      }}
    >
      <ModernaModal
        text={modalText}
        visible={showModal}
        title={modalTitle}
        onClose={() => setShowModal(!showModal)}
      />
      {children}
    </ModernaContext.Provider>
  );
};
