import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native';
import { Image } from 'react-native';
import HARINA from '.././../assets/resources/harina.png'
import { TouchableOpacity } from 'react-native';
import { pickImages } from '../services/CameraM';
import { Icon } from '@rneui/base';

const TakeImage = () => {
    const [image, setImage] = useState('https://static.vecteezy.com/system/resources/thumbnails/001/198/770/small_2x/camera.png');
    const [imageV1, setImageV1] = useState(false);
    const [imageV2, setImageV2] = useState(false);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');


    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    pickImages(setImage1)
                    setImageV1(true)
                }} style={styles.imageContainer}>
                    <Image source={{ uri: (image1 ? image1 : image) }} style={styles.image} />
                </TouchableOpacity>
                {
                    imageV1 ? (
                        <TouchableOpacity onPress={() => {
                            pickImages(setImage2)
                            setImageV2(true)
                        }} style={styles.imageContainer}>
                            <Image source={{ uri: (image2 ? image2 : image) }} style={styles.image} />
                            <TouchableOpacity style={styles.deleteButton} onPress={() => {
                                setImageV1(false)
                                setImage2('')
                            }}>
                                <Icon name='remove-circle' type='ionicon' size={25} color={'red'} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ) : <></>
                }
                {
                    imageV2 ? (
                        <TouchableOpacity onPress={() => pickImages(setImage3)} style={styles.imageContainer}>
                            <Image source={{ uri: (image3 ? image3 : image) }} style={styles.image} />
                            <TouchableOpacity style={styles.deleteButton} onPress={() => {
                                setImageV2(false)
                                setImage3('')
                            }}>
                                <Icon name='remove-circle' type='ionicon' size={25} color={'red'} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ) : <></>
                }
            </View>
        </View>
    )
}

export default TakeImage

const styles = StyleSheet.create({
    container: {
        //backgroundColor:'pink',
        width: '100%',
        height: '40%',
        marginVertical: 5,
        flexDirection: 'row'
    },
    imageContainer: {
        //backgroundColor:'red',
        overflow: 'hidden',
        width: 90,
        height: 90,
        marginVertical: 10,
        margin: 4,
        borderRadius: 15,
        borderWidth: 2
    },
    image: {
        width: 80,
        height: 70,
        marginHorizontal: 3,
        marginVertical: 8,
        resizeMode: 'stretch'
    },
    deleteButton: {
        zIndex: 1,
        position: 'absolute',
        width: 35,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    }
})