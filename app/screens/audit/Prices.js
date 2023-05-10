import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import DoubleStyledButton from '../../components/DoubleStyledButton'
import ScreenInformation from '../../components/ScreenInformation'
import CheckBoxContainer from '../../components/CheckBoxContainer'
import ModernaHeader from '../../components/ModernaHeader'
import FlashListPrices from '../../components/FlashListPrices'
import { ScrollView } from 'react-native'
import ProgressBar from '../../components/ProgressBar'

const Prices = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <ModernaHeader/>
      <ScreenInformation title={'Precios'} text={'Selecciona los productos que poseen preciador'}/>
      
      <ScrollView style={{width:'100%', height:10,marginBottom:5}}>
        <View style={{alignItems:'center'}}>
          <FlashListPrices/>
        </View>
      </ScrollView>
      <ScrollView style={{width:'100%',height:'0%'}}>
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
            onPressRigth={() => navigation.navigate('rack')} 
            />
    </View>
  )
}

export default Prices

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:theme.dimensions.maxWidth,
        height:600,
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
})