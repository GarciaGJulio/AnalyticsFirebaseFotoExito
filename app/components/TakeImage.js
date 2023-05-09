import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native';
import { Image } from 'react-native';
import HARINA from '.././../assets/resources/harina.png'
import { TouchableOpacity } from 'react-native';

const TakeImage = () => {
    const [image,setImage] = useState('https://static.vecteezy.com/system/resources/thumbnails/001/198/770/small_2x/camera.png');
    const [image1,setImage1] = useState('');
    const [image2,setImage2] = useState('');
    const [image3,setImage3] = useState('');
    const pickImages = async (fn) => {
        let resultado = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          selectionLimit: 3,
          aspect: [4, 3],
          quality: 1,
          // base64:true
        });
        console.log("Imagen Uri:", resultado.assets[0].uri);
        fn(resultado.assets[0].uri)
        //await setImageBase64(resultado.assets[0].uri);
        //await SubirFoto(resultado.assets[0].uri, Idaux, setUrl);
      };
    
  return (
    <View>
        <View style={styles.container}>
            <TouchableOpacity onPress = {() => pickImages(setImage1)} style={styles.imageContainer}>
                <Image source={{uri:(image1 ? image1 : image)}} style={styles.image}/>
            </TouchableOpacity>
            {
                image1 ? (
                    <TouchableOpacity onPress = {() => pickImages(setImage2)} style={styles.imageContainer}>
                        <Image source={{uri:(image2 ? image2 : image)}} style={styles.image}/>
                    </TouchableOpacity>
                ) : <></>
            }
            {
                        image2 ? (
                            <TouchableOpacity onPress = {() => pickImages(setImage3)} style={styles.imageContainer}>
                                <Image source={{uri:(image3 ? image3 : image)}} style={styles.image}/>
                            </TouchableOpacity>
                        ): <></>
                    }
        </View>
    </View>
  )
}

export default TakeImage

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'pink',
        width:'100%',
        height:110,
        marginVertical:10, 
        flexDirection:'row'
    },
    imageContainer: {
        //backgroundColor:'red',
        overflow:'hidden',
        width:90,
        height:90, 
        marginVertical:10, 
        margin:4,
        borderRadius:10,
        borderWidth:2
    },
    image:{
        width:90,
        height:90,
        resizeMode:'stretch'
    }
})