import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem } from '@rneui/themed';
import theme from '../theme/theme';

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

    const ItemProduct = ({ product }) => {
        return (
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{product.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                    <ListItem.Title>{product.data.key}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View style={styles.container}>
            {text ? <Text style={styles.txt}>{text}</Text> : <></>}
            <FlatList showsVerticalScrollIndicator={false}
                data={DATA}
                renderItem={({ item }) => <ItemProduct product={item} />}
                keyExtractor={(item) => item.key}
            />
        </View>
    );
}

export default ItemsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    listSubject: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 16,
    },
    listGrade: {
        fontStyle: "italic",
        fontSize: 15,
        //backgroundColor:'#ccc'
    },
    txt: {
        fontSize: 16,
        fontWeight: theme.fontWeight.bold,
        marginVertical: 20,
        // backgroundColor: "black"
    },
});
