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
  /*
  const validateProducts = (value) => {
    console.log("PRODUCTO SELECCIONADO: - - - " + value);
    if (complementaryPortfolioProducts.length === 0) {
      const product = data.find((prod) => {
        console.log("PRODUCTO A COMPARAR: - - - - - ",prod.value)
        prod.value === value
      });
      console.log("PRODUCTO EXTRAIDO: - - - - - ",product)
      const { key } = product;
      console.log("PRODUCTO A GUARDAR PRIMERO: - - - - -", product);
      //console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
      setComplementaryPortfolioProducts([{ value, key }]);
    } 

    const product = data.find((prod) => prod.value === value);
  
    if (product) {
      const { key } = product;
      console.log("PRODUCTO A EVALUAR: - - - - -", product);

        const existingProduct = complementaryPortfolioProducts.find((prod) => prod.key === key);
  
        if (existingProduct) {
          console.log("ELIMINANDO PRODUCTO . . . . ");
          setComplementaryPortfolioProducts((prevProducts) =>
            prevProducts.filter((prod) => prod.key !== key)
          );
        } else {
          console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
          setComplementaryPortfolioProducts((prevProducts) => [...prevProducts, { value, key }]);
        }
    }
  };
  
*/

  /*const updateObject = (select) => {
    setComplementaryPortfolioProducts(
      select.map((obj) => {
        const myString = obj;
        const valores = myString.split("-");
        const valor1 = valores[0];
        const valor2 = valores[1];
        let newObject = {
          id: valor2,
          name: valor1,
          price: null,
          state: false,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
        console.log("OBJETO FORMATEADO: ", newObject);
        return newObject;
      })
    );
  };*/

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

    // Buscar el objeto correspondiente al producto seleccionado
    /*let productData = select.find((obj) => {
      console.log("OBJETO DE COMPARACION: ",obj.nombre_producto + "-" + obj.id_producto)
      return (obj.nombre_producto + "-" + obj.id_producto) === value;
    });

    if (productData) {
      // Si se encuentra el objeto, obtener los valores de id_producto y mombre_producto
      let newObject = {
        id: productData.id_producto,
        name: productData.nombre_producto,
        price: null,
        state: false,
        images: {
          image1: null,
          image2: null,
          image3: null,
        },
      };

      console.log("PRODUCTO COMPLEMENTARIO FORMATEADO: ", newObject);
    } else {
      console.log(
        "No se encontró el producto seleccionado en complementaryPortfolioProducts"
      );
    }*/
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
