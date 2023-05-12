import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme/theme'
import { Image } from 'react-native'
import HARINA from '.././../assets/resources/harina.png'

const PromosItemsDetails_Review = ({ exhibitor }) => {

    return (
        <View style={[styles.container]}>
            <View style={[styles.primaryContainer, { marginLeft: 20, }]}>
                <Image source={HARINA} style={{ width: 100, height: 100 }} />
                <View style={styles.descriptionContainer}>
                    <Text style={{ fontSize: 13 }}>{exhibitor.name}</Text>
                    <View style={styles.imagesContainer}>
                        {exhibitor.prod.map((prodImages) => {
                            return Object.values(prodImages).map((image, index) => {
                                return (
                                    <Image
                                        key={index}
                                        source={{ uri: image }}
                                        style={styles.imgContainer}
                                        resizeMode="cover"
                                    />
                                );
                            });
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
