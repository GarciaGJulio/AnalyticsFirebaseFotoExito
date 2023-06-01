import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformation from "../../components/ScreenInformation";
import { PromosItems_Review } from "../../components/PromosItems_Review";
import { BackPage_Review } from "../../components/BackPage_Review";
import { realizarConsulta } from "../../common/sqlite_config";
import { DataContext } from "../../context/DataProvider";

const Promos_Review = () => {
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

    const promosCompletas = datosPromocion.map((objeto) => {
      const exhibidor = exhibidores.find((cat) => {
        cat.id_exhibidor === objeto.id_exhibidor
      console.log(cat.id_exhibidor+ " "+objeto.id_exhibidor)
      });
      console.log("ESTE ES EL EXHIBIDOR DE LA AUDITORIA: ",exhibidor)
      if (exhibidor) {
        return {
          ...objeto,nombre_exhibidor: exhibidor.nombre_tipo_exhibidor,
        };
      }
      return objeto;
    });
    setPromos(promosCompletas)

    //const datosActualizados = await Promise.all(datosPromesas);
    /*const categoria_name = await realizarConsulta(
      `SELECT * FROM categoria where id_categoria =${datos.id_categoria}`
    );*/
    console.log("NOMBRE DE ECHIBIDOR : ", exhibidores);
    //console.log("DATOS OBTENIDOS DE CATEGORIAS : ", perchasCompletas);
    console.log("DATOS OBTENIDOS DE PROMOCIONES : ", promosCompletas);
    //console.log("DATOS DE LA SUCURSAL : ", datosCompartidos.id_percha);
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
          text={"A continuación se muestran los exhibidores registrados"}
        />
        <BackPage_Review />
      </View>
      <PromosItems_Review data={promos}/>
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
