import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import axios from "axios";
import { realizarConsulta, selectData } from "../common/sqlite_config";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";

export const DropdownPromos = ({
  placeholder,
  setSelected,
  nameTitle,
  selected,
  setSucursalInformation,
  sucursalInformation,
  setType,
  data,
  checkdrop,
}) => {
  const [arrayClients, setArrayClients] = useState([]);
  const [newArrayClients, setNewArrayClients] = useState([]);

  const validateType = () => {
    arrayClients.forEach((type) => {
      // //console.log("CLIENTE A ANALIZAR: ", type);
      if (type.nombre_cliente == selected) {
        // //console.log(
        //   "CLIENTE ENCONTRADO - - - -ASIGNANDO TIPO DE CLIENTE: ",
        //   type.nombre_tipo_cliente
        // );
        setType(type.nombre_tipo_cliente);
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
          <Text style={{ fontSize: 13.5, fontFamily: "Metropolis" }}>
            {nameTitle}
          </Text>
        </View>
      </View>

      <SelectList
        setSelected={(val) => setSelected(val)}
        placeholder={placeholder}
        closeicon={
          <Icon
            name="chevron-small-up"
            type="entypo"
            size={28}
            color={theme.colors.gray}
            style={{ marginLeft: 20 }}
          />
        }
        // // onSelect={()=> {setTochado(!tochado)
        //   checkdrop(tochado)}}
        // dropdownShown={false}
        inputStyles={{
          fontFamily: "Metropolis",

          borderColor: theme.colors.lightgray,
        }}
        searchPlaceholder="Buscar"
        data={data}
        dropdownStyles={{ borderColor: theme.colors.lightgray, borderWidth: 2 }}
        boxStyles={{
          borderColor: theme.colors.lightgray,
          borderWidth: 2,
          borderRadius: 10,
        }}
        save="value"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //width: theme.dimensions.maxWidth / 1.2,
    width: theme.dimensions.maxWidth / 1.1,
  },
});
