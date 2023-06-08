import { ScrollView, StyleSheet, View, SafeAreaView, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformationReview from "../../components/ScreenInformationReview";
import ItemsList from "../../components/ItemsList";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";
import { realizarConsulta } from "../../common/sqlite_config";
import { FlashListPortfolio } from "../../components/FlashListPortfolio";
import { FlashListPortfolioReview } from "../../components/FlashListPortfolioReview";

const Briefcase_branch_review = ({ route }) => {
  const { datosCompartidos } = useContext(DataContext);
  const [idealPortafolio, setIdealPortafolio] = useState([]);
  const [complementaryPortafolio, setComplementaryPortafolio] = useState([]);
  // const { branch } = route.params;
  // console.log(branch, "Briefcase");

  const consultarYCopiarContenido = async () => {
    try {
      /*const consultaPortafolioAuditoria = await realizarConsulta(
        "SELECT c.nombre_categoria, p.nombre_producto, pf.tipo FROM portafolio_auditoria AS pa INNER JOIN portafolio AS pf ON pa.id_portafolio = pf.id_portafolio inner join producto as p on p.id_producto=pf.id_producto inner join categoria as c on c.id_categoria=p.id_categoria  WHERE pa.id_portafolio_auditoria = 'f6bc685e-b406-42ba-b1ce-842b6fbeabc6';"
      );*/

      /*const consultaPortafolioAuditoria = await realizarConsulta(
        "SELECT  c.nombre_categoria, p.nombre_producto,p.id_producto, pf.tipo FROM portafolio_auditoria AS pa INNER JOIN portafolio AS pf ON pa.id_portafolio = pf.id_portafolio inner join producto as p on p.id_producto=pf.id_producto inner join categoria as c on c.id_categoria=p.id_categoria  WHERE pa.id_portafolio = 'f6bc685e-b406-42ba-b1ce-842b6fbeabc6';"
      );*/

      /*const consultaPortafolioAuditoria = await realizarConsulta(
        "SELECT * from portafolio_auditoria;"
      );*/

      const consultaPortafolioAudit = await realizarConsulta(
        `SELECT  * FROM portafolio_auditoria where id_portafolio_auditoria='${datosCompartidos.id_portafolio_auditoria}'; AND a.id_auditoria='${datosCompartidos.id_auditoria}''`
      );

      const arrayIdsPortafolio = [];

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
          `SELECT DISTINCT p.nombre_producto, pf.tipo, c.nombre_categoria, pf.id_portafolio, p.id_producto
          FROM portafolio AS pf
          INNER JOIN producto AS p ON p.id_producto = pf.id_producto
          INNER JOIN categoria AS c ON c.id_categoria = p.id_categoria
          INNER JOIN portafolio_auditoria AS pa ON pa.id_portafolio = pf.id_portafolio
          INNER JOIN auditoria AS a ON pa.id_portafolio_auditoria = a.id_portafolio_auditoria
          WHERE pf.id_portafolio = '${arrayIdsPortafolio[0]}' OR pf.id_portafolio = '${arrayIdsPortafolio[1]}'
          AND pf.id_producto = pa.id_producto;`
        );
      } else if (arrayIdsPortafolio.length == 1) {
        consultaPortafolio = await realizarConsulta(
          `SELECT DISTINCT p.nombre_producto, pf.tipo,c.nombre_categoria,pf.id_portafolio,p.id_producto from portafolio as pf inner join producto as p on p.id_producto=pf.id_producto inner join categoria as c on c.id_categoria=p.id_categoria inner join portafolio_auditoria as pa on pa.id_portafolio = pf.id_portafolio WHERE pf.id_portafolio='${arrayIdsPortafolio[0]}';`
        );
      } else {
        console.log(
          "NO SE HA ENCONTRADO IDS DE PORTAFOLIO ASOCIADOS A ESTA AUDITORIA - - - - - - -  -"
        );
      }

      const idsPortafolioAuditoria = await realizarConsulta(
        `SELECT DISTINCT  p.id_portafolio, p.tipo FROM portafolio p INNER JOIN portafolio_auditoria pa ON p.id_portafolio = pa.id_portafolio WHERE pa.id_portafolio = '${datosCompartidos.id_portafolio_auditoria}'`
      );

      const arrayTipoC = [];
      const arrayTipoI = [];

      consultaPortafolio.forEach((objeto) => {
        const {
          tipo,
          nombre_categoria,
          nombre_producto,
          id_producto,
          ...resto
        } = objeto;
        const producto = { nombre_producto, id_producto, ...resto };

        if (tipo === "C") {
          const categoriaExistente = arrayTipoC.find(
            (item) => item.nombre_categoria === nombre_categoria
          );

          if (categoriaExistente) {
            categoriaExistente.productos.push(producto);
          } else {
            arrayTipoC.push({
              nombre_categoria,
              tipo,
              productos: [producto],
            });
          }
        } else if (tipo === "I") {
          const categoriaExistente = arrayTipoI.find(
            (item) => item.nombre_categoria === nombre_categoria
          );

          if (categoriaExistente) {
            categoriaExistente.productos.push(producto);
          } else {
            arrayTipoI.push({
              nombre_categoria,
              tipo,
              productos: [producto],
            });
          }
        }
      });

      console.log("Array - - - - - - - - - Tipo C:", arrayTipoC);
      setComplementaryPortafolio(arrayTipoC);
      console.log("Array  * * * * * * * *  Tipo I:", arrayTipoI);

      setIdealPortafolio(arrayTipoI);
      console.log(
        "IDS DE CONSULTA DE PORTAFOLIO INNER JOIN- - -/ / / / /  - : ",
        idsPortafolioAuditoria
      );
      console.log(
        "DATOS ALMACENADOS DE PORTAFOLIO AUDITORIA: ",
        consultaPortafolioAudit
      );
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
    console.log(
      "ID DE PORTAFOLIO AUDITORIA: ",
      datosCompartidos.id_portafolio_auditoria
    );
  }, []);

  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View
        style={{
          width: theme.dimensions.maxWidth,
          marginTop: theme.dimensions.maxHeight / 12,
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
          text={"A continuación se muestran los productos registrados"}
        />
      </View>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            flex: 0.1,
            width: "90%",
            justifyContent: "center",
            alignItems: "flex-start",
            //backgroundColor: "red",
          }}
        >
          <Text style={styles.text}>Portafolio Ideal</Text>
        </View>
        <FlashListPortfolioReview
          //idealPortfolioProducts={idealPortfolioProducts}
          //setIdealPortfolioProducts={setIdealPortfolioProducts}
          products={idealPortafolio}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            flex: 0.1,
            width: "90%",
            justifyContent: "center",
            alignItems: "flex-start",
            //backgroundColor: "red",
          }}
        >
          <Text style={styles.text}>Portafolio Complementario</Text>
        </View>
        <FlashListPortfolioReview
          //idealPortfolioProducts={idealPortfolioProducts}
          //setIdealPortfolioProducts={setIdealPortfolioProducts}
          products={complementaryPortafolio}
        />
      </SafeAreaView>
      <View style={{ flex: 0.2 }}></View>
    </View>
  );
};

export default Briefcase_branch_review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  text: {
    fontWeight: theme.fontWeight.softbold,
    //right: 130,
    textAlign: "center",
    flex: 1,
    fontSize: 14,
    fontFamily: "Metropolis",
  },
});
