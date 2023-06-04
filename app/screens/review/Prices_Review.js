import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformationReview from "../../components/ScreenInformationReview";
import { ProductsPrices_Review } from "../../components/ProductsPrices_Review";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";
import { realizarConsulta } from "../../common/sqlite_config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Prices_Review = () => {
  const { datosCompartidos } = useContext(DataContext);
  const [productosIdeal, setproductsIdeal] = useState([]);
  const [productosComplementario, setproductosComplementario] = useState([]);
  const consultarYCopiarContenido = async () => {
    //console.log("DATOS COMPARTIDOS: ")
    const idGroupClient = await AsyncStorage.getItem("idGroupClient");
    try {
      const idsPortafolioAuditoria = await realizarConsulta(
        `SELECT DISTINCT p.id_portafolio, p.id_producto, p.tipo
        FROM portafolio p
        INNER JOIN portafolio_auditoria pa ON p.id_portafolio = pa.id_portafolio
        WHERE pa.id_portafolio_auditoria = '${datosCompartidos.id_portafolio_auditoria}'
        `
      );

      const datosPreciador = await realizarConsulta(
        `SELECT DISTINCT p.nombre_producto,p.url_imagen_producto,pr.* from auditoria as a inner join preciador as pr on pr.id_preciador=a.id_preciador inner join portafolio as pf on pr.id_portafolio=pf.id_portafolio and pr.id_producto= pf.id_producto inner join producto as p on p.id_producto=pf.id_producto where a.id_auditoria='${datosCompartidos.id_auditoria}'`
      );

      /*const datosPreciador2 = await realizarConsulta(
        `SELECT * from preciador where id_preciador='${datosCompartidos.id_preciador}'`
      );*/

      let idsI = null;
      let idsC = null;

      idsPortafolioAuditoria.forEach((objeto) => {
        if (objeto.tipo === "I") {
          idsI = objeto.id_portafolio;
        } else if (objeto.tipo === "C") {
          idsC = objeto.id_portafolio;
        }
      });

      const productosIdeal2 = await realizarConsulta(
        `SELECT DISTINCT p.* FROM producto p INNER JOIN portafolio po ON p.id_producto = po.id_producto WHERE po.tipo = 'I' AND po.id_grupo_cliente='${idGroupClient}'`
      );
      console.log("ID IDEAL-- - - - - -- ", idsI);
      console.log("ID COMPLEMENTARIO-- - - - - -- ", idsC);

      const productosIdealSinPreciador = productosIdeal2.map((objeto) => {
        return {
          id_producto: objeto.id_producto,
          nombre_producto: objeto.nombre_producto,
          url_imagen_prodcuto: objeto.url_imagen_producto,
          id_categoria: objeto.id_categoria,
          precio: null,
          estado: null,
        };
      });

      let productosIdeal = [];
      let productosComplementario = [];
      datosPreciador.forEach((producto) => {
        if (idsC == null) {
          console.log(
            "NO SE HAN SELECCIONADO PORDUCTOS COMPLEMENTARIOS, SE PROCEDE A VALIDAR IDEALES - - - -: ",
            producto.id_portafolio + " " + idsI
          );

          productosIdeal.push(producto);
        }
        if (idsI == null) {
          console.log(
            "NO SE HAN SELECCIONADO PORDUCTOS IDEALES, SE PROCEDE A VALIDAR COMPLEMENTARIOS - - - -: ",
            producto.id_portafolio + " " + idsC
          );
          if (producto.id_portafolio === idsC) {
            productosComplementario.push(producto);
          } else {
            productosIdeal.push(producto);
          }
        } else {
          console.log(
            "PRODUCTO A EVALUAR - - - -: ",
            producto.id_portafolio + " " + idsI
          );
          if (producto.id_portafolio === idsI) {
            productosIdeal.push(producto);
          } else {
            productosComplementario.push(producto);
          }
        }
      });

      const productosAllIdeal = productosIdealSinPreciador.map((objeto1) => {
        const matchingObj = productosIdeal.find(
          (objeto2) => objeto1.id_producto === objeto2.id_producto
        );
        if (matchingObj) {
          return { ...matchingObj };
        } else {
          return { ...objeto1 };
        }
      });

      setproductsIdeal([...productosAllIdeal]);
      setproductosComplementario([...productosComplementario]);

      console.log("PRODUCTO IDEAL-- - - - - -- ", productosIdeal);

      console.log("PRODUCTOS IDEALES TOTALES - - - - - - -", productosAllIdeal);
      console.log(
        "PRODUCTOS SIN PRECIADOR EN IDEAL-- - - - - -- ",
        productosIdealSinPreciador
      );
      console.log(
        "PRODUCTO COMPLEMENTARIOS - - - - -- - - - - -- ",
        productosComplementario
      );
      console.log(
        "DATOS DE LA CONSULTA PRECIADOR UNO QUE ES MI REFERENCIA PRINCIPAL* * * * * * * * *  : ",
        datosPreciador
      );
      /*console.log(
        "DATOS DE LA CONSULTA PRECIADOR -/-/-/-/-/-/-/-/-/: ",
        datosPreciador2
      );*/

      console.log(
        "ESTO TRAE PRODUCTOS IDEAL 2 -/-/-/-/-/-/-/-/-/: ",
        productosIdeal2
      );
      console.log(
        "IDS DE CONSULTA DE PORTAFOLIO INNER JOIN- - -/ / / / /  - : ",
        idsPortafolioAuditoria
      );
      console.log(
        "ID LA AUDITORIA PRESENTE- - -/ / / / /  - : ",
        datosCompartidos.id_portafolio_auditoria
      );
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
          text={
            "A continuación se muestran los preciadores de los productos registrados"
          }
        />
      </View>
      <ProductsPrices_Review
        text={"Portafolio Ideal"}
        products={productosIdeal}
      />
      <ProductsPrices_Review
        text={"Portafolio Complementario"}
        products={productosComplementario}
      />
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
