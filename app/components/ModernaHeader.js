import { Image, StyleSheet, Text, View,StatusBar, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme/theme'
import Constants from "expo-constants";
import { Icon } from '@rneui/base';
import Logotipo from '../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import ConfirmationModal from './ConfirmationModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ModernaHeader = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const insets = useSafeAreaInsets();

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

  return (
    
    <View style={[styles.statusbar,{ top: insets.top }]}>
        <ConfirmationModal visible={isModalVisible} onClose={handleCloseModal} warning={'Al presionar el boton Aceptar se va a cancelar su progreso.'}/>
        <View style={styles.userInfo}>
            <Icon name='user-tag' type='font-awesome-5' size={23} color={'white'} />
                <View style={{paddingLeft:10}}>
                    <Text style={{color:'white',fontSize:10}}>Santiago</Text>
                    <Text style={{color:'white',fontSize:10}}>Mosquera</Text>
                </View>
        </View>
        <View style={styles.imageContainer}>
            <Image 
                source={Logotipo}
                style={styles.modernaLogo}
                />
        </View>
        <TouchableOpacity style={styles.logOutButton} onPress={handleOpenModal}>
            <Icon name='log-out-outline' type='ionicon' size={30} color={'white'} />
        </TouchableOpacity>
    </View >
  )
}

export default ModernaHeader

const styles = StyleSheet.create({
    statusbar: {
        width: theme.dimensions.maxWidth,
        height:55,
        flexDirection:'row',
        //paddingHorizontal:10,
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: theme.colors.modernaRed,
        position: 'absolute',
        //top: Constants.statusBarHeight,
      },
    modernaLogo:{
        width:132,
        resizeMode: "center",
        height:40 ,
    },
    userInfo:{
        flexDirection:'row',
        alignItems:'center',
        flex:1.2,
        justifyContent:'center'
    },
    imageContainer:{
        //backgroundColor:'green',
        justifyContent:'center',
        flex:2
    },
    logOutButton: {
        //backgroundColor:'brown',
        flex:0.5
    }
})