import { View, Text, StyleSheet } from "react-native";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformationReview from "../../components/ScreenInformationReview";
import { FAB } from "@rneui/base";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

export const WithOutData = ({ navigation }) => {
  const { datosCompartidos } = useContext(DataContext);
  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View
        style={{
          width: theme.dimensions.maxWidth,
          marginTop: theme.dimensions.maxHeight / 8,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "blue",
            height: "10%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
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
            color={theme.colors.modernaYellow}
            size="small"
            style={{ width: 40, height: 25, backgroundColor: "blue" }}
          />
        </View>
        <ScreenInformationReview
          title={
            datosCompartidos.id_cliente +
            "-" +
            datosCompartidos.nombre_cliente +
            "-" +
            datosCompartidos.nombre_sucursal
          }
          text={"A continuación se muestran los productos registrados"}
        />
      </View>
      <View
        style={{
          //backgroundColor: "red",
          //width: "90%",
          flex: 1,
          bottom: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>
          No se ingresaron registros para esta auditoría.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    //justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: theme.fontWeight.softbold,
    //right: 130,
    textAlign: "justify",
    //flex: 1,
    fontSize: 16,
    fontFamily: "Metropolis",
  },
});
