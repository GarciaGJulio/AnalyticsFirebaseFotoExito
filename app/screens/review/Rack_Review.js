import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ModernaHeader from "../../components/ModernaHeader";
import theme from "../../theme/theme";
import ScreenInformationReview from "../../components/ScreenInformationReview";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DataContext } from "../../context/DataProvider";
import { realizarConsulta } from "../../common/sqlite_config";
import { TarjetaRack_Review } from "../../components/TarjetaRack_Review";
import { FAB } from "@rneui/base";

const Rack_Review = ({ navigation }) => {
  const { datosCompartidos } = useContext(DataContext);
  const [rack, setRack] = useState([]);
  const getRackData = async () => {
    //const resultadoConsulta = await realizarConsulta(`SELECT * FROM percha`);
    const categorias = await realizarConsulta(`SELECT * FROM categoria`);
    const datos = await realizarConsulta(
      `SELECT * FROM percha where id_percha ='${datosCompartidos.id_percha}'`
    );

    const category = await realizarConsulta(
      `SELECT ca.nombre_categoria, p.*, pl.id_planograma,pl.url_imagen1 AS url_planograma1, pl.url_imagen2 AS url_planograma2, pl.url_imagen3 AS url_planograma3
      FROM percha AS p
      INNER JOIN categoria AS ca ON ca.id_categoria = p.id_categoria
      INNER JOIN planograma AS pl ON pl.id_categoria = ca.id_categoria
      INNER JOIN auditoria AS a ON a.id_auditoria = '${datosCompartidos.id_auditoria}'
      WHERE p.id_percha = '${datosCompartidos.id_percha}' AND a.id_auditoria = '${datosCompartidos.id_auditoria}'`
    );

    console.log(
      "CATEGORIAS CON PERCHAS - - - - - - - - - - - - - - * */ / /: ",
      category
    );

    const datosConImagenesPlanograma = category.map((objeto) => {
      const imagenesPlanograma = [];
      if (objeto.url_imagen1) {
        imagenesPlanograma.push(objeto.url_imagen1);
      }
      if (objeto.url_imagen2) {
        imagenesPlanograma.push(objeto.url_imagen2);
      }
      if (objeto.url_imagen3) {
        imagenesPlanograma.push(objeto.url_imagen3);
      }
      return { ...objeto, imagenesPlanograma };
    });

    console.log(
      "PERCHAS CON CATEGORIAS FORMATEADO CON IMAGENES",
      datosConImagenesPlanograma
    );

    const perchasCompletas = datos.map((objeto) => {
      const categoria = categorias.find((cat) => {
        console.log(cat.id_categoria + " " + objeto.id_categoria);
        cat.id_categoria === objeto.id_categoria;
      });
      if (categoria) {
        return {
          ...objeto,
          nombre_categoria: categoria.nombre_categoria,
        };
      }
      return objeto;
    });
    setRack(category);
    console.log("DATOS OBTENIDOS DE PERCHAS : ", perchasCompletas);
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
          text={"A continuación se muestran los datos de perchas registradas"}
        />
      </View>
      <TarjetaRack_Review data={rack} />
      <View style={{ flex: 0.1, backgroundColor: "red" }}></View>
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
