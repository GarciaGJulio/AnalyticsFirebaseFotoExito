import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import theme from '../theme/theme';
import axios from 'axios';
import { realizarConsulta, selectData } from '../common/sqlite_config';

const Dropdown = ({placeholder,setSelected,selected,setSucursalInformation,sucursalInformation,setType}) => {
  const [arrayClients, setArrayClients] = useState([]);
  const [newArrayClients, setNewArrayClients] = useState([]);
  const data = [
      {key:'1', value:'Santamaría'},
      {key:'2', value:'Supermaxi'},
      {key:'3', value:'El Arbolito'},
      {key:'4', value:'Mi Comisariato'},
      {key:'5', value:'Tía'},
  ]

  const dataFormat = async (array) => {
    setArrayClients(array)
     console.log('ARRAY DE CONSULTA: ',array)
     const arrayFormat = await array.map(obj => {
      console.log("OBJETO: ",obj.id_cliente)
      return { key: obj.id_cliente, value: obj.nombre_cliente };
    });
    console.log(arrayFormat)
    return arrayFormat
  }

  const validateType = () => {
    arrayClients.forEach((type) => {
      console.log("CLIENTE A ANALIZAR: ",type)
      if (type.nombre_cliente == selected) {
        setType(type.id_cliente);
        setSucursalInformation({
          ...sucursalInformation,
          client: selected,
          clientType: type.id_cliente,
        });
      }
    });
  };

  useEffect(() => {
    validateType()
  },[selected])
  /*const copiarContenido = async (resultadoConsulta) => {
    // Simulación de la copia de contenido
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    // Ejemplo de acceso al resultado de la consulta


    console.log('Resultado de la consulta: ', resultadoConsulta);
    console.log('Contenido copiado.');
  };*/

  const consultarYCopiarContenido = async () => {
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta("SELECT * FROM cliente");
  
      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta);
      setNewArrayClients(await dataFormat(resultadoConsulta))
      console.log('Copia de contenido completada con éxito: ');
    } catch (error) {
      console.error('Error al consultar o copiar el contenido:', error);
    }
  };

  useEffect(() => {
    /*console.log("SELECT DE LA TABLA CLIENTE",);
    selectData("SELECT * FROM cliente",setArrayClients)
    dataFormat(arrayFormat)
    console.log("FORMATO NUEVO PARA DROPDOWN: ",arrayFormat)
    /*if(location){
      Alert.alert("Las coordenadas se han capturado exitosamente!", 'Latitud: ' + location.latitude + 'Longitud: ' + location.longitude)
    
    }*/
    //realizarConsulta("SELECT * FROM cliente")
    consultarYCopiarContenido()
  }, []);

  /*useEffect(() => {
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
  }, []);*/

  /*useEffect(() => {
    console.log("DATOS DEL DROPDOWN",data)
  },[])*/

  /*useEffect(() => {
    console.log("ESTO LLEGA DE LA CONSULTA DE CLIENTES: ",clients)
  },[])*/


  return(
    <ScrollView style={styles.container}>
        <Text style={{marginBottom:5}}>Cliente</Text>
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            placeholder={placeholder}
            searchPlaceholder='Buscar'
            data={newArrayClients} 
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

