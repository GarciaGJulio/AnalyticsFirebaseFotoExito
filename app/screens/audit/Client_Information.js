import { Image, ImageBackground, PermissionsAndroid, StatusBar, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import DoubleStyledButton from '../../components/DoubleStyledButton'
import ScreenInformation from '../../components/ScreenInformation'
import Dropdown from '../../components/Dropdown'
import StyledInput from '../../components/StyledInput'
import LOCATION_ANIMATION from '../../../assets/gps.json';
import LoaderModal from '../../components/LoaderModal';
import * as Location from 'expo-location';
import axios from 'axios';
import { capturarCoordenadas } from '../../services/GeolocationM';
import ModernaContext from '../../context/ModernaContext';

const Client_Information = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { latitude, longitude, setLatitude,handleLocations,location, setLongitude } = useContext(ModernaContext)

  const [type, setType] = useState("");
  const clientsType = [
    { client: 'Cameras', type: 'ASI' },
    { client: 'Appliances', type: 'ASI' },
    { client: 'Vegetables', type: 'MAYORISTA' },
    { client: 'Drinks', type: 'MAYORISTA' },

  ]
  useEffect(()=>{
    console.log("location from context",location)
    /*if(location){
      Alert.alert("Las coordenadas se han capturado exitosamente!", 'Latitud: ' + location.latitude + 'Longitud: ' + location.longitude)
    
    }*/
  },[
    location
  ])

  useEffect(() => {
    validateType(selected)
  }, [selected])
  const validateType = (client) => {
    clientsType.forEach((type) => {
      if (type.client == selected) {
        setType(type.type)
      }
    })
  }



  const handleOpenModal = async () => {
    setIsModalVisible(true)
    capturarCoordenadas(setLatitude, handleLocations, ()=>{
      setIsModalVisible(false)
      navigation.navigate('briefcase');
    },()=>{
      setIsModalVisible(false)
    })
  };



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <LoaderModal animation={LOCATION_ANIMATION} visible={isModalVisible} warning={'Capturando locación actual, por favor espere...'} />
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image} />
      </View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <ScreenInformation title={'Información del Cliente'} text={''} />

        <View style={{ flexDirection: 'row', marginHorizontal: 20, flex: 2 }}>
          <Dropdown placeholder={'Seleccione un cliente'} setSelected={setSelected} />
          <View style={{ width: 150, marginLeft: 10 }}>
            <Text style={{ paddingBottom: 5 }}>Tipo de cliente</Text>
            <View style={{ width: '100%', height: 45, borderWidth: 2, borderColor: 'black', borderRadius: 10, padding: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>{type}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, width: '90%', alignItems: 'center' }}>
          <StyledInput
            onChangeText={txt =>
              setSucursal(txt.toUpperCase())
            }
            label="Sucursal"
            placeholder="Ingresa el nombre de la sucursal"
            maxLength={30}
            //error={errorEmail}
            keyboard='default'
            editable={true}
            value={sucursal}
            width={'90%'}
            information={'Solo se puede ingresar una sucursal por día'}
          />
          <Text>{selected}-{sucursal}</Text>
        </View>
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <DoubleStyledButton
            titleLeft={'Cancelar'}
            sizeLeft={theme.buttonSize.df}
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => navigation.goBack()}
            titleRigth={'Iniciar visita'}
            sizeRigth={theme.buttonSize.df}
            colorRigth={theme.colors.modernaRed}
            onPressRigth={handleOpenModal}
          />
        </View>
      </Animatable.View>
    </View>
  )
}

export default Client_Information

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 313,
    height: 112,
    resizeMode: 'cover'
  },
  imageContainer: {
    bottom: '35%'
  },
  contentContainer: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    height: 570,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    //justifyContent:'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: 320,
    height: 160,
    overflow: 'hidden',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontWeight: theme.fontWeight.bold,
  }
})