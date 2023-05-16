import Geolocation from '@react-native-community/geolocation';


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
          console.log('Error al obtener las coordenadas:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };
  