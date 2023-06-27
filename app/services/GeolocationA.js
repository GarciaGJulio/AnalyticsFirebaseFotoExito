import * as Location from "expo-location";
import GetLocation from "react-native-get-location";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";

export const getLocation = async () => {
  let data = await Location.requestForegroundPermissionsAsync();
  // let data = await Location.requestBackgroundPermissionsAsync();
  const { status } = data;
  //console.log("data", data);
  if (status === "granted") {
    return new Promise((resolve, reject) => {
      capturarCoordenadas()
        .then((location) => {
          resolve(location);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    //console.log(status);
    Linking.openSettings();
    // permission denied
  }
};

export const capturarCoordenadas = async () => {
  try {
    return new Promise((resolve, reject) => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then((location) => {
          //console.log(location);
          //console.log("LONGITUD :", location.longitude);
          //console.log("LATITUD :", location.latitude);
          resolve(location);
        })
        .catch((error) => {
          const { code, message } = error;
          console.warn(code, message);
          reject(error);
        });
    });
  } catch (e) {
    //console.log("ERROR AL RECOPILAR LAS COORDENADAS: ", e);
    throw e;
  }
};

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //console.log("Permiso de ubicación denegado");
      return null;
    }

    // Permiso de ubicación concedido, continuar con la obtención de la ubicación
    const coords = await capturarCoordenadasAlternativas();
    return coords;
  } catch (error) {
    //console.log("Error al solicitar permisos de ubicación:", error);
    return null;
  }
};

export const capturarCoordenadasAlternativas = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    //console.log("Coordenadas de la posición actual:", latitude, longitude);
    return { latitude, longitude };
  } catch (error) {
    //console.log("Error al obtener la ubicación:", error);
    return null;
  }
};
