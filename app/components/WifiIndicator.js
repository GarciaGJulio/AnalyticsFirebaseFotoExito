import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import NetInfo from "@react-native-community/netinfo";
import theme from "../theme/theme";
import { Icon } from "@rneui/base";
import ModernaContext from "../context/ModernaContext";
import { realizarConsulta } from "../common/sqlite_config";
import { subidaBaseRemoteTodaAuditoria } from "../services/SubidaBaseRemota";
import { GlobalContext } from "../context/GlobalContext";

const WifiIndicator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validate, setValidate] = useState(false);

  const {
    globalVariable,
    setGlobalVariable,
    isConnectionActivate,
    setIsConnectionActivate,
  } = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        console.log("CAMBIANDO A ESTADO A TRUE PRIMERA VEZ :");
        setIsConnectionActivate(true);
      } else {
        console.log("APAGANDO CONEXION :");
        setIsConnectionActivate(false);
      }
      /*if (state.isConnected) {
      }*/
      console.log("VERIFICANDO CONEXIÓN: ", state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isConnected
            ? theme.colors.modernaGreen
            : theme.colors.modernaRed,
        },
      ]}
    >
      <Icon
        name={isConnected ? "wifi" : "wifi-off"}
        type="material-icon"
        size={15}
        color={theme.colors.white}
      />
    </View>
  );
};

export default WifiIndicator;

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: theme.colors.modernaGreen,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:5
  },
});
