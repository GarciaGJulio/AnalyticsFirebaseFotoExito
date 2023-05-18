import { ListItem } from '@rneui/themed';
import React from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import theme from '../theme/theme';

export const DetailProduct = ({ title, data }) => {

    const ItemProduct = ({ item }) => (
        <ListItem>
            <ListItem.Content>
                <View style={styles.detailsText}>
                    <View style={[styles.textSection, { marginStart: '8%' }]}>
                        <Text style={{ color: theme.colors.secondary }}>{item.brand}</Text>
                    </View>
                    <View style={[styles.textSection, { alignItems: 'stretch', marginStart: '25%' }]}>
                        <Text style={{ color: theme.colors.secondary }}>{item.key}</Text>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <FlatList
                data={data}
                renderItem={ItemProduct}
                keyExtractor={(item) => item.key}
                style={{ borderWidth: 0.5 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        marginStart: 16,
    },
    title: {
        fontWeight: theme.fontWeight.bolder,
        fontSize: theme.fontSize.subtitle,
        paddingLeft: 15,
        backgroundColor: theme.colors.modernaYellow,
        height: 30,
        justifyContent: 'center',
        borderWidth: 0.5,
        color: theme.colors.white,
        paddingTop: 5,
    },
    detailsText: {
        flexDirection: 'row',
    },
    textSection: {
        flex: 1,
    },

});