import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import DoubleStyledButton from "./DoubleStyledButton";
import LOGOTIPO from "../../assets/moderna/Logotipo-original.png";
import X from "../../assets/resources/x.png";
import theme from "../theme/theme";
import StyledButton from "./StyledButton";
import { useFonts } from "expo-font";

export const ModernaModal = ({
  visible,
  onClose,
  title,
  //nPress,
  //children,
  text,
}) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });
  if (!fontLoaded) return null;
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      style={{ flex: 1 }}
    >
      <StatusBar
        backgroundColor={theme.colors.modernaRed}
        barStyle={"dark-content"}
      />
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              //backgroundColor: "red",
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            <Image source={X} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={LOGOTIPO} style={styles.logo} />
          </View>
          <View style={styles.warningContainer}>
            <Text style={styles.warningTitle}>{title}</Text>
            <View style={{ width: "100%" }}>
              <Text style={styles.warningText}>{text}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}></View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    //backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "center",
    flex: 0.7,
    width: "100%",
  },
  logo: {
    resizeMode: "contain",
    width: 200,
    height: 150,
    //flex: 1,
  },
  warningContainer: {
    //backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
    top: 5,
    width: "95%",
    //height: 100,
    // marginBottom: 5,
  },
  warningTitle: {
    //marginTop: 0,
    //marginVertical: 20,
    //backgroundColor: "red",
    width: "100%",
    textAlign: "justify",
    fontSize: 18,
    fontFamily: "Metropolis",
  },
  warningText: {
    //marginTop: 0,
    //marginHorizontal: 20,
    //width: "80%",
    //left: 0,
    textAlign: "justify",
    fontSize: 15,
    fontFamily: "Metropolis",
  },
  buttonContainer: {
    marginTop: -1,
    //backgroundColor: 'orange',
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
    width: "100%",
  },
});
