import * as ImagePicker from "expo-image-picker";
import { SubirAlonedrive, onedrive } from "./onedrive";

export const pickImages = async (
  fn,
  IdFoto
  //setImg
) => {
  let resultado = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    selectionLimit: 3,
    aspect: [4, 3],
    quality: 1,
    // base64:true
  });
  console.log("Imagen Uri:", resultado.assets[0].uri);
  let uri=resultado.assets[0].uri
  console.log("uir desde cameraM:",uri)
  await fn(uri, IdFoto);
  console.log("dESDE cAMERA iD", IdFoto);
  // fn(await SubirAlonedrive(resultado.assets[0].uri, IdFoto));
  // console.log("Desde el Camera",await SubirAlonedrive(resultado.assets[0].uri,IdFoto))
  //await setImageBase64(resultado.assets[0].uri);
  //await SubirFoto(resultado.assets[0].uri, Idaux, setUrl);
};
