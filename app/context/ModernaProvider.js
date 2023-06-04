import { Alert, StyleSheet, Text, View } from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react";
import ModernaContext from "./ModernaContext";
import NetInfo from "@react-native-community/netinfo";
import { AuthManager } from "../azureConfig/auth/AuthManager";
import ModernaReducer from "./ModernaReducer";
import { LOAD_ID_CLIENT_GROUP, LOAD_LOCATIONS } from "./ModernaTypes";
import { GraphManager } from "../azureConfig/graph/GraphManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import axios from "axios";

export const ModernaProvider = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  //const [idClientGroup, setIdClientGroup] = useState("");
  //const idClientGroupRef = useRef("");

  /*const setIdClientGroup = (value) => {
    idClientGroupRef.current = value;
    console.log("ACTUALIZANDO VALOR A  .. . . . ",value)
    console.log("VALOR NUEVO DE IDCLIENTE  .. . . . ",idClientGroupRef.current)
  };*/

  const isLoggedIn = async () => {
    console.log("CARGANDO LOS DATOS DE INCIO");
    try {
      //setLogged(true)
      //setIsLoading(true)
      let userInfo = await AsyncStorage.getItem("user");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        /*setTimeout(() => setIsLogged(false)
            ,2300)*/
        setUserInfo(userInfo);
        console.log("DATO CONSEGUIDO DE ASYNC ---------------");
        console.log("\nDATOS DE USUARIO:\n");
        console.log(userInfo);
      } else {
        //setTimeout(() => setIsLogged(false),2300)
        console.log("NO SE HAN ENCONTRADO LOS DATOS DE USUARIO");
      }
    } catch (e) {
      console.log(`IS LOGGED ERROR ${e}`);
    }
  };

  useEffect(() => {
    //fetchUser()
    isLoggedIn();
  }, []);

  const initialState = {
    location: null,
    idClientGroup: null,
  };
  const [state, dispatch] = useReducer(ModernaReducer, initialState);
  /*useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);*/
  const handleLocations = useCallback(async (locations) => {
    console.log("locations from context", locations);
    dispatch({ type: LOAD_LOCATIONS, payload: locations });
  }, []);

  const handleIdClientGroup = (idClientGroup) => {
    console.log("actualizando id de grupo de cliente", idClientGroup);
    dispatch({ type: LOAD_ID_CLIENT_GROUP, payload: idClientGroup });
  };

  const handleLoading = useCallback(async (isLoading) => {
    //dispatch({ type: LOADING_START, payload: isLoading });
    await handleWasUpdatedLocalData(true);
  }, []);

  const handleWasUpdatedLocalData = useCallback(async (wasUpdatedLocal) => {
    //console.log("cambiando desde dispachs", wasUpdatedLocal)
    //dispatch({ type: WAS_UPDATED_LOCAL_DATA, payload: wasUpdatedLocal });
  }, []);

  const handleLoginAzure = async (funcionQA, fn) => {
    try {
      await AuthManager.signInAsync();
      const token = await AuthManager.getAccessTokenAsync();
      //console.log("token de inciios de session", token);
      if (token) {
        let user = await GraphManager.getUserAsync();
        await AsyncStorage.setItem("user", JSON.stringify(user));
        console.log("user from azure 1: ", JSON.stringify(user));
        if (user.mail != null) {
          console.log("MAIL DEL USUARIO: ", user.mail);
          user.mail = user.mail.toLowerCase().toString();
          console.log("MAIL DEL USUARIO: ", user.userPrincipalName);
          user.mail = user.userPrincipalName.toLowerCase().toString();
        } else {
          console.log("USERPRINCIPAL DEL USUARIO: ", user.userPrincipalName);
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
          console.log("ESTE USUARIO NO HA SIDO REGISTRADO EN LA BASE- - - - -");
          AuthManager.signOutAsync();
          Alert.alert(
            "Usuario no encontrado",
            "Este usuario no está registrado en la base de datos, y no puede acceder a este sistema "
          );
          fn(false);
        } else {
          console.log("RESPUESTA DE CONSULTA USUARIO: ", userDataBase);
          console.log(
            "DISPOSITIVO DEL USUARIO: ",
            userDataBase[0].usuario_dispositivo
          );
          let deviceMacAdress = await DeviceInfo.getUniqueId();
          if (
            userDataBase[0].usuario_dispositivo === "null" ||
            userDataBase[0].usuario_dispositivo === null
          ) {
            console.log(
              "El usuario no tiene un dispositivo conectado - - - - - - - -"
            );
            console.log("MAC A INSERTAR EN LA BASE: ", deviceMacAdress);
            const responseInsertMac = await insertMacCurrentUser(
              user.mail,
              user.userPrincipalName,
              deviceMacAdress
            );
            console.log("INSERTO LA MAC?: ", responseInsertMac);
            setIsAuthenticated(true);
            fn(false);
          } else {
            console.log(
              "El usuario ya cuenta con un dispositivo conectado ! ! ! ! !! ! ! ! ! ! "
            );
            if (userDataBase[0].usuario_dispositivo === deviceMacAdress) {
              console.log("MAC SIMILAR ENCONTRADA ---- AUTORIZANDO SESION");
              setIsAuthenticated(true);
              fn(false);
            } else {
              AuthManager.signOutAsync();
              Alert.alert(
                "Error",
                "Este usuario ya ha iniciado sesión en otro dispositivo y no puedes iniciar sesión en el dispositivo actual"
              );
              fn(false);
            }
          }
        }
      }
    } catch (e) {
      console.log("flujo cancelado . . . ", e);
      fn(false);
    }
  };

  const postAzure = async (
    urlRequest,
    data,
    succuesFunction,
    errorFunction
  ) => {
    console.log("realizando fetch al al url ", urlRequest);
    console.log("realizando fetch al al data ", data);

    // request options
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await fetch(urlRequest, options);
      //  console.log("si hay response*----");
      let bodyResponse;

      try {
        bodyResponse = await response.json();
      } catch (e) {
        bodyResponse = undefined;
      }

      //console.log("bodyResponse first", bodyResponse);

      if (bodyResponse) {
        if (response.status == 200 || response.status == 201) {
          if (bodyResponse.success) {
            //console.log("------- RESPONDE EL serviciocon éxito----------", bodyResponse);
            succuesFunction(bodyResponse);
          } else {
            errorFunction(bodyResponse);
          }
        } else {
          errorFunction(bodyResponse);
        }
      } else {
        errorFunction(null);
        console.log("no hay cuerpo del mensaje");
      }
    } catch (err) {
      console.log("error al hacer la consulta al postman", err);
      errorFunction(err);
    }
    return;
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
      console.log("Error en la petición:", error);
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
      console.log("Error en la petición:", error);
    }
  };

  const handleLogoutAzure = async () => {
    let mail = null;
    let userPrincipalName = null;
    try {
      console.log("CERRANDO SESION---------------");
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
      console.log("ELIMINANDO MAC: ", responseInsertMac);
      await AuthManager.signOutAsync();
      setIsAuthenticated(false);
    } catch (e) {
      console.log("datos al moemtno de cerrar la sesion", e);
    }
    setIsAuthenticated(false);
  };
  return (
    <ModernaContext.Provider
      value={{
        isLogging,
        isConnected,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated,
        userInfo,
        location: state.location,
        idClientGroup: state.idClientGroup,
        //setIdClientGroup,
        setIsLogging,
        setIsConnected,
        handleLocations,
        handleIdClientGroup,
        handleLoginAzure,
        handleLogoutAzure,
        //handleLogoutAzure,
        handleLoading,
      }}
    >
      {children}
    </ModernaContext.Provider>
  );
};

const styles = StyleSheet.create({});
