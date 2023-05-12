import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import theme from '../../theme/theme'
import ReviewBanner from '../../components/ReviewBanner'
import ScreenInformation from '../../components/ScreenInformation'

const Rack_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View style={{ width: theme.dimensions.maxWidth, marginTop: theme.dimensions.maxHeight / 10 }}>
        <ReviewBanner />
        <ScreenInformation title={'Cliente - Sucursal'} text={'A continuación se enlistan los perchas registrados'} />
      </View>
    </View>
  )
}

export default Rack_Review


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})