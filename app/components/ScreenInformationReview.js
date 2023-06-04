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
          //backgroundColor: "purple",
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: theme.dimensions.maxWidth / 1.1,
        }}
      >
        <FAB
          title=""
          placement="left"
          onPress={() => navigation.goBack()}
          icon={{
            name: "arrow-left-top",
            color: "white",
            type: "material-community",
          }}
          style={{ left: -10, top: 1 }}
          color={theme.colors.modernaYellow}
          size="small"
        />
        <Text
          style={{
            fontSize: theme.fontSize.title,
            fontWeight: "600",
            fontFamily: "Metropolis",
            left: 50,
          }}
        >
          {title}
        </Text>
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
      {text ? (
        <Text
          style={{
            fontSize: theme.fontSize.body,
            width: "91%",
            fontFamily: "Metropolis",
            alignSelf: "flex-start",
            marginLeft: 23,
            marginTop: 5,
            marginBottom: 13,
          }}
        >
          {text.toString()}
        </Text>
      ) : null}
    </View>
  );
};

export default ScreenInformationReview;

const styles = StyleSheet.create({
  // No se necesita el estilo "fab" adicional en este caso
});
