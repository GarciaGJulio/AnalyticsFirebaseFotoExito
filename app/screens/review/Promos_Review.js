import { StyleSheet, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import theme from '../../theme/theme'
import ScreenInformation from '../../components/ScreenInformation';
import { PromosItems_Review } from '../../components/PromosItems_Review'
import { BackPage_Review } from '../../components/BackPage_Review'
import PromosItemsDetails_Review from '../../components/PromosItemsDetails_Review';

const Promos_Review = () => {
  

  return (
    <View style={styles.container}>
      <ModernaHeader />
      <View style={{ width: theme.dimensions.maxWidth, marginTop: theme.dimensions.maxHeight / 10 }}>
        <ScreenInformation title={'Cliente - Sucursal'} text={'A continuación se enlistan los exhibidores registrados'} />
        <BackPage_Review />
      </View>
    </View>
  )
}

export default Promos_Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
})