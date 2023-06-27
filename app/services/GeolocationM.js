import Geolocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';


export const capturarCoordenadas = async (sucursalData) => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = { ...sucursalData };
          location.latitude = parseFloat(position.coords.latitude);
          location.longitude = parseFloat(position.coords.longitude);
          resolve(location);
        },
        (error) => {
          //console.log('Error al obtener las coordenadas:', error);
          reject(error);
          Alert.alert("Error al obtener las coordenadas","Por favor, intentelo nuevamente...");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };
  