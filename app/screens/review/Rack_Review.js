import { StyleSheet, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import theme from '../../theme/theme'
import ScreenInformation from '../../components/ScreenInformation'
import { BackPage_Review } from '../../components/BackPage_Review'
import TarjetaRack_Review from '../../components/TarjetaRack_Review'

const Rack_Review = () => {

  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View style={{ width: theme.dimensions.maxWidth, marginTop: theme.dimensions.maxHeight / 10 }}>
        <ScreenInformation title={'Cliente - Sucursal'} text={'A continuación se enlistan los perchas registrados'} />
        <BackPage_Review />
      </View>
      <TarjetaRack_Review />
    </View>
  )
}

export default Rack_Review


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
})