import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import ModernaContext from "../context/ModernaContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Dropdown = ({
  placeholder,
  valueInfoScreen,
  setSelected,
  error,
  setGroupClient,
  setError,
  selected,
  setSucursalInformation,
  sucursalInformation,
  setType,
  newArrayClients,
  arrayClients,
  setClientGroupId,
}) => {
  const { handleIdClientGroup } = useContext(ModernaContext);

  const validateType = () => {
    setError("");
    arrayClients.forEach(async (type) => {
      if (type.nombre_cliente == selected) {
        setType(type.nombre_tipo_cliente);
        setGroupClient(type.nombre_grupo_cliente);
        console.log("GRUPO DE CLIENTE ACTUAL: ", type.id_grupo_cliente);
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
  };

  useEffect(() => {
    validateType();
  }, [selected]);
  useEffect(() => {
    let tmpData = newArrayClients.map((item) => JSON.stringify(item));
  }, [newArrayClients]);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <ScrollView style={styles.container}>
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
        searchPlaceholder="Buscar"
        data={newArrayClients}
        inputStyles={{
          fontFamily: "Metropolis",
          fontSize: 13,
          flex: 1,
          padding: 0,
          flexShrink: 1,
        }}
        notFoundText="Cliente ya seleccionado"
        dropdownTextStyles={{ flexShrink: 1, right: 10 }}
        save="value"
        boxStyles={{
          borderColor: error ? theme.colors.modernaRed : theme.colors.lightgray,
          borderRadius: 5,
          //borderColor: theme.colors.lightgray, borderWidth: 2,
          alignItems: "center",
          borderWidth: 1 ? 2 : 0,
          height: 50,
          //fontSize: 12,
          flex: 1,
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
