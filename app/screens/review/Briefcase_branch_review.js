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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB } from "react-native-paper";

const Briefcase_branch_review = ({ route }) => {
  const { datosCompartidos } = useContext(DataContext);
  const [idealPortafolio, setIdealPortafolio] = useState([]);
  const [complementaryPortafolio, setComplementaryPortafolio] = useState([]);
  // const { branch } = route.params;
  // console.log(branch, "Briefcase");

  const consultarYCopiarContenido = async () => {
    try {
      const consultaPortafolioAudit = await realizarConsulta(
        `SELECT DISTINCT pa.*,pf.tipo
        FROM portafolio_auditoria AS pa
        INNER JOIN auditoria AS a ON a.id_portafolio_auditoria = pa.id_portafolio_auditoria
        inner JOIN portafolio as pf on pf.id_portafolio = pa.id_portafolio
        WHERE pa.id_portafolio_auditoria = '${datosCompartidos.id_portafolio_auditoria}' AND a.id_auditoria = '${datosCompartidos.id_auditoria}'`
      );

      /*const consultaPortafolioAuditoriaTodos = await realizarConsulta(
        `SELECT pa.*,p.tipo FROM portafolio_auditoria as pa inner join portafolio as p on p.id_producto=pa.id_producto WHERE pa.id_portafolio_auditoria = '${datosCompartidos.id_portafolio_auditoria}'`
      );*/

      const productosIdeal2 = await realizarConsulta(
        `SELECT DISTINCT p.* FROM producto as p INNER JOIN portafolio po ON p.id_producto = po.id_producto WHERE po.tipo = 'I' AND po.id_grupo_cliente='${idGroupClient}' AND po.estado=true`
      );

      const productosIdealSinElegir = productosIdeal2.map((objeto) => {
        return {
          id_producto: objeto.id_producto,
          nombre_producto: objeto.nombre_producto,
          url_imagen_prodcuto: objeto.url_imagen_producto,
          id_categoria: objeto.id_categoria,
          precio: null,
          estado: null,
        };
      });

      const arrayIdsPortafolio = [];

      consultaPortafolioAudit.forEach((item) => {
        const idPortafolio = item.id_portafolio;
        if (!arrayIdsPortafolio.includes(idPortafolio)) {
          arrayIdsPortafolio.push(idPortafolio);
        }
      });

      console.log("IDS DE PORTAFOLIOS: - - - - - - - - -", arrayIdsPortafolio);

      const consultaPortafolio = [];
      for (const producto of consultaPortafolioAudit) {
        const consulta = await realizarConsulta(
          `SELECT DISTINCT p.nombre_producto, pf.tipo, c.nombre_categoria, pf.id_portafolio, p.id_producto
          FROM portafolio AS pf
          INNER JOIN producto AS p ON p.id_producto = pf.id_producto
          INNER JOIN categoria AS c ON c.id_categoria = p.id_categoria
          INNER JOIN portafolio_auditoria AS pa ON pa.id_portafolio = pf.id_portafolio AND pa.id_producto = p.id_producto
          INNER JOIN auditoria AS a ON pa.id_portafolio_auditoria = a.id_portafolio_auditoria
          WHERE (pf.id_producto = '${producto.id_producto}')
          AND (pf.tipo ='${producto.tipo}' )
          GROUP BY p.id_producto`
        );
        consultaPortafolio.push(consulta);
      }

      const idsPortafolioAuditoria = await realizarConsulta(
        `SELECT DISTINCT  p.id_portafolio, p.tipo FROM portafolio p INNER JOIN portafolio_auditoria pa ON p.id_portafolio = pa.id_portafolio WHERE pa.id_portafolio = '${datosCompartidos.id_portafolio_auditoria}'`
      );

      const idGroupClient = await AsyncStorage.getItem("idGroupClient");
      const productosIdealPortafolioExtra = await realizarConsulta(
        `SELECT DISTINCT p.*, po.id_portafolio ,ca.nombre_categoria
        FROM producto AS p 
        LEFT JOIN portafolio po ON p.id_producto = po.id_producto 
        LEFT JOIN categoria ca ON p.id_categoria = ca.id_categoria
          WHERE po.tipo = 'I'
          AND po.id_grupo_cliente = '${idGroupClient}' 
          AND po.estado = true`
      );

      const arrayTipoC = [];
      const arrayTipoI = [];

      const productosIdealesExtras = productosIdealPortafolioExtra.map(
        (objeto) => {
          return {
            id_producto: objeto.id_producto,
            nombre_producto: objeto.nombre_producto,
            url_imagen_producto: objeto.url_imagen_producto,
            id_categoria: objeto.id_categoria,
            nombre_categoria: objeto.nombre_categoria,
            precio: null,
            estado: false,
          };
        }
      );

      consultaPortafolio.forEach((elementoInterior) => {
        elementoInterior.forEach((objeto) => {
          const {
            tipo,
            nombre_categoria,
            nombre_producto,
            id_producto,
            ...resto
          } = objeto;
          const producto = {
            nombre_producto,
            id_producto,
            tipo,
            estado: true,
            nombre_categoria,
            ...resto,
          };
          console.log("OBJETO A ANALIZAR: ", tipo);
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
      });

      /*let categoriasNoIguales = productosIdealesExtras.filter((categoria) => {
        return !arrayTipoI.some(
          (c) => c.nombre_categoria === categoria.nombre_categoria
        );
      });*/

      let categoriasNoIguales = productosIdealPortafolioExtra.filter((pa) => {
        return !arrayTipoI.some((c) => {
          return c.productos.some(
            (producto) => producto.id_producto === pa.id_producto
          );
        });
      });

      const categorias = {};

      // Iterar sobre el arreglo
      for (const objeto of categoriasNoIguales) {
        const categoriaActual = objeto.nombre_categoria;

        // Verificar si la categoría ya existe en el objeto de categorías
        if (categoriaActual in categorias) {
          // Agregar el objeto al arreglo de productos de la categoría existente
          categorias[categoriaActual].productos.push(objeto);
        } else {
          // Crear una nueva categoría con el objeto como primer producto
          categorias[categoriaActual] = {
            nombre_categoria: categoriaActual,
            tipo: "I",
            productos: [objeto],
          };
        }
      }

      // Convertir el objeto de categorías en un arreglo de objetos
      const categoriasnNoSeleccionadas = Object.values(categorias);

      // Imprimir el resultado
      console.log(categoriasnNoSeleccionadas);

      const arrayTipoIIntegrado = [
        ...categoriasnNoSeleccionadas,
        ...arrayTipoI,
      ];

      console.log("Array - - - - - - - - - Tipo C:", arrayTipoC);
      setComplementaryPortafolio(arrayTipoC);
      console.log("Array  * * * * * * * *  Tipo I:", arrayTipoI);

      setIdealPortafolio(arrayTipoIIntegrado);
      console.log(
        "IDS DE CONSULTA DE PORTAFOLIO INNER JOIN- - -/ / / / /  - : ",
        idsPortafolioAuditoria
      );
      console.log(
        "DATOS ALMACENADOS DE PORTAFOLIO AUDITORIA: ",
        consultaPortafolio
      );
      console.log(
        " - - --  ELEMENTOS EXTRAS - - - - - ",
        productosIdealesExtras
      );
      console.log(" - - --  ARRAY DE IDEALES - - - - - ", arrayTipoI);
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
        <View style={{ flex: 1, width: "100%" }}>
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
            style={{ width: 1, height: 5, backgroundColor: "blue" }}
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
