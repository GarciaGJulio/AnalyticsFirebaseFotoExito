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

const ModernaProvider = ({ children }) => {
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

  const handleLoginAzure = async (funcionQA) => {
    try {
      await AuthManager.signInAsync();
      const token = await AuthManager.getAccessTokenAsync();
      //console.log("token de inciios de session", token);
      if (token) {
        let user = await GraphManager.getUserAsync();
        await AsyncStorage.setItem("user", JSON.stringify(user));
        console.log("user from azure 1: ", JSON.stringify(user));
        console.log("MAIL DEL USUARIO: ", user.mail);
        setUserInfo(user);
        setIsAuthenticated(true);
        // user.mail=user.mail?user.mail:"soporte.clearmind@moderna.com.ec"
        /*if (user && user.mail) {
          user.mail = user.mail.toLowerCase();
          user.userPrincipalName = user.userPrincipalName.toLowerCase();
          console.log("user from azure 2:", user);
        }*/
      }
      // Si la autenticación es exitosa
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogoutAzure = async () => {
    try {
      console.log("CERRANDO SESION---------------");
      await AuthManager.signOutAsync();
      setIsAuthenticated(false);
    } catch (e) {
      showMessage({
        message: e.message || "Se ha producido un error inesperado",
        type: "danger",
        duration: 5000,
      });
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

export default ModernaProvider;

const styles = StyleSheet.create({});
