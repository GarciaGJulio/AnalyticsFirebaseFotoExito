import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import ReviewBanner from '../../components/ReviewBanner'
import theme from '../../theme/theme'
import ScreenInformation from '../../components/ScreenInformation';
import { ProductsPrices_Review } from '../../components/ProductsPrices_Review'

const Prices_Review = () => {

  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View style={{ width: theme.dimensions.maxWidth, marginTop: theme.dimensions.maxHeight / 10 }}>
        <ReviewBanner />
        <ScreenInformation title={'Cliente - Sucursal'} text={'A continuación se enlistan los precios de los productos registrados'} />
      </View>
      <ProductsPrices_Review text={'Portafolio Ideal'} />
    </View>
  )
}

export default Prices_Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
})