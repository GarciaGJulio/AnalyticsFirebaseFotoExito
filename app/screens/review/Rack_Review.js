import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformation from "../../components/ScreenInformation";
import { BackPage_Review } from "../../components/BackPage_Review";
import TarjetaRack_Review from "../../components/TarjetaRack_Review";
import { DataContext } from "../../context/DataProvider";
import { realizarConsulta } from "../../common/sqlite_config";

const Rack_Review = () => {
  const { datosCompartidos } = useContext(DataContext);
  const [rack, setRack] = useState([]);
  const getRackData = async () => {
    const resultadoConsulta = await realizarConsulta(`SELECT * FROM percha`);
    const datos = await realizarConsulta(
      `SELECT * FROM percha where id_percha ='${datosCompartidos.id_percha}'`
    );
    const datosPromesas = datos.map(async (item) => {
      const nombre = await realizarConsulta(
        `SELECT nombre_categoria FROM categoria where id_categoria ='${item.id_categoria}'`
      );
      console.log("NOMBRE DE LA CATEGORIA: ", nombre[0].nombre_categoria);
      return {
        ...item,
        nombre_categoria: nombre[0].nombre_categoria,
      };
    });

    const datosActualizados = await Promise.all(datosPromesas);
    /*const categoria_name = await realizarConsulta(
      `SELECT * FROM categoria where id_categoria =${datos.id_categoria}`
    );*/
    //console.log("NOMBRE DE CATEGORIA : ", categoria_name);
    console.log("DATOS OBTENIDOS DE PERCHAS : ", resultadoConsulta);
    console.log("DATOS DE LA SUCURSAL : ", datosCompartidos.id_percha);
  };
  useEffect(() => {
    getRackData();
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
          text={"A continuación se muestran los datos de perchas registradas"}
        />
        <BackPage_Review />
      </View>
      <TarjetaRack_Review />
    </View>
  );
};

export default Rack_Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
