import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import ReviewBanner from '../../components/ReviewBanner'
import theme from '../../theme/theme'
import ScreenInformation from '../../components/ScreenInformation';

const Promos_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View style={{ width: theme.dimensions.maxWidth, marginTop: theme.dimensions.maxHeight / 10 }}>
        <ReviewBanner />
        <ScreenInformation title={'Cliente - Sucursal'} text={'A continuación se enlistan los exhibidores registrados'} />
      </View>
    </View>
  )
}

export default Promos_Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})