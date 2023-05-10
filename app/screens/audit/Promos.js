import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import DoubleStyledButton from '../../components/DoubleStyledButton'
import ScreenInformation from '../../components/ScreenInformation'
import ModernaHeader from '../../components/ModernaHeader'
import FlashListPrices from '../../components/FlashListPrices'
import Dropdown from '../../components/Dropdown'

const Promos = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <ModernaHeader/>
      <ScreenInformation title={'Promociones'} text={'Selecciona la sucursal que aplica promociones'}/>
      <Dropdown/>
      <ScrollView style={{width:'100%', height:10,marginBottom:5}}>
        <View style={{alignItems:'center'}}>
          <FlashListPrices/>
        </View>
      </ScrollView>
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
            onPressRigth={() => navigation.navigate('begin')} 
            />
    </View>
  )
}

export default Promos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
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