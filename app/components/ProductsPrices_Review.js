import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import theme from '../theme/theme'
import { FlashList } from '@shopify/flash-list';
import { ProductsDetails_Review } from './ProductsDetails_Review';

export const ProductsPrices_Review = ({ text }) => {
    const DATA = [
        {
            name: "Harina Ya",
            price: "3.25"
        },
        {
            name: "Harina Ya sin polvo de hornear",
            price: "3.75"
        },
        {
            name: "Harina Ya con",
            price: "3.00"
        },
        {
            name: "Harinas Ya",
            price: "3.25"
        },
    ];

    return (
        <View style={styles.container}>
            {text ? <Text style={styles.title} > {text}</ Text> : <></>}
            <FlashList
                data={DATA}
                renderItem={({ item }) => <ProductsDetails_Review productName={item.name} productPrice={item.price} />}
                estimatedItemSize={4}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginBottom: 10
    },
    title: {
        fontWeight: theme.fontWeight.bolder,
        fontSize: theme.fontSize.subtitle,
        marginTop: 5,
    },
})