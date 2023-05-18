import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import theme from '../theme/theme';

const MultiSelectList = ({ setComplementaryPortfolioProducts, complementaryPortfolioProducts }) => {
  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
    { key: '8', value: 'Harina', disabled: true },
    { key: '9', value: 'Fideos' },
    { key: '10', value: 'Pan' },
    { key: '11', value: 'Comestibles' },
  ];


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





  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Portafolio Complementario</Text>
      <MultipleSelectList
        setSelected={(val) => {
          //setValue(val)
          setComplementaryPortfolioProducts(val)
        }
        }
        data={data}
        save="value"
        //onSelect={() => alert(selected)} 
        label="Productos"
        placeholder='Selecciona productos adicionales al portafolio'
      />
    </ScrollView>
  )
}

export default MultiSelectList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: theme.dimensions.maxWidth / 1.1,
    marginVertical: 5,
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    marginVertical: 10,
  }
})