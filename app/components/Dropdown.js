import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/base";

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
  handleValidate,
  setType,
  newArrayClients,
  arrayClients,
  setClientGroupId,
}) => {
  useEffect(() => {
    try {
      //console.log("ARRAY DE CLIENTES", newArrayClients);
      newArrayClients.sort(function (a, b) {
        return b.key.localeCompare(a.key);
      });
    } catch (e) {
      Alert.alert("error en validación david 2", e);
    }
  }, []);

  const validateType = () => {
    // //console.log(
    //   "----------------------*--------------SELECCIONADO: ",
    //   selected
    // );
    try {
      setError("");
      [].length
      console.log("*****************************************************************")
      console.log("selected antes", selected)
      let nombreClienteTemp = selected.split("-");
      let nombre_cliente = nombreClienteTemp[nombreClienteTemp.length - 1];
      console.log("nombre_cliente antes", nombre_cliente)

      nombre_cliente = nombre_cliente.trim();

      console.log("nombreClienteTemp", nombreClienteTemp)
      console.log("nombre_cliente des", nombre_cliente)

      console.log("*****************************************************************")

      // //console.log(
      //   "----------------------*--------------SELECCIONADO SOLO: ",
      //   nombre_cliente
      // );
      arrayClients.forEach(async (type) => {
        if (type.nombre_cliente == nombre_cliente) {
          setType(type.nombre_tipo_cliente);
          setGroupClient(type.nombre_grupo_cliente);
          //console.log("GRUPO DE CLIENTE ACTUAL: ", type.id_grupo_cliente);
          // //console.log(
          //   " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
          // );
          //console.log("DATOS A GUARDAR:", type);
          // //console.log(
          //   " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
          // );
          console.log("*******************************************type.nombre_cliente-------------",type.nombre_cliente)
          setClientGroupId(type.id_grupo_cliente);
          await AsyncStorage.setItem("nombre_cliente", `${type.nombre_cliente||nombre_cliente}`);
          const temp=await AsyncStorage.getItem("nombre_cliente");
          console.log("*******************************************///////////////////////////////////////////////type.temp-------------",temp)

          await AsyncStorage.setItem("id_cliente", type.id_cliente);
          handleValidate({ clientID: type.id_cliente }, "CC");
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

  /*useEffect(() => {
    try {
      //console.log("ARRAY DE CLIENTES", newArrayClients);
      newArrayClients.sort(function (a, b) {
        return b.key - a.key;
      });
    } catch (e) {
      Alert.alert("error en validación david 2", e);
    }
  }, []);*/

  useEffect(() => {
    //console.log("ARRAY DE CLIENTES",newArrayClients);
    validateType();
    console.log("-----------------------selected------------",selected)
  }, [selected]);

  /*
  //Vino con el merge de dropdownReview 25/06
  useEffect(() => {
    let tmpData = newArrayClients.map((item) => JSON.stringify(item));
  }, [newArrayClients]);
*/
  /*useEffect(() => {
    Alert.alert("comprobando 1", valueInfoScreen);
    Alert.alert("comprobando 2", placeholder);
    Alert.alert("comprobando 3", hadSave);
    //*Alert.alert("comprobando 4", newArrayClients);
    Alert.alert("comprobando 5", error);
  }, []);*/
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
        // onSelect={() => alert(selected)}
        setSelected={(val) => setSelected(val)}
        placeholder={placeholder}
        search={!hadSave}
        closeicon={
          <Icon
            name="chevron-small-up"
            type="entypo"
            size={28}
            color={theme.colors.gray}
            style={{ marginLeft: 20 }}
          />
        }
        //dropdownShown={false}
        searchPlaceholder="Buscar"
        data={newArrayClients}
        inputStyles={{
          //color: "blue",
          fontFamily: "Metropolis",
          fontSize: 13,
          padding: 0.5,
          flexShrink: 1,
          // backgroundColor:'orange'
        }}
        notFoundText={
          !hadSave
            ? "No se han encontrado coincidencias"
            : "Cliente ya seleccionado"
        }
        dropdownTextStyles={{ flexShrink: 1, right: 10 }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: theme.dimensions.maxWidth / 1.2,
    width: theme.dimensions.maxWidth / 1.1,
  },
});
