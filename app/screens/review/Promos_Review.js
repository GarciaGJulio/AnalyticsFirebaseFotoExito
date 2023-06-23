import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformationReview from "../../components/ScreenInformationReview";
import { PromosItems_Review } from "../../components/PromosItems_Review";
import { BackPage_Review } from "../../components/BackPage_Review";
import { realizarConsulta } from "../../common/sqlite_config";
import { DataContext } from "../../context/DataProvider";
import { FAB } from "@rneui/base";

const Promos_Review = ({ navigation }) => {
  const { datosCompartidos } = useContext(DataContext);
  const [promos, setPromos] = useState([]);
  const getPromosData = async () => {
    //const resultadoConsulta = await realizarConsulta(`SELECT * FROM promocion`);
    const datosPromocion = await realizarConsulta(
      `SELECT * FROM promocion where id_promocion ='${datosCompartidos.id_promocion}'`
    );
    const exhibidores = await realizarConsulta(`SELECT * FROM exhibidor`);
    /*const datos = await realizarConsulta(
      `SELECT * FROM percha where id_percha ='${datosCompartidos.id_percha}'`
    );*/
    /*const datosPromesas = datos.map(async (item) => {
      const nombre = await realizarConsulta(
        `SELECT nombre_categoria FROM categoria where id_categoria ='${item.id_categoria}'`
      );
      console.log("NOMBRE DE LA CATEGORIA: ", nombre[0].nombre_categoria);
      return {
        ...item,
        nombre_categoria: nombre[0].nombre_categoria,
      };
    });*/

    const promosConsulta = await realizarConsulta(
      `SELECT pro.*, et.nombre_tipo_exhibidor, et.url_imagen_exhibidor,et.id_exhibidor_tipo
      FROM promocion AS pro
      INNER JOIN exhibidor AS ex ON ex.id_exhibidor = pro.id_exhibidor
      INNER JOIN exhibidor_tipo AS et ON et.id_exhibidor_tipo = ex.id_exhibidor_tipo
      WHERE pro.id_promocion = '${datosCompartidos.id_promocion}'
      `
    );

    const promosCompletas = datosPromocion.map((objeto) => {
      const exhibidor = exhibidores.find((cat) => {
        cat.id_exhibidor === objeto.id_exhibidor;
        console.log(cat.id_exhibidor + " " + objeto.id_exhibidor);
      });
      console.log("ESTE ES EL EXHIBIDOR DE LA AUDITORIA: ", exhibidor);
      if (exhibidor) {
        return {
          ...objeto,
          nombre_exhibidor: exhibidor.nombre_tipo_exhibidor,
        };
      }
      return objeto;
    });
    setPromos(promosConsulta);

    //const datosActualizados = await Promise.all(datosPromesas);
    /*const categoria_name = await realizarConsulta(
      `SELECT * FROM categoria where id_categoria =${datos.id_categoria}`
    );*/
    console.log("NOMBRE DE ECHIBIDOR : ", exhibidores);
    //console.log("DATOS OBTENIDOS DE CATEGORIAS : ", perchasCompletas);
    console.log("DATOS OBTENIDOS DE PROMOCIONES : ", promosCompletas);
    //console.log("DATOS DE LA SUCURSAL : ", datosCompartidos.id_percha);

    console.log(
      "DATOS OBTENIDOS DE PROMOCIONES CON JOINS - - - - - - -: ",
      promosConsulta
    );
  };
  useEffect(() => {
    getPromosData();
  }, []);

  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View
        style={{
          width: theme.dimensions.maxWidth,
          marginTop: theme.dimensions.maxHeight / 7,
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
          text={"A continuación se muestran los exhibidores registrados"}
        />
      </View>
      <PromosItems_Review data={promos} />
    </View>
  );
};

export default Promos_Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
