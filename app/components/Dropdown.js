import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import axios from "axios";
import { realizarConsulta, selectData } from "../common/sqlite_config";
import { useFonts } from "expo-font";
import ModernaContext from "../context/ModernaContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dropdown = ({
  placeholder,
  setSelected,
  error,
  setGroupClient,
  setError,
  selected,
  setSucursalInformation,
  sucursalInformation,
  setType,
  setClientGroupId,
}) => {
  const [arrayClients, setArrayClients] = useState([]);
  const [newArrayClients, setNewArrayClients] = useState([]);
  const { handleIdClientGroup } = useContext(ModernaContext);

  const dataFormat = (array) => {
    setArrayClients(array);
    console.log("ARRAY DE CONSULTA: ", array);
    const arrayFormat = array.map((obj) => {
      console.log("OBJETO: ", obj.id_cliente);
      return { key: obj.id_cliente, value: obj.nombre_cliente };
    });
    console.log(arrayFormat);
    return arrayFormat;
  };

  /*useEffect(() => {
    Alert.alert("DATOS DE LA BASE LOCAL:", newArrayClients);
  }, []);*/

  const validateType = () => {
    setError("");
    arrayClients.forEach(async (type) => {
      console.log("CLIENTE A ANALIZAR: ", type);
      if (type.nombre_cliente == selected) {
        console.log(
          "CLIENTE ENCONTRADO - - - -ASIGNANDO TIPO DE CLIENTE: ",
          type.nombre_tipo_cliente
        );
        setType(type.nombre_tipo_cliente);
        setGroupClient(type.nombre_grupo_cliente);
        console.log("GRUPO DE CLIENTE ACTUAL: ", type.id_grupo_cliente);
        setClientGroupId(type.id_grupo_cliente);
        //handleIdClientGroup(type.id_grupo_cliente)
        await AsyncStorage.setItem("clientName", type.nombre_cliente);
        await AsyncStorage.setItem("idGroupClient", type.id_grupo_cliente);
        setSucursalInformation({
          ...sucursalInformation,
          client: selected,
          clientType: type.nombre_tipo_cliente,
        });
      }
    });
  };

  useEffect(() => {
    validateType();
  }, [selected]);

  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta("SELECT * FROM cliente");

      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta);
      setNewArrayClients(dataFormat(resultadoConsulta));
      console.log("Copia de contenido completada con éxito: ");
      const clientes = resultadoConsulta
        .map(
          (objeto) =>
            `Id: ${objeto.id_cliente}, Nombre: ${objeto.nombre_cliente}`
        )
        .join("\n");
      //Alert.alert("DATOS DE LA BASE LOCAL:", clientes);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    /*console.log("SELECT DE LA TABLA CLIENTE",);
    selectData("SELECT * FROM cliente",setArrayClients)
    dataFormat(arrayFormat)
    console.log("FORMATO NUEVO PARA DROPDOWN: ",arrayFormat)
    /*if(location){
      Alert.alert("Las coordenadas se han capturado exitosamente!", 'Latitud: ' + location.latitude + 'Longitud: ' + location.longitude)
    
    }*/
    //realizarConsulta("SELECT * FROM cliente")
    consultarYCopiarContenido();
  }, []);

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Realizando peticion de datos del cliente")
        const response = await axios.post(
          "https://fotoexito1.azurewebsites.net/api/queryInsert?code=Pd_oqC3bfYtub9E13hybiElqLCtsPgO9FErzdxdzL-ISAzFuhWl7ug==",
          { operation:"Q", data:{ tableName:"cliente" } },
          { headers: { 'accept': 'application/json' } }
        )
        console.log("DATOS EXTRAIDOS")
        const clientsArray = response.data.data.dataBaseResult;
        const clientsArrayFormat = clientsArray.map(client => {
            return {
              key: client.id_cliente,
              value: client.nombre_cliente
            }}
        )
        console.log("NUEVO FORMATO",clientsArrayFormat) 
        setClient(clientsArrayFormat)
        console.log(response.data.data.dataBaseResult)
      } catch (e) {
        console.log(e.response.data.message)
        //Alert.alert("Error de inicio de sesion", e.response.data.message);
      }
    };

    fetchData();
  }, []);*/

  /*useEffect(() => {
    console.log("DATOS DEL DROPDOWN",data)
  },[])*/

  /*useEffect(() => {
    console.log("ESTO LLEGA DE LA CONSULTA DE CLIENTES: ",clients)
  },[])*/

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={{ marginBottom: 5, fontFamily: "Metropolis" }}>Cliente</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        placeholder={placeholder}
        searchPlaceholder="Buscar"
        data={newArrayClients}
        inputStyles={{ fontFamily: "Metropolis" }}
        save="value"
        boxStyles={{
          borderColor: error ? theme.colors.modernaRed : theme.colors.lightgray,
          borderRadius: 5,
          alignItems: "center",
          borderWidth: 1 ? 2 : 0,
          height: 50,
        }}
      />
      {error && (
        <Text
          style={{
            marginTop: 7,
            color: theme.colors.modernaRed,
            fontSize: 13,
            fontFamily: "Metropolis",
            fontWeight: "600",
          }}
        >
          {error}
        </Text>
      )}
    </ScrollView>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: theme.dimensions.maxWidth / 1.2,
    width: theme.dimensions.maxWidth / 1.1,
  },
});
