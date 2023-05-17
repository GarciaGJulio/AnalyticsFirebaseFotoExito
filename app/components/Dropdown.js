import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import theme from '../theme/theme';
import axios from 'axios';

const Dropdown = ({placeholder,setSelected,data}) => {
  //const [selected, setSelected] = React.useState("");
  const [client,setClient] = useState([]);
  /*const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]*/

  useEffect(() => {
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
  }, []);

  /*useEffect(() => {
    console.log("DATOS DEL DROPDOWN",data)
  },[])*/
  return(
    <ScrollView style={styles.container}>
        <Text style={{marginBottom:5}}>Cliente</Text>
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            placeholder={placeholder}
            searchPlaceholder='Buscar'
            data={client} 
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

