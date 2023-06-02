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
        `SELECT  * FROM portafolio_auditoria where id_portafolio_auditoria='${datosCompartidos.id_portafolio_auditoria}';`
      );

      const consultaPortafolio2 = await realizarConsulta(
        `SELECT  * FROM portafolio;`
      );

      console.log(
        "consulta de la tabla portafolios /////////------------------: ",
        consultaPortafolio2
      );
      console.log(
        "PORTAFOLIOS DE la sucursal ACTUAL: ",
        consultaPortafolioAudit
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

      /*console.log(
        "ESTA ES LA TABLA PORTAFOLIO:/ ",
        //consultaPortafolio
      )*/

      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta);
      //setAudit(resultadoConsulta);
      //setFilteredData(resultadoConsulta);
      /*console.log(
        "CONSULTA GENERADA DE ID PORTAFOLIO AUDITORIA - / / / / / - - : ",
        consultaPortafolioAuditoria
      );*/
      console.log(
        "CONSULTA GENERADA DE ID PORTAFOLIO- - -/ / / / /  - : ",
        consultaPortafolio
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
      //const nuevoArray = [];

      /*consultaPortafolio.forEach((objeto) => {
        const { nombre_categoria, tipo, ...resto } = objeto;
        const index = nuevoArray.findIndex(
          (elemento) => elemento.nombre_categoria === nombre_categoria
        );

        if (index === -1) {
          nuevoArray.push({
            nombre_categoria,
            tipo,
            productos: [{ ...resto }],
          });
        } else {
          nuevoArray[index].productos.push({ ...resto });
        }
      });*/

      /*console.log(
        "ARRAY FORMATEADO DE PRODUCTOS DE PORTAFOLIO: - - - - - - - ",
        nuevoArray
      );*/
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
        <BackPage_Review />
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
