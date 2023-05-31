import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme/theme'
import { Image } from 'react-native'
import HARINA from '.././../assets/resources/harina.png'
import ImageViewer from 'react-native-image-zoom-viewer';

const PromosItemsDetails_Review = ({ exhibitor }) => {
    const [extraImages, setExtraImages] = useState([]);
    const validateExtraImages = (objeto) => {
        //const imagenes = []
        setExtraImages(prevImagenes => [...prevImagenes, objeto.url_imagen1])
        if (objeto.url_imagen2) {
            setExtraImages(prevImagenes => [...prevImagenes, objeto.url_imagen2]);
        }

        if (objeto.url_imagen3) {
            setExtraImages(prevImagenes => [...prevImagenes, objeto.url_imagen3]);
        }

        let img = extraImages.join(",")
        console.log("IMAGENES EXTRAS: - - - - ", img)

    }

    useEffect(() => {
        validateExtraImages(exhibitor)
    }, [])

    return (
        <View style={[styles.container]}>
            <View style={[styles.primaryContainer, { marginLeft: 20, }]}>
                <View style={styles.descriptionContainer}>
                    <Text style={{ fontSize: 13 }}>{exhibitor.nombre_exhibidor}</Text>
                    <View style={styles.imagesContainer}>
                        {/*<Modal visible={true} transparent={true}>
                            <ImageViewer
                                //key={index}
                                //source={{ uri: images }}
                                imageUrls={extraImages}
                                //imageUrls={images}
                                style={styles.imgContainer}
                                
                                resizeMode="cover"
                            />
    </Modal>*/}
                        {extraImages.map((images) => {
                            return (

                                <Image
                                    //key={index}
                                    source={{ uri: images }}
                                    //imageUrls={extraImages}
                                    //imageUrls={images}
                                    style={styles.imgContainer}
                                    resizeMode="cover"
                                />


                            );
                        })}
                    </View>
                </View>
            </View>
        </View >
    );
}

export default PromosItemsDetails_Review;

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginVertical: 10,
        borderWidth: 2,
        backgroundColor: theme.colors.lightgray,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    primaryContainer: {
        flexDirection: 'row',
        width: "90%"
    },
    descriptionContainer: {
        marginLeft: 5,
        flex: 1,
        padding: 10
    },
    imgContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 5,
        marginLeft: 5,
    },
    imagesContainer: {
        flexDirection: 'row',
    },
});
