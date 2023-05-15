import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import theme from '../theme/theme'
import WifiIndicator from './WifiIndicator'
import { FAB } from '@rneui/themed'

const ScreenInformation = ({ title, text }) => {
  return (
    <View style={{ width: theme.dimensions.maxWidth, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: theme.dimensions.maxWidth }}>
        <Text style={{ fontSize: 20, fontWeight: theme.fontWeight.bolder }}>{title}</Text>
        <View style={{ position: 'absolute', left: theme.dimensions.maxWidth - 35 }}>
          <WifiIndicator />
        </View>
      </View>
      <View style={{ width: theme.dimensions.maxWidth / 1.1, marginVertical: 20 }}>
        <Divider width={2} color={'#D9D9D9'} style={{ backgroundColor: 'blue' }} />
      </View>
      {
        text ? <Text style={{ fontSize: 14, marginHorizontal: 3, }}>{text.toString()}</Text> : null
      }
    </View>
  )
}

export default ScreenInformation;

const styles = StyleSheet.create({})