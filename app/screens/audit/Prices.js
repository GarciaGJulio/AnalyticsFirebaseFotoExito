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
import { Divider } from '@rneui/base'

const Prices = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <ModernaHeader />
      </View>
      <View style={styles.contentContainer}>
        <ScreenInformation title={'Precios'} text={'Selecciona los productos que poseen preciador'} />
        <ProgressBar currentStep={1} />
        <View style={{ flex: 2, width: '100%', alignItems: 'center' }}>
          <FlashListPrices title={'Portafolio Ideal'} />
        </View>
        <View style={{ width: theme.dimensions.maxWidth / 1.1, marginVertical: 5 }}>
          <Divider width={2} color={'#D9D9D9'} style={{ backgroundColor: 'blue' }} />
        </View>
        <View style={{ flex: 2, width: '100%', alignItems: 'center' }}>
          <FlashListPrices title={'Portafolio Complementario'} />
        </View>
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
    </View>
  )
}

export default Prices

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    //height:600,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'blue',
  },
  contentContainer: {
    flex: 14,
    width: theme.dimensions.maxWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
  },
})