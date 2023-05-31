import * as Location from 'expo-location';

const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permiso de ubicación denegado');
      return;
    }

    // Permiso de ubicación concedido, continuar con la obtención de la ubicación
    //getLocation();
  } catch (error) {
    console.log('Error al solicitar permisos de ubicación:', error);
  }
};

export const capturarCoordenadasAlternativas = async (sucursalData,setSucursalData) => {
  requestLocationPermission()
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    console.log('Coordenadas de la posición actual:', latitude, longitude);
    setSucursalData({...sucursalData,latitud:latitude,longitud:longitude})
  } catch (error) {
    console.log('Error al obtener la ubicación:', error);
  }
};
