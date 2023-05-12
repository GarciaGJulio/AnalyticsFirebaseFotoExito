import { ListItem } from '@rneui/themed';
import React from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import theme from '../theme/theme';

export const DetailProduct = ({ title, data }) => {

    const ItemProduct = ({ item }) => (
        <ListItem>
            <ListItem.Content>
                <View style={styles.detailsText}>
                    <Text style={{ color: theme.colors.lightgray, marginTop: 1, }}>{item.brand}</Text>
                </View>
                <View style={styles.detailsText}>
                    <Text style={{ color: theme.colors.lightgray, marginTop: 1, marginLeft: 150, }}>{item.key}</Text>
                </View>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.containerHeader, { marginVertical: 2, }]}>
                <ListItem>
                    <ListItem.Content>
                        <View style={styles.headerText}>
                            <Text style={[styles.title, { marginVertical: 5 }]}>
                                {title}
                            </Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
            </View>
            <View style={styles.contentContainerDetail}>
                <FlatList
                    data={data}
                    renderItem={ItemProduct}
                    keyExtractor={(item) => item.key}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        paddingHorizontal: 20,
    },
    title: {
        marginLeft: 19,
        fontWeight: theme.fontWeight.bold,
        fontSize: 20,
        color: theme.colors.white,
    },
    containerHeader: {
        flex: 1,
    },
    headerText: {
        width: 290,
        height: 45,
        backgroundColor: theme.colors.modernaYellow,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginVertical: 5,
    },
    contentContainerDetail: {
        flex: 3,
        width: 290,
        borderWidth: 1,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        marginLeft: 16,
        marginTop: -24,
        height: 110,
    },
    detailsText: {
        marginVertical: -10,
    },

});