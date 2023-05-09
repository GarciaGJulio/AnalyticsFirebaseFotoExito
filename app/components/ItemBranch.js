import { Icon, ListItem } from '@rneui/themed';
import React from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SYNC_BACKGROUND from '../../assets/resources/review_background.jpg'
import theme from '../theme/theme';

export const ItemBranch = ({ branch, navigation }) => {

    const goToReview = () => {
        // console.log('goToReview');
        navigation.goBack();
    }

    return (
        <TouchableOpacity onPress={goToReview} activeOpacity={0.2}>
            <ListItem containerStyle={styles.containerList} style={{ margin: 0.5, }}>
                <ListItem.Content>
                    <View style={styles.container}>
                        {/* <Icon
                            name='sync-circle-sharp'
                            type='ionicon'
                            color='green'
                            size={32}
                            style={styles.icon}
                        /> */}
                        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover'
                            imageStyle={{ opacity: 0.4 }}>
                            <Image source={SYNC_BACKGROUND} style={styles.imageInBack} />
                            <Text style={styles.txt}>{branch.name}</Text>
                        </ImageBackground>
                    </View>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    containerList: {
        flex: 1,
        borderRadius: 15,
    },
    imageInBack: {
        width: 212,
        height: 118,
        marginTop: -35,
        marginLeft: 50,
    },
    cardContainer: {
        width: 293,
        height: 175,
        overflow: 'hidden',
        borderWidth: 0,
        marginVertical: 1,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 50,
    },
    txt: {
        fontSize: 16,
        fontWeight: theme.fontWeight.bold,
        marginTop: 1.5,
        marginLeft: -140,
    },
    icon: {
        marginTop: 10,
        marginRight: 3,
    }
});