import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import { Text } from 'react-native';
import { StyleSheet } from "react-native";

export const ClientInformation = () => {
    //Datos del cliente
    const [idCliente, setIdCliente] = useState(null);
    const [nombreCliente, setNombreCliente] = useState(null);
    const [nombreSucursal, setNombreSucursal] = useState(null);
    
    useEffect(() => {
        getClientInformation();
    }, []);

    //Obtener datos del cliente
    const getClientInformation = async () => {
        setIdCliente(await AsyncStorage.getItem("id_cliente"));
        setNombreCliente(await AsyncStorage.getItem("nombre_cliente"));
        setNombreSucursal(await AsyncStorage.getItem("nombre_sucursal"));
    }
    return (
        <Text style={styles.clientInformationText}>
            {idCliente}
            {" - "}
            {nombreCliente}
            {" - "}
            {nombreSucursal}
        </Text>
    );
};
const styles = StyleSheet.create({
    clientInformationText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 9,
        color: 'gray',
        marginHorizontal: 4,
        marginBottom: 4,
        paddingVertical:4
    }
});
