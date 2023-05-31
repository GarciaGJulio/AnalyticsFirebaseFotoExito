import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/base";
import theme from "../theme/theme";
import WifiIndicator from "./WifiIndicator";
import { FAB } from "@rneui/themed";
import { useFonts } from "expo-font";

const ScreenInformation = ({ title, text }) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View
      style={{
        width: theme.dimensions.maxWidth,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: theme.dimensions.maxWidth,
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "600", fontFamily: "Metropolis" }}
        >
          {title}
        </Text>
        <View
          style={{ position: "absolute", left: theme.dimensions.maxWidth - 35 }}
        ></View>
      </View>
      <View
        style={{ width: theme.dimensions.maxWidth / 1.1, marginVertical: 15 }}
      >
        <Divider
          width={2}
          color={"#D9D9D9"}
          style={{ backgroundColor: "blue" }}
        />
      </View>
      {text ? (
        <Text style={{ fontSize: 13, width: "91%", fontFamily: "Metropolis" }}>
          {text.toString()}
        </Text>
      ) : null}
      <View style={{ alignSelf: "flex-start", marginLeft: 23, marginTop: 5, marginBottom: 13 }}>
        <View style={{flexDirection:"row"}}>
          <View>

            <Text style={{ color:"red",textAlign: "left" }}>
              * 
            </Text>

          </View>



          <View><Text style={{ textAlign: "left" }}>
            Campos  obligatorios
          </Text></View>
        </View>


      </View>
    </View>
  );
};

export default ScreenInformation;

const styles = StyleSheet.create({});
