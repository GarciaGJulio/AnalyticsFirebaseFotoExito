import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";

export const MultiSelectList = ({
  setComplementaryPortfolioProducts,
  complementaryPortfolioProducts,
  idPortafolioComplementario,
  auxiliarArray,
  products,
}) => {
  const [select, setSelected] = useState([]);

  const updateObject = (select) => {
    const newArray = auxiliarArray.filter((obj) => {
      console.log("ARRAY A COMPARAR: ", obj);
      const concatenatedValue = `${obj.name}-${obj.id}`;
      return select.includes(concatenatedValue);
    });

    const newArrayWithInitial = newArray.map((obj) => {
      return {
        ...obj,
        id_portafolio_complementario: idPortafolioComplementario,
      };
    });

    setComplementaryPortfolioProducts([...newArrayWithInitial]);
    console.log("ARRAY DE VALORES ENCONTRADOS: ", newArrayWithInitial);
  };

  useEffect(() => {
    console.log(JSON.stringify(select));
    updateObject(select);
  }, [select]);

  const addProduct = (value) => {
    console.log("NOMBRE DEL PRODUCTO QUE ENTRA: ", value);
  };

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Portafolio Complementario</Text>
      <MultipleSelectList
        setSelected={(val) => {
          //setValue(val)
          //addProduct(val);
          setSelected(val);
          //setComplementaryPortfolioProducts(val);
        }}
        inputStyles={{ fontFamily: "Metropolis" }}
        data={products}
        searchPlaceholder="Buscar producto"
        save="value"
        //onSelect={() => alert(selected)}
        label="Productos"
        placeholder="Selecciona productos adicionales al portafolio"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: theme.dimensions.maxWidth / 1.1,
    marginVertical: 5,
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    marginVertical: 10,
  },
});
