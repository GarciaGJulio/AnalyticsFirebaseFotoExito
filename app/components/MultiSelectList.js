import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import theme from '../theme/theme';

const MultiSelectList = ({setComplementaryPortfolioProducts}) => {
    const [selected, setSelected] = useState([{name:'',key:''}]);
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

    
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.text}>Portafolio Complementario</Text>
      <MultipleSelectList 
          setSelected={(val,key) => {
            setSelected({...selected,name:val,value:key})
            const array = [...selected]
            let newRegister = {name:val,id:key}
            array.push(newRegister)
            setComplementaryPortfolioProducts({...selected})
            //validate(val,key)
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
    container:{
        flex:1,
        width: theme.dimensions.maxWidth/1.1,
        marginVertical:5,
    },
    text:{
        fontWeight:theme.fontWeight.bold,
        marginVertical:10,
    }
})