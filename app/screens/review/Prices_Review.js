import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformation from "../../components/ScreenInformation";
import { ProductsPrices_Review } from "../../components/ProductsPrices_Review";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";

const Prices_Review = () => {
  const { datosCompartidos } = useContext(DataContext);
  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View
        style={{
          width: theme.dimensions.maxWidth,
          marginTop: theme.dimensions.maxHeight / 10,
        }}
      >
        <ScreenInformation
          title={
            datosCompartidos.id_cliente +
            "-" +
            datosCompartidos.nombre_cliente +
            "-" +
            datosCompartidos.nombre_sucursal
          }
          text={
            "A continuación se muestran los preciadores de los productos registrados"
          }
        />
        <BackPage_Review />
      </View>
      <ProductsPrices_Review text={"Portafolio Ideal"} />
    </View>
  );
};

export default Prices_Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
  },
});
