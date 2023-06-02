import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformationReview from "../../components/ScreenInformationReview";
import { ProductsPrices_Review } from "../../components/ProductsPrices_Review";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";
import { realizarConsulta } from "../../common/sqlite_config";

const Prices_Review = () => {
  const { datosCompartidos } = useContext(DataContext);
  const consultarYCopiarContenido = async () => {
    //console.log("DATOS COMPARTIDOS: ")
    try {
      const arrayIdsPortafolio = [];

      const consultaPortafolioAudit = await realizarConsulta(
        `SELECT  * FROM portafolio_auditoria where id_portafolio_auditoria='${datosCompartidos.id_portafolio_auditoria}';`
      );

      console.log(
        "PORTAFOLIOS DE la sucursal ACTUAL: ",
        consultaPortafolioAudit
      );

      consultaPortafolioAudit.forEach((item) => {
        const idPortafolio = item.id_portafolio;
        if (!arrayIdsPortafolio.includes(idPortafolio)) {
          arrayIdsPortafolio.push(idPortafolio);
        }
      });

      console.log("IDS DE PORTAFOLIOS: - - - - - - - - -", arrayIdsPortafolio);

      let consultaPortafolio = [];
      if (arrayIdsPortafolio.length > 1) {
        consultaPortafolio = await realizarConsulta(
          `SELECT p.nombre_producto, pf.tipo,c.nombre_categoria,pf.id_portafolio,p.id_producto from portafolio as pf inner join producto as p on p.id_producto=pf.id_producto inner join categoria as c on c.id_categoria=p.id_categoria WHERE pf.id_portafolio='${arrayIdsPortafolio[0]}' OR pf.id_portafolio='${arrayIdsPortafolio[1]}';`
        );
      } else if (arrayIdsPortafolio.length == 1) {
        consultaPortafolio = await realizarConsulta(
          `SELECT p.nombre_producto, pf.tipo,c.nombre_categoria,pf.id_portafolio,p.id_producto from portafolio as pf inner join producto as p on p.id_producto=pf.id_producto inner join categoria as c on c.id_categoria=p.id_categoria WHERE pf.id_portafolio='${arrayIdsPortafolio[0]}';`
        );
      } else {
        console.log(
          "NO SE HA ENCONTRADO IDS DE PORTAFOLIO ASOCIADOS A ESTA AUDITORIA - - - - - - -  -"
        );
      }
      console.log(" PRODUCTOS COMPATIBLES CON LOS IDS: ", consultaPortafolio);
    } catch (e) {
      console.log("Error al ejecutar la funcion de consulta: ", e);
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
        <ScreenInformationReview
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
      <ProductsPrices_Review text={"Portafolio Complementario"} />
      <View style={{ flex: 0.3, backgroundColor: "red" }}></View>
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
