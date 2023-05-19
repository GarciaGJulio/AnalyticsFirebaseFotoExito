import * as ImagePicker from 'expo-image-picker'

export const pickImages = async (fn) => {
  try {
    let resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 3,
      aspect: [4, 3],
      quality: 1,
      // base64:true
    });
    console.log("Imagen Uri:", resultado.assets[0].uri);
    fn(resultado.assets[0].uri)
  } catch (e) {
    console.log(e)
  }

  //await setImageBase64(resultado.assets[0].uri);
  //await SubirFoto(resultado.assets[0].uri, Idaux, setUrl);
};