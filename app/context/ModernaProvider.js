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

  const handleLoginAzure = async (funcionQA) => {
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
        console.log("RESPUESTA DE CONSULTA USUARIO: ", userDataBase);
        console.log(
          "DISPOSITIVO DEL USUARIO: ",
          userDataBase[0].usuario_dispositivo
        );
        let deviceMacAdress = await DeviceInfo.getUniqueId();
        if (userDataBase[0].usuario_dispositivo === null) {
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
        } else {
          console.log(
            "El usuario ya cuenta con un dispositivo conectado ! ! ! ! !! ! ! ! ! ! "
          );
          if (userDataBase[0].usuario_dispositivo === deviceMacAdress) {
            console.log("MAC SIMILAR ENCONTRADA ---- AUTORIZANDO SESION");
            setIsAuthenticated(true);
          } else {
            AuthManager.signOutAsync();
            Alert.alert(
              "Error",
              "Este usuario ya ha iniciado sesión en otro dispositivo y no puedes iniciar sesión en el dispositivo actual"
            );
          }
        }
        /*const successFunctionChecker = async (data) => {
          if (data.data.dataBaseResult <= 0) {
            Alert.alert(
              "Error",
              "El usuario no está autorizado para iniciar sesión"
            );
            AuthManager.signOutAsync();
            //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
            //dispatch({ type: LOAD_USER_AZURE, payload: null });
            //handleLoading(false);
          } else {
            let deviceMacAdress = await DeviceInfo.getUniqueId();
            /*console.log(
              "usuario desde la base de azure ",
              data.data.dataBaseResult[0]
            );*/

        /*if (
              data.data.dataBaseResult[0].dispositivo_usuario ===
              deviceMacAdress
            ) {
              data.data.dataBaseResult["id"] =
                data.data.dataBaseResult[0].id_vendedor;
              //console.log("usuario ya almacenado en azure")
              successFunctionInsert(data);
            } else {
              const succesClientFuncDevice = () => {
                data.data.dataBaseResult["id"] =
                  data.data.dataBaseResult[0].id_vendedor;

                // handleDownloadDataAzure(data.data.dataBaseResult[0])

                successFunctionInsert(data);
              };
              const errorClientFuncDevice = () => {
                Alert.alert(
                  "Error",
                  "se ha producido un error inesperado, por favor intentelo en unos momentos"
                );
                AuthManager.signOutAsync();
                //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
                //dispatch({ type: LOAD_USER_AZURE, payload: null });
                //handleLoading(false);
              };
              try {
                if (
                  data.data.dataBaseResult[0].dispositivo_usuario == null ||
                  data.data.dataBaseResult[0].dispositivo_usuario.length <= 0
                ) {
                  await postAzure(
                    "https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==",
                    {
                      typeQuery: "U",
                      data: {
                        compare: [
                          "id_vendedor",
                          `'${data.data.dataBaseResult[0].id_vendedor}'`,
                        ],
                        fieldType: ["dispositivo_usuario"],
                        fieldData: [`'${deviceMacAdress}'`],
                      },
                    },
                    succesClientFuncDevice,
                    errorClientFuncDevice
                  );
                } else {
                  Alert.alert(
                    "Error",
                    "Su cuenta está activa en otro dispositivo, cierre sesión en su otro dispositivo e intente nuevamente "
                  );
                  AuthManager.signOutAsync();
                  //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
                  //dispatch({ type: LOAD_USER_AZURE, payload: null });
                  //handleLoading(false);

                  await postAzure(
                    tempEnvironment
                      ? tempEnvironment.sellerFunction
                      : state.environmentUser.sellerFunction,
                    {
                      typeQuery: "R",
                      data: {
                        compare: [
                          "correo",
                          `'${user.mail ? user.mail : user.userPrincipalName}'`,
                        ],
                      },
                    },
                    successFunctionChecker,
                    errorFunction
                  );
                }
              } catch (e) {
                Alert.alert("Error", "Error inseperado");
                AuthManager.signOutAsync();
                //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
                //dispatch({ type: LOAD_USER_AZURE, payload: null });
                //handleLoading(false);
              }
            }
          }
          // thereIsUser=IsUser;
        };
        const successFunctionInsert = (bodyResponse) => {
          try {
            loadUserSql(bodyResponse.data.dataBaseResult[0]);
            //console.log("bodyResponse---para localstorage", bodyResponse)

            db_insertVendor(
              bodyResponse.data.dataBaseResult.id,
              user.displayName ? user.displayName : user.givenName,
              user.mail,
              bodyResponse.data.dataBaseResult[0].centro,
              bodyResponse.data.dataBaseResult[0].almacen,
              bodyResponse.data.dataBaseResult[0].codigo_prodiverso,
              JSON.stringify(user)
            );
            dispatch({ type: LOAD_IS_AUTENTICATED, payload: true });
            dispatch({ type: LOAD_USER_AZURE, payload: user });
            handleLoading(false);
          } catch (e) {
            handleLoading(false);
            console.log("error ", e);
          }
        };
        const errorFunction = (data) => {
          handleLoading(false);
          showMessage({
            message: data.message || "Se ha producido un error inesperado",
            type: "danger",
            duration: 5000,
          });
          // thereIsUser=IsUser;
          console.log("error al realizar la consulta de vendedor", data);
        };
        //console.log("VALIDACION DE MAC DEL DISPOSITIVO: ", result);
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
    /*if (userInfo.mail != null) {
      console.log(
        "DATOS DEL USUARIO: MAIL - ",
        userInfo.mail.toLowerCase().toString()
      );
    } else {
      console.log(
        "DATOS DEL USUARIO: MAIL - ",
        userInfo.mail.toLowerCase().toString()
      );
      console.log(
        "DATOS DEL USUARIO: MAIL - ",
        userInfo.userPrincipalName.toLowerCase().toString()
      );
    }*/

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
      /*showMessage({
        message: e.message || "Se ha producido un error inesperado",
        type: "danger",
        duration: 5000,
      });*/
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
