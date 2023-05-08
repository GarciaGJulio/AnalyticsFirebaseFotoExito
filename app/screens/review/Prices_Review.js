import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'

const Prices_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader/>
      <Text>Prices_Review</Text>
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