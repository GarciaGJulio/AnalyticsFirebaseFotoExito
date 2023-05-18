import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import theme from '../theme/theme';

const Dropdown = ({placeholder,setSelected}) => {
  //const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  return(
    <ScrollView style={styles.container}>
        <Text style={{marginBottom:5}}>Cliente</Text>
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            placeholder={placeholder}
            searchPlaceholder='Buscar'
            data={data} 
            save="value"
        />
    </ScrollView>
  )
}

export default Dropdown

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: theme.dimensions.maxWidth/1.2,

    }
})

