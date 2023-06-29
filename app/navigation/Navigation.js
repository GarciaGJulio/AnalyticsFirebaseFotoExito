import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import Login from '../screens/auth/Login';
// import Menu from '../screens/auth/Menu';
// import TabsNavigation from './TabsNavigation.js';
// import AuditNavigation from './AuditNavigation';
// import ListBranch from '../screens/review/ListBranch';
// import ModernaContext from '../context/ModernaContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu } from "../screens/auth/Menu";
// import AuditNavigation from './AuditNavigation';
import { ListBranch } from "../screens/review/ListBranch";
import { TabsNavigation } from "./TabsNavigation";
import { Login } from "../screens/auth/Login";
import { getCurrentScreenInformation } from "../utils/Utils";
import { Client_Information } from "../screens/audit/Client_Information";
import { Briefcase } from "../screens/audit/Briefcase";
import { Prices } from "../screens/audit/Prices";
import { Racks } from "../screens/audit/Rack";
import { Promos } from "../screens/audit/Promos";
import { ModernaContext } from "../context/ModernaProvider";
import { Logs } from "expo";
import { DebugScreen } from "../common/LogScreen";
import { Loader } from "../common/Loader";

const Stack = createStackNavigator();

export const Navigation = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(ModernaContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recoverValue();
  }, []); // Ejecuta la función solo una vez al montar el componente
  useEffect(() => {
    //console.log("VARIABLE DE VERIFICACION DE LOGIN: ", isAuthenticated);
  }, []);

  const recoverValue = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    // //console.log("TOKEN DE USUARIO", userToken);
    if (userToken && !isAuthenticated) {
      // Verifica si el usuario no está autenticado antes de establecerlo
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const LoginStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="logs" component={DebugScreen} />
        <Stack.Screen name="audit" component={Client_Information} />
        <Stack.Screen name="listBranch" component={ListBranch} />
        <Stack.Screen name="review" component={TabsNavigation} />
        <Stack.Screen name="briefcase" component={Briefcase} />
        <Stack.Screen name="prices" component={Prices} />
        <Stack.Screen name="rack" component={Racks} />
        <Stack.Screen name="promos" component={Promos} />
        <Stack.Screen name="begin" component={LoginStack} />
      </Stack.Navigator>
    );
  };
  // getCurrentScreenInformation
  return (
    <>{loading ? <Loader /> : isAuthenticated ? <LoginStack /> : <Login />}</>
  );
};

//export default Navigation

const styles = StyleSheet.create({});
