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
import ModernaContext from "../context/ModernaContext";
import { useFonts } from "expo-font";
import WifiIndicator from "./WifiIndicator";

const ModernaHeaderM = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userInfo, handleLogoutAzure } = useContext(ModernaContext);
  const insets = useSafeAreaInsets();

  useEffect(() => {});
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  const subStringName = userInfo
    ? userInfo.displayName.split(" ")
    : "Datos Perdidos";
  if (!fontLoaded) return null;

  return (
    <View style={[styles.statusbar, { top: insets.top }]}>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onPress={handleLogoutAzure}
        warning={"¿Está seguro de querer cerrar sesión?"}
      />
      <View style={styles.userInfo}>
        <Icon name="user-tag" type="font-awesome-5" size={18} color={"white"} />
        <View style={{ paddingLeft: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontFamily: "Metropolis",
            }}
          >
            {userInfo
              ? subStringName[0] + " " + subStringName[2]
              : "Santiago Mosquera"}
          </Text>
          <Text
            style={{ color: "white", fontSize: 10, fontFamily: "Metropolis" }}
          >
            {userInfo.mail ? userInfo.mail : userInfo.userPrincipalName}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}></View>
      <TouchableOpacity style={styles.logOutButton} onPress={handleOpenModal}>
        <WifiIndicator />
        <Icon name="log-out-outline" type="ionicon" size={25} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default ModernaHeaderM;

const styles = StyleSheet.create({
  statusbar: {
    width: theme.dimensions.maxWidth,
    height: 55,
    flexDirection: "row",
    //paddingHorizontal:10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.colors.modernaRed,
    position: "absolute",
    //top: Constants.statusBarHeight,
  },
  modernaLogo: {
    width: 125,
    resizeMode: "center",
    height: 40,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "blue",
  },
  imageContainer: {
    //backgroundColor:'green',
    justifyContent: "center",
    flex: 0.5,
  },
  logOutButton: {
    //backgroundColor: "brown",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 0.5,
  },
});
