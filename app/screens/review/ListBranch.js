import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../theme/theme';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import * as Animatable from 'react-native-animatable';
import SYNC_BACKGROUND from '../../../assets/resources/review_background.jpg';
import { Icon, ListItem } from '@rneui/themed';
import { commonStyles } from '../../theme/stylesBranch';

const ListBranch = ({ navigation }) => {

    let sucursal = [
        { id: 1, name: "Cliente1 - Sucursal1", state: true },
        { id: 2, name: "Cliente2 - Sucursal2", state: false },
        { id: 3, name: "Cliente3 - Sucursal3", state: true },
    ]

    const goToReview = (value) => {
        console.log("Ir a visitas");
        console.log(value);
        navigation.navigate("review", { branch: value });
    }

    const ItemBranch = ({ branch }) => {
        return (
            <TouchableOpacity onPress={() => {
                goToReview(branch.name);
            }} activeOpacity={0.85} bottomDivider style={{ margin: 0.5 }}>
                <ListItem containerStyle={[commonStyles.containerList, commonStyles.shadow]}>
                    <ListItem.Content>
                        <View style={[commonStyles.container, { elevation: 2 }]}>
                            <View style={commonStyles.iconContainer}>
                                {
                                    branch.state ? (
                                        <Icon
                                            name='sync-circle-sharp'
                                            type='ionicon'
                                            color='green'
                                            size={32}
                                            style={commonStyles.icon}
                                        />) : (
                                        <Icon
                                            name='sync-circle-sharp'
                                            type='ionicon'
                                            color='red'
                                            size={32}
                                            style={commonStyles.icon}
                                        />)
                                }
                            </View>
                            <ImageBackground
                                style={commonStyles.cardContainer}
                                source={SYNC_BACKGROUND}
                                resizeMode='cover'
                                imageStyle={{ opacity: 0.5 }}>
                                <Image source={SYNC_BACKGROUND} style={commonStyles.imageInBack} />
                                <Text style={commonStyles.txt}>{branch.name}</Text>
                            </ImageBackground>
                        </View>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={Logotipo} style={styles.image} />
            </View>
            <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
                <Text style={styles.title}>Puedes revisar las visitas ya realizadas presionando en una sucursal de interés.</Text>
                <View style={styles.contentContainerBranch}>
                    <FlatList showsVerticalScrollIndicator={false}
                        data={sucursal}
                        renderItem={({ item }) => <ItemBranch branch={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </Animatable.View>
        </View>
    );
}

export default ListBranch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.modernaRed,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 313,
        height: 112,
        resizeMode: 'cover'
    },
    imageContainer: {
        bottom: '35%'
    },
    contentContainer: {
        width: theme.dimensions.maxWidth,
        height: 536,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentContainerBranch: {
        margin: 1,
        width: 320,
        height: '80%'
    },
    title: {
        marginTop: 10,
        padding: 13,
        fontSize: theme.fontSize.subtitle,
        marginBottom: 25,
    },
});