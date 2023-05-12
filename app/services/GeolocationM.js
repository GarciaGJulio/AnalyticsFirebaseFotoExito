import Geolocation from '@react-native-community/geolocation';


export const capturarCoordenadas = (setLatitude, handleLocations, succesFunc) => {
    Geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
           // setLatitude(latitude);
            //setLongitude(longitude);
            handleLocations({latitude,longitude})
            console.log('Latitud:', latitude);
            console.log('Longitud:', longitude);
            succesFunc();
        },
        (error) => {
            console.log('Error al obtener las coordenadas:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};