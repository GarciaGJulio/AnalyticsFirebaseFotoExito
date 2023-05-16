import { useNavigation } from '@react-navigation/native';
import { Icon, ListItem } from '@rneui/themed';
import React, { useState, useContext } from 'react'
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../theme/stylesBranch';

import SYNC_BACKGROUND from '../../assets/resources/review_background.jpg';
import SYNC_ANIMATION from '../../assets/sync-data.json'
import SUCCESS_ANIMATION from '../../assets/success.json'
import FAILED_ANIMATION from '../../assets/failed.json'
import LoaderModal from './LoaderModal';
import ModernaContext from '../context/ModernaContext';


const ItemBranch_Review = ({ branch }) => {
    const [animation, setAnimation] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { isConnected } = useContext(ModernaContext);
    const [stateBranch, setStateBranch] = useState(branch.state);

    const navigation = useNavigation();

    const handleOpenModal = () => {
        setAnimation(SYNC_ANIMATION);
        setIsModalVisible(true);

        setStateBranch(true);
        
        console.log(stateBranch)
        setTimeout(() => {
            setAnimation(SUCCESS_ANIMATION);
            if (isConnected) {
                setTimeout(() => {
                    setIsModalVisible(false);
                }, 2000);
            } else {
                setAnimation(FAILED_ANIMATION);
                setTimeout(() => {
                    setIsModalVisible(false);
                }, 4000);
            }
        }, 5000);
    };

    const goToReview = (value) => {
        // console.log("Ir a visitas");
        navigation.navigate("review", { branch: value });
    }

    return (
        <TouchableOpacity onPress={() => {
            goToReview(branch.name);
        }} activeOpacity={0.85} bottomDivider style={{ margin: 0.5 }}>
            <ListItem containerStyle={[commonStyles.containerList, commonStyles.shadow]}>
                <ListItem.Content>
                    <View style={[commonStyles.container, { elevation: 2 }]}>
                        <View style={commonStyles.iconContainer}>
                            <LoaderModal animation={animation} visible={isModalVisible} warning={'Sincronizando datos, por favor espere...'} />
                            {
                                stateBranch ? (
                                    <Icon
                                        name='cloud-done'
                                        type='ionicon'
                                        color='green'
                                        size={30}
                                        style={commonStyles.icon}
                                        onPress={handleOpenModal}
                                    />
                                ) : (
                                    <Icon
                                        name='cloud-offline'
                                        type='ionicon'
                                        color='red'
                                        size={30}
                                        style={commonStyles.icon}
                                        onPress={handleOpenModal}
                                    />
                                )
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
    );
}

export default ItemBranch_Review;
