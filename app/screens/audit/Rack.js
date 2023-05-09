import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import DoubleStyledButton from '../../components/DoubleStyledButton'
import ScreenInformation from '../../components/ScreenInformation'

const Racks = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image}/>
      </View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <ScreenInformation title={'Perchas'} text={'Selecciona la percha'}/>
      <DoubleStyledButton 
            titleLeft={'Cancelar'} 
            sizeLeft={theme.buttonSize.df} 
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => navigation.goBack()}
            titleRigth={'Siguiente'} 
            sizeRigth={theme.buttonSize.df} 
            iconRigth={'arrow-right-circle'}
            typeRigth={'feather'}
            colorRigth={theme.colors.modernaRed}
            onPressRigth={() => navigation.navigate('promos')} 
            />
      </Animatable.View>
    </View>
  )
}

export default Racks

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
        height:570,
        backgroundColor:'white',
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius:15,
        borderTopEndRadius:15,
        //justifyContent:'center',
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