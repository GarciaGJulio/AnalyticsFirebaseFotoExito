import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import theme from "../../theme/theme";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import * as Animatable from "react-native-animatable";
import {
  handleSelectDataBase,
  realizarConsulta,
} from "../../common/sqlite_config";
import { useFonts } from "expo-font";
import { BackPage_Review } from "../../components/BackPage_Review";
import { DropdownDavid } from "../../components/Dropdown";
import { ItemBranch_Review } from "../../components/ItemBranch_Review";
// import { Button } from "react-native-paper";
import { Navigation } from "../../navigation/Navigation";
import { GlobalContext } from "../../context/GlobalContext";
import { ModernaContext } from "../../context/ModernaProvider";

export const ListBranch = ({ navigation }) => {
  const [audit, setAudit] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const { userInfo } = useContext(ModernaContext);

  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta(
        `SELECT * FROM auditoria where usuario_creacion='${userInfo.givenName}'`
      );
      console.log(
        "PETICION ACTUAL - - -- - ",
        `SELECT * FROM auditoria where usuario_creacion='${userInfo.givenName}'`
      );

      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta);
      setAudit(resultadoConsulta);
      setFilteredData(resultadoConsulta);
      console.log(
        "Copia de contenido completada con éxito: ",
        resultadoConsulta
      );
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
  }, [refresh, globalVariable]);

  useEffect(() => {
    //filteredData;
    console.log("DATOS DE AUDITORIA:", filteredData);
    //consultarYCopiarContenido
  }, [refresh]);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("menu");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const searchFilter = (text) => {
    setSearchText(text);
    const newData = audit.filter((item) => {
      const itemName = `${item.nombre_cliente}`.toLowerCase();
      const itemBranch = `${item.nombre_sucursal}`.toLowerCase();
      const searchTextLower = text.toLowerCase();

      return (
        itemName.includes(searchTextLower) ||
        itemBranch.includes(searchTextLower)
      );
    });
    setFilteredData(newData);
  };

  const dataFormat = (array) => {
    // setArrayClients(array);
    console.log("ARRAY DE CONSULTA: ", array);
    const arrayFormat = array.map((obj) => {
      console.log("OBJETO: ", obj.id_cliente);
      return { key: obj.id_cliente, value: obj.nombre_cliente };
    });
    console.log(arrayFormat);
    return arrayFormat;
  };
  if (!fontLoaded) return null;

  {
    /*<View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image} />
      </View>

      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>
            Puedes revisar las auditorías ya realizadas presionando en el
            registro de interés.
          </Text>
          <View style={styles.contentContainerBranch}>
            <TextInput
              style={{
                height: 50,
                width: 320,
                fontFamily: "Metropolis",
                borderColor: "gray",
                borderWidth: 1,
                paddingHorizontal: 10,
                marginBottom: 20,
                borderRadius: 10,
              }}
              placeholder="Buscar"
              onChangeText={searchFilter}
              value={searchText}
            />
            {filteredData.length === 0 ? (
              <View>
                <Text style={styles.title}>
                  No se han registrado auditorías aún.
                </Text>
              </View>
            ) : (
              <ScrollView style={{ bottom: 5 }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={filteredData}
                  renderItem={({ item }) => (
                    <ItemBranch_Review
                      branch={item}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  )}
                  //keyExtractor={(item) => item.id}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </Animatable.View>
                  </View>*/
  }
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={Logotipo} style={styles.image} />
        </View>
        <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Puedes revisar las auditorías ya realizadas presionando en el
              registro de interés.
            </Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar"
                onChangeText={searchFilter}
                value={searchText}
              />
              {filteredData.length === 0 ? (
                <View style={styles.noAuditsContainer}>
                  <Text style={styles.noAuditsText}>
                    No se han registrado auditorías aún.
                  </Text>
                </View>
              ) : (
                <ScrollView style={styles.auditsListContainer}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredData}
                    renderItem={({ item }) => (
                      <ItemBranch_Review
                        branch={item}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                    )}
                  />
                </ScrollView>
              )}
            </View>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

//export default ListBranch;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1, // Mantener la relación de aspecto original de la imagen
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 2,
    width: theme.dimensions.maxWidth,
    height: theme.dimensions.maxHeight - theme.dimensions.maxHeight / 2.1,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 9,
  },

  content: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    padding: 13,
  },
  title: {
    fontSize: theme.fontSize.subtitle,
    fontFamily: "Metropolis",
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    alignItems: "center",
  },
  searchInput: {
    height: 50,
    width: 320,
    fontFamily: "Metropolis",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  noAuditsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAuditsText: {
    fontSize: theme.fontSize.subtitle,
    fontFamily: "Metropolis",
  },
  auditsListContainer: {
    flex: 1,
    width: "90%",
    marginBottom: 5,
  },
});
