import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import NetInfo from "@react-native-community/netinfo";
import theme from "../theme/theme";
import { Icon } from "@rneui/base";
import ModernaContext from "../context/ModernaContext";
import { realizarConsulta } from "../common/sqlite_config";
import { subidaBaseRemoteTodaAuditoria } from "../services/SubidaBaseRemota";

const WifiIndicator = () => {
  //const {isConnected} = useContext(ModernaContext)

  const [isConnected, setIsConnected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        const auditoriasSinSincronizar = await realizarConsulta(
          "SELECT * FROM auditoria where sincronizada = 0"
        );
        console.log("AUDITORIAS SIN SINCORNIZAR: ", auditoriasSinSincronizar);
        if (auditoriasSinSincronizar.length === 0) {
          console.log(
            "NADA QUE SINCRONIZAR POR EL MOMENTO- - - - - - - - - - "
          );
        } else if (auditoriasSinSincronizar.length > 0) {
          setIsModalVisible(!isModalVisible);
          //setModalMessage("Sincronizando datos, por favor espere...");
          console.log(
            "----------------ENTRANDO A SINCRONIZAR DATOS DE AUTIROIAS AUTOMATICAMENTE--------------------: ",
            auditoriasSinSincronizar.length
          );
          /*setTimeout(() => {
            setAnimation(SUCCESS_ANIMATION);
            if (isConnected) {
              setTimeout(() => {
                setIsModalVisible(false);
              }, 2000);
            } else {
              setAnimation(FAILED_ANIMATION);
              setTimeout(() => {
                setIsModalVisible(false);
              }, 4000);
            }
          }, 5000);*/
          auditoriasSinSincronizar.forEach(async (auditoria) => {
            console.log("ID DE AUDITORIA A SINCRONIZARSE: ", auditoria);
            try {
              await subidaBaseRemoteTodaAuditoria(
                auditoria.id_auditoria,
                setIsModalVisible,
                setValidate,
                validate
                //setIsModalVisible,
                //isModalVisible
              );
            } catch (e) {
              console.log("ERROR: ", e);
              setIsModalVisible(false);
              Alert.alert(
                "Desconexión repentina",
                "La sincronización automática está deshabilitada hasta que vuelva a tener una conexión estable"
              );
            }
          });
          //setIsModalVisible(false);
        } else {
          Alert.alert(
            "No se ha detectado conexión a internet",
            "Necesitas conectarte a internet para sincronizar las auditorias"
          );
        }
      }
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
  },
});
