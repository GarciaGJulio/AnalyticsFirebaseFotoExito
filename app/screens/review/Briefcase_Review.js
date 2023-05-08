import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import ReviewBanner from '../../components/ReviewBanner'
import { Divider } from '@rneui/themed';
import theme from '../../theme/theme'
import StyledButton from '../../components/StyledButton';
import DoubleStyledButton from '../../components/DoubleStyledButton';

const Briefcase_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader/>
      <ScrollView style={{width:theme.dimensions.maxWidth,marginTop:theme.dimensions.maxHeight/10.6}}>
        <><ReviewBanner/></>
        <View style={{width:theme.dimensions.maxWidth,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:20, marginTop:20,fontWeight:theme.fontWeight.bolder}}>Cliente-Sucursal</Text>
          <View style={{width:theme.dimensions.maxWidth/1.1,marginVertical:20}}> 
            <Divider width={2} color={'#D9D9D9'} style={{backgroundColor:'blue'}}/>
          </View>
          <Text style={{fontSize:14}}>A continuación se enlistan los precios de los productos registrados</Text>
        </View>
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