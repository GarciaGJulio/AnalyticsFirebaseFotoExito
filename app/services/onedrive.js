import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cli } from "../azureConfig/graph/GraphManager";
import { readAsStringAsync } from "expo-file-system";
// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import axios from "axios";

// const driveId = "b!8xz3gdf43Eq0KCkvbna31vxpGAuGOrpPnBVuUAfQKqbgq9iLUK9GT5ZWD37MzEAh"
// const userId = "59d5817f-9292-43be-880e-c4a3582b8b9a"
const filePath = "Test";

export const onedrive = async () => {
  const bearerToken = await AsyncStorage.getItem("userToken");

  fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Id userrrrt", data.id); // userId del usuario
    });
};

export const SubirAlonedrive = async (imageUri, IdFoto) => {
  // //console.log(
  //   "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  // );
  //console.log("ID QUE VA A SER GUARDADO:", IdFoto);
  RecuperarToken();
  // const folderPath = '/me/drive/root:/FolderA'; // Ruta de la carpeta en OneDrive

  const bearerToken = await AsyncStorage.getItem("userToken2");
  //console.log("USERRRRRRRRRRRRR:", bearerToken);
  //console.log("ID DESDE LA FUNCION SUBIR", IdFoto);
  const filename = "" + IdFoto + ".png";
  const driveId =
    "b!8xz3gdf43Eq0KCkvbna31vxpGAuGOrpPnBVuUAfQKqbgq9iLUK9GT5ZWD37MzEAh";
  const folderId = "01FWEOYBHXLNTSSVABRZCJUPKJCIFKRXI3";
  // //console.log("Tokens", bearerToken);
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const uploadResponse = await fetch(
      `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${folderId}:/${filename}:/content`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "image/jpeg",
        },
        body: blob, // binary image dataff
      }
    );

    if (uploadResponse.ok) {
      const json = await uploadResponse.json();

      //console.log("Todo bien", json);
      // //console.log(
      //   "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      // );
      return json["@microsoft.graph.downloadUrl"];
    } else {
      // //console.log(
      //   "------------------------------------------------------------------------"
      // );
      console.error(
        "ERROR EN LA SUBIDA DE IMAGENES:",
        uploadResponse.status,
        uploadResponse.json()
      );
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener la imagen: ${error}`);
    return null;
  }
};

export const RecuperarToken = () => {
  const url =
    "https://fotoexito1.azurewebsites.net/api/getAccesToken?code=kyjbYT96Qfu_70h8FiMD0LqXHhbS7-pr_AMrXCjePuMlAzFuV4ZKLA==";
  const body = {
    clientSecret: "wQU8Q~WjEgKYC1U9ggNVBY8XV3PQi1ckWKX4ia.p",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (data) => {
      // Manejar la respuesta de la solicitud
      // //console.log("CLAVES SECUNDARIOS-------------------------", data.token);

      await AsyncStorage.setItem("userToken2", data.token);
      // //console.log("CLAVES SECUNDARIOS2-------------------------", await AsyncStorage.getItem('userToken2'));
    })
    .catch((error) => {
      // Manejar errores de la solicitud
      console.error(error);
    });
};

export const verifyUrlImage = async (url_imagen, name_image) => {
  try {
    const response = await fetch(url_imagen, {
      method: "GET",
    });
    // //console.log(
    //   "******************** INVOCANDO A LA FUNCION:  URL CORRECTA ***************************" +
    //     " " +
    //     response.status
    // );
    if (response.status != 401) {
      return url_imagen;
    } else {
      throw new Error("Error al genenrar");
    }
  } catch (e) {
    //console.log("errrrrror".e);
    try {
      // //console.log(
      //   "INICIANDO TRAER IMAGEN POR EL NOMBRE * * * * * " +
      //     " nombre:" +
      //     name_image
      // );
      const data = await getItemIdImgOneDrive(name_image);
      //console.log("respuesta de imagen", data);
      // //console.log(
      //   "###########################################################"
      // );
      // //console.log("CREANDO NUEVA URL DE LA IMAGEN: ");
      // //console.log(
      //   "###########################################################"
      // );
      return data["@microsoft.graph.downloadUrl"];
    } catch (e) {
      //console.log("ERROR AL CREAR UNA NUEVA IMAGEN - - - - ", e);
      return url_imagen;
    }
  }
};

export const getItemIdImgOneDrive = async (imgId) => {
  try {
    const {
      data: { token },
    } = await axiosGetToken();
    let itemResponse1 = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/Test/${imgId}.png`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let itemResponse = await itemResponse1.json();
    //console.log("ITEM: ", itemResponse);
    //console.log("ITEM STATUS: ", itemResponse1.status);
    if (itemResponse1.status === 200) {
      //console.log("APUNTO DE RETORNAR NUEVA IMAGEN");
      return itemResponse;
    } else {
      throw new Error("error");
    }
  } catch (error) {
    //console.log("ERROR; ", error);
    throw new Error(error);
  }
};

export const axiosGetToken = async () => {
  let response;
  try {
    const data = {
      clientSecret: "wQU8Q~WjEgKYC1U9ggNVBY8XV3PQi1ckWKX4ia.p",
    };
    response = await axios.post(
      "https://fotoexito1.azurewebsites.net/api/getAccesToken?code=kyjbYT96Qfu_70h8FiMD0LqXHhbS7-pr_AMrXCjePuMlAzFuV4ZKLA==",
      data
    );
    return response;
  } catch (e) {
    ////console.log(e);
    response = e;
    throw new Error(e);
  }
};

export const deleteImageFromOneDrive = async (itemId) => {
  const endpoint = `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}`;
  const bearerToken = await AsyncStorage.getItem("userToken2");

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    //console.log("Imagen eliminada exitosamente");
    // Realizar otras acciones o actualizaciones necesarias después de eliminar la imagen
  } else {
    // //console.log(
    //   "Error al eliminar la imagen:",
    //   response.status,
    //   response.statusText
    // );
  }
};
