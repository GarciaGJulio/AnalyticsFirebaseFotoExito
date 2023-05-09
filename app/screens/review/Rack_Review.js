import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'

const Rack_Review = () => {
  return (
    <View style={styles.container}>
      <ModernaHeader/>
    </View>
  )
}

export default Rack_Review

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})