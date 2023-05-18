

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cli } from "../azureConfig/graph/GraphManager";
// import RNFetchBlob from 'rn-fetch-blob'

const driveId = "b!8xz3gdf43Eq0KCkvbna31vxpGAuGOrpPnBVuUAfQKqbgq9iLUK9GT5ZWD37MzEAh"
const filePath = "Test"



export const onedrive = async (imageUri) => {

    let UserOnedrive = Cli;
    console.log("User:", UserOnedrive)
    // onedrive(UserOnedrive);


    try {
        const uploadFileToOneDrive = async (fileUri, fileName) => {
            try {
              // Leemos el archivo en formato base64
              const fileData = await RNFS.readFile(fileUri, 'base64');
          
              // Definimos los metadatos del archivo que vamos a subir
              const driveItem = {
                name: fileName,
                '@microsoft.graph.conflictBehavior': 'rename',
              };
          
              // Subimos el archivo utilizando Graph API
              const response = await graphClient.api('/me/drive/root/children').put({
                name: fileName,
                '@microsoft.graph.conflictBehavior': 'rename',
                content: fileData,
                '@microsoft.graph.sourceUrl': fileUri,
              });
          
              console.log(`File uploaded: ${response.webUrl}`);
            } catch (error) {
              console.log(`Error uploading file: ${error}`);
            }
          };
        uploadFileToOneDrive(imageUri, 'myFile.jpg');


        // const response2 = await UserOnedrive.api("/me/drive").get()
        // console.log("IDDDDDDDDDDDD", response2.id)
        // const response = await UserOnedrive.api('/drives').get();
        // console.log("Reesss", response);
        // const file = {
        //     name: "myImage.png",
        //     "@microsoft.graph.conflictBehavior": "rename",
        // };
        // const folder = await UserOnedrive.api("/me/drive/root").get();
        // const uploadSession = await UserOnedrive.api(
        //     `/me/drive/items/${folder.id}:/${file.name}:/createUploadSession`
        // ).post({ item: file });

        // const response4 = await RNFetchBlob.config({
        //     fileCache: true,
        // }).fetch("POST", uploadSession.uploadUrl, {
        //     Authorization: `Bearer ${AsyncStorage.getItem("userToken")}`,
        //     "Content-Type": "application/octet-stream",
        // }, RNFetchBlob.wrap(imageUri));

        // const uploadedFile = await UserOnedrive.api(uploadSession.itemUrl).get();
        // console.log("Arriba ARCHIVO",uploadedFile)
    } catch (error) {
        console.log("Error al subir el archivo:", error);
    }

}
