import * as Location from "expo-location";

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permiso de ubicación denegado");
      return null;
    }

    // Permiso de ubicación concedido, continuar con la obtención de la ubicación
    const coords = await capturarCoordenadasAlternativas();
    return coords;
  } catch (error) {
    console.log("Error al solicitar permisos de ubicación:", error);
    return null;
  }
};

export const capturarCoordenadasAlternativas = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    console.log("Coordenadas de la posición actual:", latitude, longitude);
    return { latitude, longitude };
  } catch (error) {
    console.log("Error al obtener la ubicación:", error);
    return null;
  }
};
