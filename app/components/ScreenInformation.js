import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import theme from '../theme/theme'

const ScreenInformation = ({ title, text }) => {
  return (
    <View style={{ width: theme.dimensions.maxWidth, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginTop: 20, fontWeight: theme.fontWeight.bolder }}>{title}</Text>
      <View style={{ width: theme.dimensions.maxWidth / 1.1, marginVertical: 20 }}>
        <Divider width={2} color={'#D9D9D9'} style={{ backgroundColor: 'blue' }} />
      </View>
      {
        text ? <Text style={{ fontSize: 14, }}>{text}</Text> : <></>
      }

    </View>
  )
}

export default ScreenInformation;

const styles = StyleSheet.create({})