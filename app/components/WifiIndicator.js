import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../theme/theme'
import { Icon } from '@rneui/base'

const WifiIndicator = () => {
  return (
    <View style={[styles.container,{backgroundColor: theme.colors.modernaGreen}]}>
      <Icon name='wifi' type='material-icon' size={20} color={theme.colors.white}/>
    </View>
  )
}

export default WifiIndicator

const styles = StyleSheet.create({
    container:{
        width: 30,
        height:30,
        borderRadius: 15,
        backgroundColor: theme.colors.modernaGreen,
        justifyContent: 'center',
        alignItems: 'center',
    }
})