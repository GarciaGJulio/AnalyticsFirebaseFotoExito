import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'

const Promos_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader/>
      <Text>Promos_Review</Text>
    </View>
  )
}

export default Promos_Review

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})