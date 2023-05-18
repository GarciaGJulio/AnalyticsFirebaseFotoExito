import { StyleSheet, Text, View } from 'react-native'
import React,{ useContext,useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Menu from '../screens/auth/Menu';
import TabsNavigation from './TabsNavigation.js';
import AuditNavigation from './AuditNavigation';
import ListBranch from '../screens/review/ListBranch';
import ModernaContext from '../context/ModernaContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const Navigation = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(ModernaContext);

  useEffect(() => {
    console.log("VARIABLE DE VERIFICACION DE LOGIN: ", isAuthenticated);
  }, [isAuthenticated]);

  const recoverValue = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log("TOKEN DE USUARIO", userToken);
    if (userToken && !isAuthenticated) { // Verifica si el usuario no está autenticado antes de establecerlo
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    recoverValue();
  }, []); // Ejecuta la función solo una vez al montar el componente


  const LoginStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='audit' component={AuditNavigation} />
        <Stack.Screen name='menu' component={Menu} />
        <Stack.Screen name='listBranch' component={ListBranch} />
        <Stack.Screen name='review' component={TabsNavigation} />
      </Stack.Navigator>
    )
  }

  return (
    <>
    {
      isAuthenticated ? <LoginStack/> : <Login/>
    }
    </>
  )
}

export default Navigation

const styles = StyleSheet.create({})