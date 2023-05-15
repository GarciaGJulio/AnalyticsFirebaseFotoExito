import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme/theme';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import * as Animatable from 'react-native-animatable';
import ItemBranch_Review from '../../components/ItemBranch_Review';

const ListBranch = () => {

    let sucursal = [
        { id: 1, name: "Cliente1 - Sucursal1", state: true },
        { id: 2, name: "Cliente2 - Sucursal2", state: false },
        { id: 3, name: "Cliente3 - Sucursal3", state: true },
    ]

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
                        renderItem={({ item }) => <ItemBranch_Review branch={item} />}
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