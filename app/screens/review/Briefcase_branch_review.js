import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformation from "../../components/ScreenInformation";
import ItemsList from "../../components/ItemsList";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";
import { realizarConsulta } from "../../common/sqlite_config";
import FlashListPortfolio from "../../components/FlashListPortfolio";

const Briefcase_branch_review = ({ route }) => {
  const { datosCompartidos } = useContext(DataContext);
  // const { branch } = route.params;
  // console.log(branch, "Briefcase");

  const DATA = [
    {
      id: 1,
      name: "Categoría 1",
      productos: [
        { id: 1, nombre: "Harina" },
        { id: 2, nombre: "Harina Ya" },
        { id: 3, nombre: "Harina Ya sin polvo" },
      ],
    },
    {
      id: 2,
      title: "Categoría 2",
      productos: [
        { id: 4, nombre: "Fideos Don Bitorio" },
        { id: 5, nombre: "Fideos Horiental" },
        { id: 6, nombre: "Fideos Otra marca" },
      ],
    },
    {
      id: 3,
      title: "Categoría 2",
      productos: [
        { id: 7, nombre: "Pan Moderna" },
        { id: 8, nombre: "Pan Supan" },
        { id: 9, nombre: "Pan Otro" },
      ],
    },
  ];

  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos
      /*const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM preciador_portafolio_complementario LEFT JOIN preciador ON preciador_portafolio_complementario.id_preciador_portafolio_complementario = preciador.id_preciador;"
      );*/

      const resultadoConsulta = await realizarConsulta(
        "SELECT * FROM preciador_portafolio_complementario LEFT JOIN preciador ON preciador_portafolio_complementario.id_preciador_portafolio_complementario = preciador.id_preciador"
      );

      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta);
      //setAudit(resultadoConsulta);
      //setFilteredData(resultadoConsulta);
      console.log(
        "Copia de contenido completada con éxito: ",
        resultadoConsulta
      );
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, []);

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
            datosCompartidos.nombre_cliente +
            "-" +
            datosCompartidos.nombre_sucursal
          }
          text={"A continuación se muestran los productos registrados"}
        />
        <BackPage_Review />
      </View>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <FlashListPortfolio
          //idealPortfolioProducts={idealPortfolioProducts}
          //setIdealPortfolioProducts={setIdealPortfolioProducts}
          idealProducts={DATA}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <FlashListPortfolio
          //idealPortfolioProducts={idealPortfolioProducts}
          //setIdealPortfolioProducts={setIdealPortfolioProducts}
          idealProducts={DATA}
        />
      </SafeAreaView>
      <View style={{ flex: 0.2, backgroundColor: "red" }}></View>
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
