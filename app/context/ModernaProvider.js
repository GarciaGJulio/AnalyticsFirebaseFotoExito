import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useReducer } from 'react'
import ModernaContext from './ModernaContext'
import NetInfo from '@react-native-community/netinfo';
import { AuthManager } from '../azureConfig/auth/AuthManager';
import ModernaReducer from './ModernaReducer';
import { LOAD_LOCATIONS } from './ModernaTypes';


const ModernaProvider = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  //const [pagination,setPagination]=useState([])
  //const [editingItem,setEditingItem]=useState(null)

  const initialState = useMemo(
    () => ({
      location:null
    }),
    []
  );
  const [state, dispatch] = useReducer(ModernaReducer, initialState)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleLocations = useCallback(async (locations) => {
    console.log("locations from context", locations)
    dispatch({ type: LOAD_LOCATIONS, payload: locations });
  }, [])
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
        console.log("user from azure", user);
        // user.mail=user.mail?user.mail:"soporte.clearmind@moderna.com.ec"
        if (user && user.mail) {
          user.mail = user.mail.toLowerCase();
          user.userPrincipalName = user.userPrincipalName.toLowerCase();
          console.log("user from azure", user);
          const successFunctionChecker = async (data) => {
            if (data.data.dataBaseResult <= 0) {
              Alert.alert(
                "Error",
                "El usuario no está autorizado para iniciar sesión"
              );
              AuthManager.signOutAsync();
              //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
              //dispatch({ type: LOAD_USER_AZURE, payload: null });
              handleLoading(false);
            } else {
              let deviceMacAdress = await DeviceInfo.getUniqueId();
              /*console.log(
                "usuario desde la base de azure ",
                data.data.dataBaseResult[0]
              );*/
              if (
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
                  handleLoading(false);
                };
                try {
                  if (
                    data.data.dataBaseResult[0].dispositivo_usuario == null ||
                    data.data.dataBaseResult[0].dispositivo_usuario.length <= 0
                  )
                 /* if (
                    data.data.dataBaseResult[0].dispositivo_usuario != undefined
                  ) */ {
                    /*let tempEnvironment = getEnvironmentUser(state.usersCanSelectEnvironment, data.data.dataBaseResult[0].correo, 3);
                    await postAzure(
                      tempEnvironment ? tempEnvironment.sellerFunction : state.environmentUser.sellerFunction,
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
                    );*/
                  } else {
                    Alert.alert(
                      "Error",
                      "Su cuenta está activa en otro dispositivo, cierre sesión en su otro dispositivo e intente nuevamente "
                    );
                    AuthManager.signOutAsync();
                    //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
                    //dispatch({ type: LOAD_USER_AZURE, payload: null });
                    handleLoading(false);
                  }
                } catch (e) {
                  Alert.alert("Error", "Error inseperado");
                  AuthManager.signOutAsync();
                  //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
                  //dispatch({ type: LOAD_USER_AZURE, payload: null });
                  handleLoading(false);
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
              //dispatch({ type: LOAD_IS_AUTENTICATED, payload: true });
              //dispatch({ type: LOAD_USER_AZURE, payload: user });
              handleLoading(false);
            } catch (e) {
              handleLoading(false);
              console.log("error ", e);
            }
          };
          const errorFunction = (data) => {
            handleLoading(false)
            showMessage({
              message: data.message || "Se ha producido un error inesperado",
              type: "danger",
              duration: 5000,
            });
            // thereIsUser=IsUser;
            console.log("error al realizar la consulta de vendedor", data);
          };
          const initCheckerUsaerAzuer = async (tempEmvironment) => {
            let tempEnvironment = getEnvironmentUser(state.usersCanSelectEnvironment, user.mail ? user.mail : user.userPrincipalName, 4);

            await postAzure(
              tempEnvironment ? tempEnvironment.sellerFunction : state.environmentUser.sellerFunction,
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


          verifyUsersEnvironment(user.mail, state.usersCanSelectEnvironment, handleLoadEnvironmentSelect, initCheckerUsaerAzuer)
          // initCheckerUsaerAzuer();


        } else {
          AuthManager.signOutAsync();
          //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
          //dispatch({ type: LOAD_USER_AZURE, payload: null });
          handleLoading(false);
          Alert.alert(
            "Error",
            "se ha producido un error inesperado, por favor intentelo en unos momentos"
          );
        }
      }
    } catch (e) {
      //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
      //dispatch({ type: LOAD_USER_AZURE, payload: null });
      //console.log("error al inciiar sesión", e);
      /*showMessage({
        message: e.message +"123" || "Se ha producido un error inesperado",
        type: "danger",
        duration: 5000,
      });*/
      handleLoading(false);
    }
  }

  const handleLoutAzure = async (userSql) => {
    try {

      //console.log("datos de userSql---------------", userSql);
      // return
      const succesClientFunc = async () => {
        handleLoading(false);
        await AuthManager.signOutAsync();
        //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
        //dispatch({ type: LOAD_USER_AZURE, payload: null });
        let wasInside = false;
        state.usersCanSelectEnvironment.forEach(element => {
          if (element == userSql.correo.toLowerCase()) {
            wasInside = true
            dropDataFromTableSeller(true);

          }
        })
        if (!wasInside) {
          dropDataFromTableSeller();
        }
        handleLoadEnvironmentSelect({
          sellerFunction: "https://primerpedidotat.azurewebsites.net/api/functionSeller?code=pj2IYkT7zXtn9fN9fho48Ti07wSzytzu5ZATfK9aMCKqAzFuTpNz5g==",
          clientFunction: "https://primerpedidotat.azurewebsites.net/api/clientFunction?code=2Q5jiM1amxqfJ5ORvq8jHTnnu4mlSDBZxDcVKAxSoNfcAzFuvrQEOA==",
          categoryFunction: "https://primerpedidotat.azurewebsites.net/api/functionCategory?code=FJ8m9lHL8MYqoBaFFwwd0xIWCipvIk99Xei54u5RF6ZiAzFuWa5A3g==",
          orderFunction: "https://primerpedidotat.azurewebsites.net/api/functionOrder?code=2Q3bAEg-gorMkIOHAVGSGUNkRkArYJHUDu51uZ10ZHE3AzFuI9rnbA==",
          orderDetailsFunction: "https://primerpedidotat.azurewebsites.net/api/functionOrderDetails?code=HFwoevtB7ZJxKlvZhGDqGHwKcTDdEwKwM9X0IfilxdQsAzFurF-V-w==",
          productsFunction: "https://primerpedidotat.azurewebsites.net/api/functionProducts?code=frraHRRVsGLFGyFKkCIY1JzY4Hnpjql0GJheOFMK6v1QAzFunsc8bA==",
          stockFunction: "https://primerpedidotat.azurewebsites.net/api/functionStock?code=a0VJzt-MlQuPN6kL4Pd8Do9_o3Q7LYhKzsKflvXyLQ0BAzFu-yTRTw==",//123

        })
        //console.log("cerrando sesión");
      };
      const errorClientFunc = () => {
        Alert.alert(
          "Error",
          "se ha producido un error inesperado, por favor intentelo en unos momentos"
        );

        handleLoading(false);
      };

      handleLoading(true);
      let tempEnvironment = getEnvironmentUser(state.usersCanSelectEnvironment, userSql.correo, 5);

      await postAzure(
        tempEnvironment ? tempEnvironment.sellerFunction : state.environmentUser.sellerFunction,
        {
          typeQuery: "U",
          data: {
            compare: ["id_vendedor", `'${userSql.id_vendedor}'`],
            fieldType: ["dispositivo_usuario"],
            fieldData: [null],
          },
        },
        succesClientFunc,
        errorClientFunc
      );

    } catch (e) {
      handleLoading(false)
      showMessage({
        message: e.message || "Se ha producido un error inesperado",
        type: "danger",
        duration: 5000,
      });
      console.log("datos al moemtno de cerrar la sesion", e)
      // dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
      // dispatch({ type: LOAD_USER_AZURE, payload: null });
    } finally {
    }
  }
  return (
    <ModernaContext.Provider value={{
      isLogging,
      isConnected,
      latitude,
      longitude,
      location: state.location,
      setIsLogging,
      setIsConnected,
      setLatitude,
      setLongitude,
      handleLocations,
      handleLoginAzure,
      //handleLogoutAzure,
      handleLoading,
    }}>
      {children}
    </ModernaContext.Provider>
  )
}

export default ModernaProvider

const styles = StyleSheet.create({})