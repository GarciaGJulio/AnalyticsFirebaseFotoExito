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
import { FAB } from "@rneui/base";

const Prices_Review = ({ navigation }) => {
  const { datosCompartidos } = useContext(DataContext);
  const [productosIdeal, setproductsIdeal] = useState([]);
  const [productosComplementario, setproductosComplementario] = useState([]);
  const consultarYCopiarContenido = async () => {
    //console.log("DATOS COMPARTIDOS: ")
    const idGroupClient = await AsyncStorage.getItem("idGroupClient");
    try {
      const idsPortafolioAuditoria = await realizarConsulta(
        `SELECT DISTINCT p.id_portafolio, p.id_producto, p.tipo
        FROM portafolio as p
        INNER JOIN portafolio_auditoria pa ON p.id_portafolio = pa.id_portafolio
        WHERE pa.id_portafolio_auditoria = '${datosCompartidos.id_portafolio_auditoria}'
        `
      );

      const datosPreciador = await realizarConsulta(
        `SELECT p.nombre_producto,p.url_imagen_producto,pr.* from auditoria as a 
        inner join preciador as pr on pr.id_preciador=a.id_preciador 
        inner join portafolio as pf on pr.id_portafolio=pf.id_portafolio and pr.id_producto= pf.id_producto 
        inner join producto as p on p.id_producto=pf.id_producto where a.id_auditoria='${datosCompartidos.id_auditoria}'`
      );

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
        `SELECT DISTINCT p.* FROM producto as p INNER JOIN portafolio po ON p.id_producto = po.id_producto WHERE po.tipo = 'I' AND po.id_grupo_cliente='${idGroupClient}' AND po.estado=true`
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

      const productosIdeal = [];
      const productosComplementario = [];
      console.log(
        "NUMERO DE ELEMENTOS ENCONTRADOS EN EL PRECIADOR: ",
        datosPreciador.length
      );
      datosPreciador.forEach((producto) => {
        if (idsC === null && idsI === null) {
          console.log(
            "NO SE HAN SELECCIONADO PRODUCTOS COMPLEMENTARIOS O IDEALES, SE PROCEDERÁ A VALIDAR TODO EL ARREGLO"
          );
          productosIdeal.push(producto);
        } else if (idsC === null) {
          console.log(
            "NO SE HAN SELECCIONADO PRODUCTOS COMPLEMENTARIOS, SE PROCEDERÁ A VALIDAR LOS PRODUCTOS IDEALES"
          );
          console.log(
            "PRODUCTO: " +
              producto.nombre_producto +
              " ID:" +
              producto.id_portafolio +
              "ID I: " +
              idsI
          );
          if (producto.id_portafolio === idsI) {
            console.log(
              " \nGUARDANDO PRODUCTO :" + producto.nombre_producto + " EN IDEAL"
            );
            productosIdeal.push(producto);
          }
        } else if (idsI === null) {
          console.log(
            "NO SE HAN SELECCIONADO PRODUCTOS IDEALES, SE PROCEDERÁ A VALIDAR LOS PRODUCTOS COMPLEMENTARIOS"
          );
          console.log(
            "********************PRODUCTO A EVALUAR*********************"
          );
          console.log(producto);
          console.log(
            "***********************************************************"
          );
          if (producto.id_portafolio === idsC) {
            productosComplementario.push(producto);
          }
        } else {
          console.log("SE HAN SELECCIONADO AMBOS TIPOS DE PRODUCTOS");
          console.log(
            "evaluando producto: " +
              producto.id_portafolio +
              " " +
              producto.id_producto
          );
          if (producto.id_portafolio === idsI) {
            console.log(
              "ID DEL PRODUCTO A EVALUAR: " +
                producto.id_portafolio +
                " " +
                producto.id_producto +
                " ---- " +
                idsI
            );
            productosIdeal.push(producto);
          } else if (producto.id_portafolio === idsC) {
            console.log(
              "ID DEL PRODUCTO A EVALUAR C: " +
                producto.id_portafolio +
                " " +
                producto.id_producto +
                " ---- " +
                idsC
            );
            productosComplementario.push(producto);
          }
        }
      });

      const productosAllIdeal = [];

      productosIdealSinPreciador.forEach((objeto1) => {
        const matchingObj = productosIdeal.find(
          (objeto2) => objeto1.id_producto === objeto2.id_producto
        );

        if (matchingObj) {
          productosAllIdeal.push({ ...matchingObj });
        } else {
          productosAllIdeal.push({ ...objeto1 });
        }
      });

      productosIdeal.forEach((objeto2) => {
        const matchingObj = productosIdealSinPreciador.find(
          (objeto1) => objeto2.id_producto === objeto1.id_producto
        );

        if (!matchingObj) {
          productosAllIdeal.push({ ...objeto2 });
        }
      });

      console.log(productosAllIdeal);

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

      console.log(
        "ESTO TRAE PRODUCTOS IDEAL 2 -/-/-/-/-/-/-/-/-/: ",
        productosIdeal2
      );
      console.log(
        "ID LA AUDITORIA PRESENTE- - -/ / / / /  - : ",
        datosCompartidos.id_portafolio_auditoria
      );
      console.log(
        "IDS DE CONSULTA DE PORTAFOLIO INNER JOIN EN LA PANTALLA DE PRECIADOR- - -/ / / / /  - : ",
        idsPortafolioAuditoria
      );
      console.log(
        "ESTOS SON TODOS LOS PRODUCTOS IDEALES CON O SIN PRECIADOR:",
        productosAllIdeal
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
          marginTop: theme.dimensions.maxHeight / 9,
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
