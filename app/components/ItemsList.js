import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../theme/theme';
import { DetailProduct } from './DetailProduct';

const ItemsList = ({ text }) => {

    const DATA = [
        {
            title: 'Avenas',
            data: [
                { key: 'ID04591', brand: 'AvenasYa' },
                { key: 'ID04592', brand: 'AvenasYa' },
                { key: 'ID04593', brand: 'AvenasYa' },
            ]
        },
        {
            title: 'Harinas',
            data: [
                { key: 'ID04594', brand: 'Harina1' },
                { key: 'ID04595', brand: 'Harina2' },
                { key: 'ID04596', brand: 'Harina3' },
            ]
        },
    ];

    return (
        <View style={{ flex: 1, width: '100%', marginBottom: 10, }}>
            {text ? <Text style={[styles.title, { marginVertical: 18, }]}>{text}</Text> : <></>}
            <FlatList
                data={DATA}
                renderItem={({ item }) => (<DetailProduct title={item.title} data={item.data} />)}
                keyExtractor={(item) => item.title}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default ItemsList;

const styles = StyleSheet.create({
    title: {
        marginLeft: 19,
        fontWeight: theme.fontWeight.bold,
        fontSize: 20,
    },
});
