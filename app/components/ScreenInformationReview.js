import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/base";
import theme from "../theme/theme";
import WifiIndicator from "./WifiIndicator";
import { FAB } from "@rneui/themed";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const ScreenInformationReview = ({ title, text }) => {
  const navigation = useNavigation();
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
        //backgroundColor: "red",
      }}
    >
      <View
        style={{
          paddingHorizontal: 14,
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: theme.fontSize.subtitle,
              fontWeight: "600",
              fontFamily: "Metropolis",
              textAlign: "justify",
            }}
          >
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: theme.dimensions.maxWidth / 1.1,
          marginVertical: 15,
          alignSelf: "center",
        }}
      >
        <Divider
          width={2}
          color={"#D9D9D9"}
          style={{ backgroundColor: "blue" }}
        />
      </View>
    </View>
  );
};

export default ScreenInformationReview;

const styles = StyleSheet.create({
  // No se necesita el estilo "fab" adicional en este caso
});
