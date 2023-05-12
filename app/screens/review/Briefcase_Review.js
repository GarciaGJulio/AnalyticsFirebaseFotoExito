import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import ReviewBanner from '../../components/ReviewBanner'
import { Divider } from '@rneui/themed';
import theme from '../../theme/theme'
import StyledButton from '../../components/StyledButton';
import DoubleStyledButton from '../../components/DoubleStyledButton';
import ScreenInformation from '../../components/ScreenInformation';

const Briefcase_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader/>
      <ScrollView style={{width:theme.dimensions.maxWidth,marginTop:theme.dimensions.maxHeight/10}}>
        <ScreenInformation title={'Cliente-Sucursal'} text={'A continuación se enlistan los precios de los productos registrados'}/>
        <DoubleStyledButton
          titleLeft={'Cancelar'} 
          sizeLeft={theme.buttonSize.df} 
          colorLeft={theme.colors.modernaYellow}
          iconLeft={"content-save-all-outline"}
          typeLeft={"material-community"}
          titleRigth={'Guardar'} 
          sizeRigth={theme.buttonSize.df} 
          colorRigth={theme.colors.modernaRed}
          iconRigth={"content-save-all-outline"}
          typeRigth={"material-community"}
          //onPressRigth={}
        />
      </ScrollView>
    </View>
  )
}

export default Briefcase_Review

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})