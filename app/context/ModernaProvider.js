import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useReducer } from 'react'
import ModernaContext from './ModernaContext'
import NetInfo from '@react-native-community/netinfo';
import { AuthManager } from '../azureConfig/auth/AuthManager';
import ModernaReducer from './ModernaReducer';
import { LOAD_LOCATIONS } from './ModernaTypes';
import { GraphManager } from '../azureConfig/graph/GraphManager';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ModernaProvider = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  //const [pagination,setPagination]=useState([])
  //const [editingItem,setEditingItem]=useState(null)

  const isLoggedIn = async() => {
    console.log("CARGANDO LOS DATOS DE INCIO",)
    try{
        //setLogged(true)
        //setIsLoading(true)
        let userInfo = await AsyncStorage.getItem('user')
        //let avatarData = await AsyncStorage.getItem('avatar')
        //let notify = await AsyncStorage.getItem('notifications')
        //console.log("ESTO LLEGA DE NOTIFICACIONES: ",notify )
        //setNotifications(parseInt(notify))
        userInfo = JSON.parse(userInfo)
        if( userInfo ){
            /*setTimeout(() => setIsLogged(false)
            ,2300)*/
            setUserInfo(userInfo)
            console.log("DATO CONSEGUIDO DE ASYNC ---------------")
            console.log("\nDATOS DE USUARIO:\n")
            console.log(userInfo)
        }else{
            //setTimeout(() => setIsLogged(false),2300)
            console.log("NO SE HAN ENCONTRADO LOS DATOS DE USUARIO")
            
        }
      
    
    }catch(e){
        console.log(`IS LOGGED ERROR ${e}`)
    }
}

useEffect(()=> {
    //fetchUser()
    isLoggedIn()
},[])



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
        setIsAuthenticated(true);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log("user from azure 1: ",JSON.stringify(user));
        console.log("MAIL DEL USUARIO: ",user.mail)
        setUserInfo(user)
        // user.mail=user.mail?user.mail:"soporte.clearmind@moderna.com.ec"
        if (user && user.mail) {
          user.mail = user.mail.toLowerCase();
          user.userPrincipalName = user.userPrincipalName.toLowerCase();
          console.log("user from azure 2:", user);
        }}
        // Si la autenticación es exitosa
      }catch(e){
        console.log(e)
      }
  }

  const handleLogoutAzure = async () => {
    try {

      //console.log("datos de userSql---------------", userSql);
      // return
        //handleLoading(false);
        console.log("CERRANDO SESION---------------",)
        await AuthManager.signOutAsync();
        //dispatch({ type: LOAD_IS_AUTENTICATED, payload: false });
        //dispatch({ type: LOAD_USER_AZURE, payload: null });
        setIsAuthenticated(false);
    } catch (e) {
      //handleLoading(false)
      showMessage({
        message: e.message || "Se ha producido un error inesperado",
        type: "danger",
        duration: 5000,
      });
      console.log("datos al moemtno de cerrar la sesion", e)
    } 
  }
  return (
    <ModernaContext.Provider value={{
      isLogging,
      isConnected,
      latitude,
      longitude,
      isAuthenticated:isAuthenticated,
      setIsAuthenticated,
      userInfo,
      location: state.location,
      setIsLogging,
      setIsConnected,
      setLatitude,
      setLongitude,
      handleLocations,
      handleLoginAzure,
      handleLogoutAzure,
      //handleLogoutAzure,
      handleLoading,
    }}>
      {children}
    </ModernaContext.Provider>
  )
}

export default ModernaProvider

const styles = StyleSheet.create({})