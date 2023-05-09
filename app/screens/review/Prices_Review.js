import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import TakeImage from '../../components/TakeImage'
import FlashListPrices from '../../components/FlashListPrices'
import { ScrollView } from 'react-native'

const Prices_Review = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModernaHeader/>
    </View>
  )
}


export default Prices_Review

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})