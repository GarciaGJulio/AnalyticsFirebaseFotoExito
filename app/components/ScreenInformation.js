import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import theme from '../theme/theme'
import WifiIndicator from './WifiIndicator'

const ScreenInformation = ({ title, text }) => {
  return (
    <View style={{width:theme.dimensions.maxWidth,justifyContent:'center',alignItems:'center',marginTop:10}}>
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',width:theme.dimensions.maxWidth}}>
          <Text style={{fontSize:20,fontWeight:theme.fontWeight.bolder}}>{title}</Text>
          <View style={{position: 'absolute',left:350}}>
            <WifiIndicator/>
          </View>
      </View>
        <View style={{width:theme.dimensions.maxWidth/1.1,marginVertical:15}}> 
            <Divider width={2} color={'#D9D9D9'} style={{backgroundColor:'blue'}}/>
        </View>
        {
            text ? <Text style={{fontSize:13,width:'91%'}}>{text.toString()}</Text> : null
        }
    </View>
  )
}

export default ScreenInformation;

const styles = StyleSheet.create({})