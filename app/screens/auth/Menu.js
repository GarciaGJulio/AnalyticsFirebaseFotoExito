import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../theme/theme'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import SYNC_BACKGROUND from '../../../assets/resources/sync_background.jpg'

const Menu = ({navigation}) => {
    const log = () => {
        console.log("NAVEGANDO A LOGIN")
        navigation.navigate('login')
    }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image}/>
      </View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover' imageStyle={{opacity:0.20}}>
            <Text style={styles.text}>Sube una auditoria que hayas registrado de forma offline</Text>
            <StyledButton title={'Sincronizar Datos'} buttonColor={theme.colors.modernaYellow} onPress={() => log()} size={theme.buttonSize.lg} iconName={'cloud-sync'} iconType={'material-community'}/>
        </ImageBackground>
        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover'  imageStyle={{opacity:0.20}}>
            <Text style={styles.text}>Desacarga los datos para empezar una nueva auditoría.</Text>
            <StyledButton title={'Realizar Auditoria'} buttonColor={theme.colors.modernaRed} onPress={() => navigation.navigate('audit')} size={theme.buttonSize.lg} iconName={'clipboard'} iconType={'entypo'}/>
        </ImageBackground>
        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover'  imageStyle={{opacity:0.20}}>
            <Text style={styles.text}>Sube una auditoria que hayas registrado de forma offline</Text>
            <StyledButton title={'Consultar Auditorias'} buttonColor={theme.colors.modernaGreen} onPress={() => navigation.navigate('review')} size={theme.buttonSize.lg} iconName={'select-search'} iconType={'material-community'}/>
        </ImageBackground>
      </Animatable.View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.modernaRed,
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
        width:313,
        height:112,
        resizeMode:'cover'
    },
    imageContainer:{
        bottom:'35%'
    },
    contentContainer:{
        width:theme.dimensions.maxWidth,
        height:536,
        backgroundColor:'white',
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius:15,
        borderTopEndRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    cardContainer:{
        width:320,
        height:160,
        overflow:'hidden',
        borderWidth:1,
        marginVertical:5,
        borderRadius:15,
        justifyContent:'space-around',
        alignItems:'center',
        padding:5,
    },
    text:{
        fontWeight:theme.fontWeight.bold,
    }
})