import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cli } from "../azureConfig/graph/GraphManager";
import { readAsStringAsync } from 'expo-file-system';
// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from 'expo-file-system';
import { Platform } from "react-native";
import axios from "axios";
// const driveId = "b!8xz3gdf43Eq0KCkvbna31vxpGAuGOrpPnBVuUAfQKqbgq9iLUK9GT5ZWD37MzEAh"
// const userId = "59d5817f-9292-43be-880e-c4a3582b8b9a"
const filePath = "Test"



export const onedrive = async () => {

    const bearerToken = await AsyncStorage.getItem("userToken");



    fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,

        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Id userrrrt", data.id); // userId del usuario
        });
}

export const SubirAlonedrive = async (imageUri,IdFoto) => {
    // const folderPath = '/me/drive/root:/FolderA'; // Ruta de la carpeta en OneDrive
    const bearerToken = await AsyncStorage.getItem("userToken");
    const filename = ''+IdFoto+'.png';
const driveId = "b!8xz3gdf43Eq0KCkvbna31vxpGAuGOrpPnBVuUAfQKqbgq9iLUK9GT5ZWD37MzEAh"
const folderId="01FWEOYBHXLNTSSVABRZCJUPKJCIFKRXI3"
    // console.log("Tokens", bearerToken);
    try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
    
        const uploadResponse = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${folderId}:/${filename}:/content`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'image/jpeg'
          },
          body: blob // binary image dataff
        });
    
        if (uploadResponse.ok) {
          const json = await uploadResponse.json();
          console.log("TodAo bien", json['@microsoft.graph.downloadUrl'])
          
          return json['@microsoft.graph.downloadUrl'];
        } else {
          console.error('Error en la subida de la imagen:', uploadResponse.status, uploadResponse.statusText);
          return null;
        }
      } catch (error) {
        console.error(`Error al obtener la imagen: ${error}`);
        return null;
      }


}  


// export const Vercarpetas=async()=>{
    
//     const bearerToken = await AsyncStorage.getItem("userToken");

//     fetch(`https://graph.microsoft.com/v1.0/users/${user-id}/drive/items/${item-id}`, {
//     headers: {
//         'Authorization': `Bearer ${bearerToken}`,
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data); // los detalles de la carpeta compartida
// })
// .catch(error => console.error(error));
// }