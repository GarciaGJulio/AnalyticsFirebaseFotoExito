import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformation from "../../components/ScreenInformation";
import ItemsList from "../../components/ItemsList";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";

const Briefcase_branch_review = ({ route }) => {
  const { datosCompartidos } = useContext(DataContext);
  // const { branch } = route.params;
  // console.log(branch, "Briefcase");

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
          title={datosCompartidos.cliente + "-" + datosCompartidos.tipo_cliente}
          text={"A continuación se enlistan los datos registrados"}
        />
        <BackPage_Review />
      </View>
      <ItemsList text={"Portafolio Ideal"} />
    </View>
  );
};

export default Briefcase_branch_review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
