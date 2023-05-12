import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme/theme'
import { Image } from 'react-native'
import HARINA from '.././../assets/resources/harina.png'
import TakeImage from './TakeImage'

const ProductsDetails_Review = ({ productName, productPrice }) => {

    return (
        <View style={[styles.container]}>
            <View style={[styles.primaryContainer, { marginLeft: 20, }]}>
                <Image source={HARINA} style={{ width: 100, height: 100 }} />
                <View style={styles.descriptionContainer}>
                    <Text style={{ fontSize: 13 }}>{productName}</Text>
                    <Text style={{ marginHorizontal: 10, marginTop: 5, fontSize: 11 }}>Precio disponible</Text>
                    <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 10, }}>${productPrice}</Text>
                </View>
            </View>
            <View style={styles.secondaryContainer}>
                <View style={{ padding: 10 }}>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: '500' }}>Foto del precio del producto respectivo</Text>
                        <Text style={{ fontSize: 13, marginTop: 10 }}>Proporcione una foto del producto respectivo</Text>
                        <TakeImage />
                    </View>
                </View>
            </View>
        </View >
    );
}

export default ProductsDetails_Review

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
    descriptionContainer: {
        marginLeft: 5,
        flex: 1,
        padding: 10
    },
    primaryContainer: {
        flexDirection: 'row',
        width: "90%"
    },
    secondaryContainer: {
        width: '90%'
    }
});
