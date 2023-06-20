import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import theme from "../theme/theme";
import { Icon } from "@rneui/base";
import Logotipo from "../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import ConfirmationModal from "./ConfirmationModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import WifiIndicator from "./WifiIndicator";
import { ModernaContext } from "../context/ModernaProvider";

const ModernaHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userInfo, handleLogoutAzure, displayName } =
    useContext(ModernaContext);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log("DATOS DEL USUARIO EN EL HEADER: - -- - - - ", userInfo);
    console.log(
      "NOMBRE DEL USUARIO ACTUAL EN EL HEADER: - -- - - - ",
      displayName
    );
  });
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  /*const subStringName = userInfo
    ? userInfo.displayName.split(" ")
    : "Datos Perdidos";*/
  const subStringName = displayName.split(" ");

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={[styles.statusbar, { top: insets.top }]}>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPress={handleLogoutAzure}
        warning={"¿Está seguro de cerrar sesión?"}
      />
      <View style={styles.userInfo}>
        <Icon name="user-tag" type="font-awesome-5" size={18} color={"white"} />
        <View style={{ paddingLeft: 10 }}>
          <Text
            style={{ color: "white", fontSize: 12, fontFamily: "Metropolis" }}
          >
            {userInfo
              ? subStringName[0] + " " + subStringName[2]
              : "Santiago Mosquera"}
          </Text>
          <Text
            style={{ color: "white", fontSize: 9, fontFamily: "Metropolis" }}
          >
            {userInfo.mail ? userInfo.mail : userInfo.userPrincipalName}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.modernaLogo} />
      </View>
      <TouchableOpacity style={styles.logOutButton} onPress={handleOpenModal}>
        <WifiIndicator />
        <Icon name="log-out-outline" type="ionicon" size={28} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default ModernaHeader;

const styles = StyleSheet.create({
  statusbar: {
    width: theme.dimensions.maxWidth,
    //height: 55,
    flexDirection: "row",
    flex: 1,
    //paddingHorizontal:10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.modernaRed,
    position: "absolute",
    paddingHorizontal: 10,
    //top: Constants.statusBarHeight,
  },
  modernaLogo: {
    width: 125,
    resizeMode: "center",
    height: 40,
  },
  userInfo: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "green",
  },
  imageContainer: {
    //backgroundColor: "blue",
    //justifyContent: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  logOutButton: {
    //backgroundColor: "brown",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 0.5,
  },
});
