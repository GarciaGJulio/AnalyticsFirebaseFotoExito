import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModernaContext } from "../context/ModernaProvider";

export const Dropdown = ({
  placeholder,
  valueInfoScreen,
  setSelected,
  setGroupClient,
  setError,
  error,
  selected,
  hadSave,
  setSucursalInformation,
  sucursalInformation,
  setType,
  newArrayClients,
  arrayClients,
  setClientGroupId,
}) => {
  const { handleIdClientGroup } = useContext(ModernaContext);

  const validateType = () => {
    try {
      setError("");
      const nombre_cliente = selected.split("-")[1];
      arrayClients.forEach(async (type) => {
        if (type.nombre_cliente == nombre_cliente) {
          setType(type.nombre_tipo_cliente);
          setGroupClient(type.nombre_grupo_cliente);
          console.log("GRUPO DE CLIENTE ACTUAL: ", type.id_grupo_cliente);
          console.log(
            " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
          );
          console.log("DATOS A GUARDAR:", type);
          console.log(
            " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
          );
          setClientGroupId(type.id_grupo_cliente);
          await AsyncStorage.setItem("nombre_cliente", type.nombre_cliente);
          await AsyncStorage.setItem("id_cliente", type.id_cliente);
          await AsyncStorage.setItem("idGroupClient", type.id_grupo_cliente);
          setSucursalInformation({
            ...sucursalInformation,
            client: selected,
            clientType: type.nombre_tipo_cliente,
          });
        }
      });
    } catch (e) {
      Alert.alert("error en validación david 1", e);
    }
  };
  useEffect(() => {
    try {
      console.log("ARRAY DE CLIENTES", newArrayClients);
      newArrayClients.sort(function (a, b) {
        return b.key - a.key;
      });
    } catch (e) {
      Alert.alert("error en validación david 2", e);
    }
  }, []);

  useEffect(() => {
    validateType();
  }, [selected]);
  useEffect(() => {
    try {
      let tmpData = newArrayClients.map((item) => JSON.stringify(item));
    } catch (e) {
      Alert.alert("error en validación david 3", e);
    }
  }, [newArrayClients]);
  useEffect(() => {
    Alert.alert("comprobando 1", valueInfoScreen);
    Alert.alert("comprobando 2", placeholder);
    Alert.alert("comprobando 3", hadSave);
    //*Alert.alert("comprobando 4", newArrayClients);
    Alert.alert("comprobando 5", error);
  }, []);
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={{ color: "red", textAlign: "left" }}>*</Text>
        </View>

        <View>
          <Text style={{ marginBottom: 5, fontFamily: "Metropolis", top: -1 }}>
            Cliente
          </Text>
        </View>
      </View>
      <SelectList
        defaultOption={
          valueInfoScreen && { key: "randomItem", value: valueInfoScreen }
        }
        setSelected={(val) => setSelected(val)}
        placeholder={placeholder}
        search={!hadSave}
        //dropdownShown={false}
        searchPlaceholder="Buscar"
        data={[]}
        inputStyles={{
          fontFamily: "Metropolis",
          fontSize: 13,
          padding: 0.5,
          flexShrink: 1,
        }}
        notFoundText={
          !hadSave
            ? "No se han encontrado coincidencias"
            : "Cliente ya seleccionado"
        }
        dropdownTextStyles={{ flexShrink: 1, right: 10, flex: 1 }}
        save="value"
        boxStyles={{
          borderColor: error ? theme.colors.modernaRed : theme.colors.lightgray,
          borderRadius: 5,
          //borderColor: theme.colors.lightgray, borderWidth: 2,
          alignItems: "center",
          borderWidth: 1 ? 2 : 0,
          height: 60,
          //fontSize: 12,
          flex: 1,
          padding: 2,
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
    </View>
  );
};

//export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: theme.dimensions.maxWidth / 1.2,
    width: theme.dimensions.maxWidth / 1.1,
  },
});
const dataFormat2 = (array) => {
  console.log("ARRAY DE CONSULTA: ", array);
  const arrayFormat = array.map((obj) => {
    console.log("OBJETO: ", obj.id_cliente);
    return { key: obj.id_cliente, value: obj.nombre_cliente };
  });
  console.log(arrayFormat);
  return arrayFormat;
};

export const DropdownDavid = ({ data }) => {
  /*const [datasTempo,setDatasTemp]=useState([])
  useEffect(()=>{
    handleSelectDataBase("SELECT * FROM cliente",
    (resultadoConsulta) => {
      Alert.alert("éxito al consulatar cliente en david", resultadoConsulta.toString());
      setDatasTemp(dataFormat2(resultadoConsulta));
    }, (e) => {
      console.log("error al consulatar cliente  en david", e)
      Alert.alert("error al consulatar cliente n en davida", e);

    })

  },[])*/
  return <SelectList setSelected={() => {}} data={data} save="value" />;
};
